import type React from 'react';
import Image from 'next/image';
import type { WelcomeBannerProps } from './welcome-banner.types';

export function WelcomeBanner({
    text,
    features,
    imageLeftSrc = '/ssm/welcome/ImageLeft.png',
    imageRightSrc = '/ssm/welcome/ImageRight.png'
}: WelcomeBannerProps): React.ReactElement {
    return (
        <div className="w-full bg-surface overflow-hidden">
            <div className="md:hidden relative">
                <div
                    className="absolute top-0 left-0 w-[83px] h-16 overflow-hidden pointer-events-none select-none"
                    aria-hidden="true"
                >
                    <Image
                        src={imageLeftSrc}
                        alt=""
                        fill
                        className="object-cover object-left"
                    />
                </div>
                <div
                    className="absolute top-0 right-0 w-[83px] h-16 overflow-hidden pointer-events-none select-none"
                    aria-hidden="true"
                >
                    <Image
                        src={imageRightSrc}
                        alt=""
                        fill
                        className="object-cover object-right"
                    />
                </div>
                <div className="relative z-10 flex items-center justify-center py-1">
                    <p className="w-full font-['Futura_PT'] font-[900] text-[24px] leading-7 tracking-[-0.019em] text-on-surface-light text-center whitespace-pre-line">
                        {text}
                    </p>
                </div>
            </div>

            <div className="hidden md:block relative">
                <div className="absolute left-0 top-0 w-[204px] h-full pointer-events-none select-none z-0">
                    <Image
                        src={imageLeftSrc}
                        alt=""
                        fill
                        className="object-cover object-left"
                    />
                </div>
                <div className="absolute right-0 top-0 w-[204px] h-full pointer-events-none select-none z-0">
                    <Image
                        src={imageRightSrc}
                        alt=""
                        fill
                        className="object-cover object-right"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center py-6 gap-6">
                    <p className="w-full font-['Futura_PT'] font-[900] text-[57px] leading-[57px] tracking-[-0.019em] text-on-surface-light text-center">
                        {text}
                    </p>
                    {features !== undefined && features.length > 0 && (
                        <div className="flex items-center justify-center gap-10">
                            {features.map((feature, i) => (
                                <span
                                    key={i}
                                    className="font-['Futura_PT'] font-[900] text-[24px] leading-[28px] tracking-[-0.019em] text-on-surface-light"
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
