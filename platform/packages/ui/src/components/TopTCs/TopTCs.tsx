import React from 'react';

export interface TopTCsProps {
  text: string;
}

export function TopTCs({ text }: TopTCsProps) {
  return (
    <div className="flex w-full items-center justify-center bg-surface py-1 md:py-2 px-4">
      <p className="text-[11px] leading-[13px] md:text-[12px] md:leading-4 tracking-[0.4px] text-white text-center">
        {text}
      </p>
    </div>
  );
}
