'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ConfettiBurstProps } from './confetti-burst.types';

interface ConfettiPiece {
    id: number;
    originTop: number;
    originLeft: number;
    width: number;
    height: number;
    colorClass: string;
    duration: number;
    delay: number;
    frames: Keyframe[];
}

interface Origin {
    top: number;
    height: number;
    viewportWidth: number;
    fadeCeiling: number;
}

interface Launch {
    speed: number;
    angleFromVertical: number;
    direction: number;
    dragX: number;
    dragY: number;
    gravity: number;
    flutterAmplitude: number;
    flutterFrequency: number;
    flutterPhase: number;
    spin: number;
    duration: number;
}

interface Sample {
    offset: number;
    x: number;
    y: number;
    rotate: number;
}

interface Trajectory {
    samples: Sample[];
    apexRise: number;
}

const COLOR_CLASSES = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-accent-red', 'bg-accent-orange'];
const STEP_SECONDS = 1 / 120;
const SAMPLE_COUNT = 34;
const FADE_SPAN = 0.3;
const FADE_CLEARANCE = 56;

function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function simulate(launch: Launch): Trajectory {
    const angleRad = (launch.angleFromVertical * Math.PI) / 180;
    let velocityX = launch.direction * launch.speed * Math.sin(angleRad);
    let velocityY = -launch.speed * Math.cos(angleRad);
    let x = 0;
    let y = 0;
    let apexRise = 0;

    const totalSteps = Math.ceil(launch.duration / STEP_SECONDS);
    const sampleEvery = Math.round(totalSteps / (SAMPLE_COUNT - 1));
    const samples: Sample[] = [];

    for (let step = 0; step <= totalSteps; step += 1) {
        const seconds = step * STEP_SECONDS;

        if (step % sampleEvery === 0 || step === totalSteps) {
            const wobble =
                launch.flutterAmplitude * Math.sin(launch.flutterPhase + seconds * launch.flutterFrequency);
            const offset = Math.min(seconds / launch.duration, 1);
            samples.push({ offset, x: x + wobble, y, rotate: launch.spin * offset });
        }

        velocityX -= launch.dragX * velocityX * STEP_SECONDS;
        velocityY += (launch.gravity - launch.dragY * velocityY) * STEP_SECONDS;
        x += velocityX * STEP_SECONDS;
        y += velocityY * STEP_SECONDS;
        apexRise = Math.max(apexRise, -y);
    }

    return { samples, apexRise };
}

function toKeyframes(samples: Sample[], fadeCeiling: number): Keyframe[] {
    const crossing = samples.find((sample) => sample.y >= fadeCeiling);
    const fadeEnd = crossing === undefined ? 1 : crossing.offset;
    const fadeStart = Math.max(0.1, fadeEnd - FADE_SPAN);

    return samples.map((sample) => {
        const faded =
            sample.offset <= fadeStart ? 1 : 1 - (sample.offset - fadeStart) / (fadeEnd - fadeStart);
        return {
            offset: sample.offset,
            transform:
                'translate3d(' +
                sample.x.toFixed(2) +
                'px, ' +
                sample.y.toFixed(2) +
                'px, 0) rotate(' +
                sample.rotate.toFixed(1) +
                'deg)',
            opacity: Math.min(Math.max(faded, 0), 1)
        };
    });
}

function buildLaunch(side: 'left' | 'right', speed: number, duration: number): Launch {
    return {
        speed,
        angleFromVertical: randomBetween(19, 38),
        direction: side === 'left' ? 1 : -1,
        dragX: randomBetween(0.85, 1.35),
        dragY: randomBetween(1.2, 1.8),
        gravity: randomBetween(260, 380),
        flutterAmplitude: randomBetween(6, 26),
        flutterFrequency: randomBetween(2.4, 6.5),
        flutterPhase: randomBetween(0, Math.PI * 2),
        spin: randomBetween(160, 620) * (Math.random() < 0.5 ? -1 : 1),
        duration
    };
}

function trajectoryForRise(side: 'left' | 'right', targetRise: number, duration: number): Trajectory {
    const launch = buildLaunch(side, Math.sqrt(2 * 320 * targetRise), duration);
    let result = simulate(launch);

    for (let attempt = 0; attempt < 5; attempt += 1) {
        if (result.apexRise <= 0) break;
        launch.speed *= Math.pow(targetRise / result.apexRise, 0.7);
        result = simulate(launch);
    }

    return result;
}

function createPiece(id: number, side: 'left' | 'right', origin: Origin): ConfettiPiece {
    const width = randomBetween(6, 12);
    const targetRise = Math.max((origin.top - 40) * randomBetween(1, 1.3), 140);
    const duration = randomBetween(4.2, 5.6);
    const offFrame = randomBetween(0.05, 0.22) * origin.viewportWidth;
    const originTop = origin.top + origin.height / 2 + randomBetween(-34, 34);

    return {
        id,
        originTop,
        originLeft: side === 'left' ? -offFrame : origin.viewportWidth + offFrame,
        width,
        height: width * randomBetween(0.35, 0.55),
        colorClass: COLOR_CLASSES[id % COLOR_CLASSES.length],
        duration,
        delay: randomBetween(0, 0.6),
        frames: toKeyframes(
            trajectoryForRise(side, targetRise, duration).samples,
            origin.fadeCeiling - originTop
        )
    };
}

function createPieces(pieceCount: number, origin: Origin): ConfettiPiece[] {
    return Array.from({ length: pieceCount }, (_, index) =>
        createPiece(index, index % 2 === 0 ? 'left' : 'right', origin)
    );
}

export function ConfettiBurst({
    pieceCount = 90,
    anchorRef,
    fadeBeforeRef
}: ConfettiBurstProps): React.ReactElement | null {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const anchorRect = anchorRef?.current?.getBoundingClientRect();
        const anchorTop = anchorRect ? anchorRect.top : window.innerHeight * 0.35;
        const fadeRect = fadeBeforeRef?.current?.getBoundingClientRect();
        const origin: Origin = {
            top: anchorTop,
            height: anchorRect ? anchorRect.height : 0,
            viewportWidth: window.innerWidth,
            fadeCeiling: (fadeRect ? fadeRect.top : anchorTop + 180) - FADE_CLEARANCE
        };

        setPieces(createPieces(pieceCount, origin));
        const timeout = setTimeout(() => setPieces([]), 6400);
        return (): void => clearTimeout(timeout);
    }, [pieceCount, anchorRef, fadeBeforeRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (container === null || pieces.length === 0) return;
        if (typeof container.children[0]?.animate !== 'function') return;

        const animations = pieces.map((piece, index) =>
            container.children[index].animate(piece.frames, {
                duration: piece.duration * 1000,
                delay: piece.delay * 1000,
                easing: 'linear',
                fill: 'both'
            })
        );

        return (): void => animations.forEach((animation) => animation.cancel());
    }, [pieces]);

    if (pieces.length === 0) return null;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 z-40 overflow-hidden pointer-events-none"
        >
            {pieces.map((piece) => (
                <span
                    key={piece.id}
                    className={'absolute rounded-sm ' + piece.colorClass}
                    style={{
                        top: piece.originTop,
                        left: piece.originLeft,
                        width: piece.width,
                        height: piece.height,
                        opacity: 0
                    }}
                />
            ))}
        </div>
    );
}
