import type React from 'react';
import type { Metadata } from 'next';
import '@lsm/tokens/styles';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Super Free Slot Games',
    description: 'Super Free Slot Games'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="en">
            <body data-theme="slots">{children}</body>
        </html>
    );
}
