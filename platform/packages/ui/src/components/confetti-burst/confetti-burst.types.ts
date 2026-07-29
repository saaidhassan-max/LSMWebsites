import type React from 'react';

export interface ConfettiBurstProps {
    pieceCount?: number;
    anchorRef?: React.RefObject<HTMLElement | null>;
    fadeBeforeRef?: React.RefObject<HTMLElement | null>;
}
