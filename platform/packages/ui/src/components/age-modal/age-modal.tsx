'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../button/button';
import type { AgeModalProps } from './age-modal.types';

export function AgeModal({
    leaveSiteHref = 'https://www.google.com',
    storageKey = 'lsm-age-verified',
    minAge = 18
}: AgeModalProps): React.ReactElement | null {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem(storageKey)) {
            setVisible(true);
        }
    }, [storageKey]);

    function handleConfirm(): void {
        localStorage.setItem(storageKey, '1');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-[390px] bg-outline rounded-lg p-6 flex flex-col items-center gap-14">
                <p className="text-[36px] font-bold leading-[44px] text-on-surface-light text-center">
                    You must be over {minAge} to enter this site
                </p>
                <div className="flex flex-col gap-4 w-full">
                    <Button variant="tertiary" className="w-full" onClick={handleConfirm}>
                        I am over {minAge}
                    </Button>
                    <a
                        href={leaveSiteHref}
                        className="w-full text-center text-base font-bold leading-6 tracking-[0.15px] text-on-surface-light underline py-2"
                    >
                        Leave Site
                    </a>
                </div>
            </div>
        </div>
    );
}
