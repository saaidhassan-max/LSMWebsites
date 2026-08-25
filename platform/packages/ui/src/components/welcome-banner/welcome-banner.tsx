import type React from 'react';
import Image from 'next/image';
import { USP } from '../usp/usp';
import type { WelcomeBannerProps } from './welcome-banner.types';

const HEADLINE_SHADOW = '[text-shadow:0_4px_6px_rgba(55,55,55,0.8)]';

export function WelcomeBanner({
    text,
    textPrefix,
    textHighlight,
    textSuffix,
    features,
    uspText,
    imageLeftSrc = '/ssm/welcome/ImageLeft.png',
    imageRightSrc = '/ssm/welcome/ImageRight.png',
    imageLeftWidthMobile = 83,
    imageLeftWidthDesktop = 204,
    variant = 'classic'
}: WelcomeBannerProps): React.ReactElement {
    const headline = (className: string): React.ReactElement => (
        <p className={className}>
            {textPrefix !== undefined && (
                <span className="text-on-surface-light">{textPrefix}</span>
            )}
            {textHighlight !== undefined && <span className="text-tertiary">{textHighlight}</span>}
            <span className="text-on-surface-light">{text}</span>
            {textSuffix !== undefined && <span className="text-tertiary">{textSuffix}</span>}
        </p>
    );

    const decorImage = (src: string, side: string): React.ReactElement => (
        <Image
            src={src}
            alt=""
            fill
            className={'object-cover object-' + side}
            aria-hidden="true"
        />
    );

    if (variant === 'merged') {
        return (
            <div className="w-full bg-surface">
                <div className="md:hidden relative overflow-hidden">
                    {uspText !== undefined && (
                        <USP text={uspText} variant="bingo" textClassName="relative z-10" />
                    )}

                    <div className="absolute inset-y-0 left-0 w-[93px]">
                        {decorImage(imageLeftSrc, 'left')}
                    </div>
                    <div className="absolute inset-y-0 right-0 w-[102px]">
                        {decorImage(imageRightSrc, 'right')}
                    </div>

                    <div className="relative flex items-center justify-center px-2 py-1">
                        {headline(
                            'font-futura font-[900] text-[28px] leading-9 tracking-[-0.019em] text-center whitespace-pre-line ' +
                                HEADLINE_SHADOW
                        )}
                    </div>
                </div>

                <div className="hidden md:block relative overflow-hidden">
                    {uspText !== undefined && (
                        <USP text={uspText} variant="bingo" textClassName="relative z-10" />
                    )}

                    <div className="absolute inset-y-0 left-0 w-[266px]">
                        {decorImage(imageLeftSrc, 'left')}
                    </div>
                    <div className="absolute inset-y-0 right-0 w-[292px]">
                        {decorImage(imageRightSrc, 'right')}
                    </div>

                    <div className="relative flex flex-col items-center gap-6 py-6">
                        {headline(
                            'w-full font-futura font-[900] text-[57px] leading-[57px] tracking-[-0.019em] text-center ' +
                                HEADLINE_SHADOW
                        )}
                        {features !== undefined && features.length > 0 && (
                            <div className="flex items-center justify-center gap-10">
                                {features.map((feature, i) => (
                                    <span
                                        key={i}
                                        className="font-futura font-[900] text-[24px] leading-[28px] tracking-[-0.019em] text-on-surface-light"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-surface overflow-hidden">
            <div className="md:hidden relative flex items-center min-h-16">
                <div className="absolute inset-y-0 left-0" style={{ width: imageLeftWidthMobile }}>
                    <Image
                        src={imageLeftSrc}
                        alt=""
                        fill
                        className="object-cover object-left"
                        aria-hidden="true"
                    />
                </div>
                <div className="absolute inset-y-0 right-0 w-[92px]">
                    <Image
                        src={imageRightSrc}
                        alt=""
                        fill
                        className="object-cover object-right"
                        aria-hidden="true"
                    />
                </div>
                <div className="relative z-10 w-full flex items-center justify-center px-2 py-1">
                    <p
                        className={
                            variant === 'modern'
                                ? 'font-futura font-semibold text-[28px] leading-9 tracking-[0] text-center whitespace-pre-line'
                                : 'font-futura font-[900] text-[24px] leading-7 tracking-[-0.019em] text-center whitespace-pre-line'
                        }
                    >
                        {textHighlight !== undefined && (
                            <span className="text-tertiary">{textHighlight}</span>
                        )}
                        <span className="text-on-surface-light">{text}</span>
                        {textSuffix !== undefined && (
                            <span className="text-tertiary">{textSuffix}</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="hidden md:flex flex-row items-start">
                <div className="shrink-0 relative h-[157px]" style={{ width: imageLeftWidthDesktop }}>
                    <Image
                        src={imageLeftSrc}
                        alt=""
                        fill
                        className="object-cover object-left"
                        aria-hidden="true"
                    />
                </div>
                <div className="flex-1 flex flex-col items-center py-6 gap-6">
                    <p className="w-full font-futura font-[900] text-[57px] leading-[57px] tracking-[-0.019em] text-center">
                        {textHighlight !== undefined && (
                            <span className="text-tertiary">{textHighlight}</span>
                        )}
                        <span className="text-on-surface-light">{text}</span>
                        {textSuffix !== undefined && (
                            <span className="text-tertiary">{textSuffix}</span>
                        )}
                    </p>
                    {features !== undefined && features.length > 0 && (
                        <div className="flex items-center justify-center gap-10">
                            {features.map((feature, i) => (
                                <span
                                    key={i}
                                    className="font-futura font-[900] text-[24px] leading-[28px] tracking-[-0.019em] text-on-surface-light"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="shrink-0 relative w-[225px] h-[157px]">
                    <Image
                        src={imageRightSrc}
                        alt=""
                        fill
                        className="object-cover object-right"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    );
}
