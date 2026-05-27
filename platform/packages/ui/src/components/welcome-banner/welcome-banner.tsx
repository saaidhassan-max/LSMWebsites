import type React from 'react';
import Image from 'next/image';
import type { WelcomeBannerProps } from './welcome-banner.types';

export function WelcomeBanner({
    text,
    textHighlight,
    features,
    imageLeftSrc = '/ssm/welcome/ImageLeft.png',
    imageRightSrc = '/ssm/welcome/ImageRight.png'
}: WelcomeBannerProps): React.ReactElement {
    return (
        <div className="w-full bg-surface overflow-hidden">
            <div className="md:hidden flex flex-row items-center h-16">
                <div className="shrink-0 relative w-[83px] h-16">
                    <Image
                        src={imageLeftSrc}
                        alt=""
                        fill
                        className="object-cover object-left"
                        aria-hidden="true"
                    />
                </div>
                <div className="flex-1 flex items-center justify-center py-1">
                    <p className="font-futura font-[900] text-[24px] leading-7 tracking-[-0.019em] text-center whitespace-pre-line">
                        {textHighlight !== undefined && (
                            <span className="text-tertiary">{textHighlight}</span>
                        )}
                        <span className="text-on-surface-light">{text}</span>
                    </p>
                </div>
                <div className="shrink-0 relative w-[92px] h-16">
                    <Image
                        src={imageRightSrc}
                        alt=""
                        fill
                        className="object-cover object-right"
                        aria-hidden="true"
                    />
                </div>
            </div>

            <div className="hidden md:flex flex-row items-start">
                <div className="shrink-0 relative w-[204px] h-[157px]">
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
