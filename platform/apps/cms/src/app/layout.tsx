import type React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@lsm/tokens/styles';
import '@/styles/globals.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto'
});

export const metadata: Metadata = {
    title: 'LSM CMS',
    description: 'Little Star Media content manager'
};

const themeScript = `
(function(){try{var t=localStorage.getItem('cms-theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();
`;

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="en" className={roboto.variable} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="bg-m3-background text-m3-on-surface min-h-screen antialiased">
                {children}
            </body>
        </html>
    );
}
