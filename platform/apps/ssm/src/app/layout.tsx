import type React from 'react';
import type { Metadata } from 'next';
import '@lsm/tokens/styles';
import '@/styles/globals.css';

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
            <body data-theme="ssm">{children}</body>
        </html>
    );
}
