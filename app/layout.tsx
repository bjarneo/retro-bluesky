import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Retro Bluesky',
  description: 'A retro-styled Bluesky social feed viewer with a nostalgic interface',
  keywords: ['Bluesky', 'Social Media', 'Retro', 'Feed Viewer', 'AT Protocol'],
  authors: [{ name: 'dothash', url: 'https://dothash.win' }],
  creator: 'dothash',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://retro-bluesky.vercel.app',
    title: 'Retro Bluesky',
    description: 'A retro-styled Bluesky social feed viewer with a nostalgic interface',
    siteName: 'Retro Bluesky',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retro Bluesky',
    description: 'A retro-styled Bluesky social feed viewer with a nostalgic interface',
    creator: '@dothash.win',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#0055aa',
};

export const revalidate = 10; // Revalidate page every 10 seconds

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
