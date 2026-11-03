import type React from 'react';
import type { Metadata } from 'next';
import '@lsm/tokens/styles';
import '@/styles/globals.css';
import { AgeModal } from '@lsm/ui/components/age-modal/age-modal';

export const metadata: Metadata = {
    title: 'Super Free Bets MI',
    description: 'The best Michigan online casino offers, bonuses and free spins.'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="en">
            <body data-theme="bets" className="bg-surface">
                {children}
                <AgeModal storageKey="sfbets-age-verified" minAge={21} />
            </body>
        </html>
    );
}
