import React from 'react';

export interface WelcomeBannerProps {
  text: string;
  features?: string[];
  imageLeftSrc?: string;
  imageRightSrc?: string;
}

export function WelcomeBanner({
  text,
  features,
  imageLeftSrc = '/ssm/welcome/ImageLeft.png',
  imageRightSrc = '/ssm/welcome/ImageRight.png',
}: WelcomeBannerProps) {
  return (
    <div className="w-full bg-surface overflow-hidden">

      {/* ── MOBILE (hidden at md+) ── */}
      <div className="md:hidden relative">
        {/* Left image — absolute, pinned top-left, clips to its own bounds */}
        <div className="absolute top-0 left-0 w-[83px] h-16 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <img
            src={imageLeftSrc}
            alt=""
            className="w-full h-full object-cover object-left"
          />
        </div>
        {/* Right image — absolute, pinned top-right, clips to its own bounds */}
        <div className="absolute top-0 right-0 w-[83px] h-16 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <img
            src={imageRightSrc}
            alt=""
            className="w-full h-full object-cover object-right"
          />
        </div>
        {/* Text frame — sits on top of both images, determines banner height */}
        <div className="relative z-10 flex items-center justify-center py-1">
          <p className="w-full font-['Futura_PT'] font-[900] text-[24px] leading-7 tracking-[-0.019em] text-on-surface-light text-center whitespace-pre-line">
            {text}
          </p>
        </div>
      </div>

      {/* ── DESKTOP (hidden below md) ── */}
      <div className="hidden md:block relative">
        <img
          src={imageLeftSrc}
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 w-[204px] h-full object-cover object-left select-none pointer-events-none z-0"
        />
        <img
          src={imageRightSrc}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 w-[204px] h-full object-cover object-right select-none pointer-events-none z-0"
        />
        <div className="relative z-10 flex flex-col items-center py-6 gap-6">
          <p className="w-full font-['Futura_PT'] font-[900] text-[57px] leading-[57px] tracking-[-0.019em] text-on-surface-light text-center">
            {text}
          </p>
          {features && features.length > 0 && (
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
