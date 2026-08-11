import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/playfair-display';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default: 'VYOM Publication',
    template: '%s | VYOM Publication',
  },
  description: 'A governed publication workflow management platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
