import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { UserPreferencesProvider } from '@/components/user-preferences-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies & Shows Directory',
  description: 'Discover top-rated movies and trending TV shows with detailed information, ratings, and reviews.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Movies & Shows Directory',
    description: 'Discover top-rated movies and trending TV shows with detailed information, ratings, and reviews.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Movies & Shows Directory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movies & Shows Directory',
    description: 'Discover top-rated movies and trending TV shows with detailed information, ratings, and reviews.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserPreferencesProvider>
            <div className="min-h-screen flex">
              <Header />
              <main className="flex-1 ml-16">{children}</main>
            </div>
            <Footer />
          </UserPreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}