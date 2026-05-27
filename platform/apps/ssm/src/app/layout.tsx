import type React from 'react';
import type { Metadata } from 'next';
import '@lsm/tokens/styles';
import '@/styles/globals.css';
import { AgeModal } from '@lsm/ui/components/age-modal/age-modal';

export const metadata: Metadata = {
    title: 'Superspillemaskiner',
    description: 'Superspillemaskiner.dk'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="da">
            <body data-theme="ssm">
                {children}
                <AgeModal storageKey="ssm-age-verified" />
            </body>
        </html>
    );
}
