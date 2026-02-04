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
        {/* Global Sunset Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-red-900/30 via-transparent to-amber-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/20 via-transparent to-orange-900/20 animate-spin" style={{ animationDuration: '20s' }}></div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/12 rounded-full blur-xl animate-ping" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-1/6 right-1/3 w-48 h-48 bg-pink-500/8 rounded-full blur-xl animate-pulse" style={{ animationDuration: '7s' }}></div>
          <div className="absolute bottom-1/4 left-1/6 w-72 h-72 bg-yellow-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '12s' }}></div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserPreferencesProvider>
            <div className="min-h-screen flex relative z-10">
              <Header />
              <main className="flex-1 ml-16 relative z-10">{children}</main>
            </div>
            <Footer />
          </UserPreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}