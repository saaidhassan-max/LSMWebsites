import type React from 'react';
import Image from 'next/image';
import type { OperatorBannerProps } from './operator-banner.types';

export function OperatorBanner({ mobileSrc, desktopSrc, alt, href }: OperatorBannerProps): React.ReactElement {
    const content = (
        <>
            <Image
                src={mobileSrc}
                alt={alt}
                width={1024}
                height={768}
                className="md:hidden w-full h-auto rounded"
            />
            <Image
                src={desktopSrc}
                alt={alt}
                width={1328}
                height={224}
                className="hidden md:block w-full h-auto rounded"
            />
        </>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer sponsored" className="block w-full">
                {content}
            </a>
        );
    }

    return <div className="w-full">{content}</div>;
}
