import type React from 'react';
import type { Metadata } from 'next';
import '@lsm/tokens/styles';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Good Choice Ontario',
    description: 'Good Choice Ontario — find the best online casino offers in Ontario.'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="en">
            <body data-theme="ontario" className="bg-surface">
                {children}
            </body>
        </html>
    );
}
