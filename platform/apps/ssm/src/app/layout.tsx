import type { Metadata } from 'next';
import '@lsm/tokens/styles';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Superspillemaskiner',
  description: 'Superspillemaskiner.dk',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body data-theme="ssm">
        {children}
      </body>
    </html>
  );
}
