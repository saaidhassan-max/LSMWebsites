import localFont from 'next/font/local';

export const futuraPT = localFont({
    src: [
        { path: './futura/FuturaPTBook.otf', weight: '400', style: 'normal' },
        { path: './futura/FuturaPTMedium.otf', weight: '500', style: 'normal' },
        { path: './futura/FuturaPTBold.otf', weight: '700', style: 'normal' },
        { path: './futura/FuturaPTHeavy.otf', weight: '900', style: 'normal' },
    ],
    variable: '--font-futura-pt',
    display: 'swap',
});
