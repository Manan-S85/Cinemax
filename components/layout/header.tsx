'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Home, Film, Heart, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    router.push('/browse');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-16 bg-black/60 backdrop-blur-lg border-r border-orange-800/50 flex flex-col items-center py-4">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
          <Film className="h-6 w-6 text-white" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="nav-icon group" title="Home">
          <Home className="h-6 w-6 text-orange-300 group-hover:text-orange-400 transition-colors" />
        </Link>
        <Link href="/movies" className="nav-icon group" title="Movies">
          <Film className="h-6 w-6 text-orange-300 group-hover:text-red-400 transition-colors" />
        </Link>
        <Link href="/watchlist" className="nav-icon group" title="Watchlist">
          <Heart className="h-6 w-6 text-orange-300 group-hover:text-pink-400 transition-colors" />
        </Link>
        <Link href="/browse" className="nav-icon group" title="Search">
          <Search className="h-6 w-6 text-orange-300 group-hover:text-amber-400 transition-colors" />
        </Link>
      </nav>

      {/* Theme Toggle */}
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="sm"
        className="mt-auto p-0 h-auto nav-icon group transition-all duration-300 hover:scale-110"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <div className="relative">
          {theme === 'dark' ? (
            <Sun className="h-6 w-6 text-orange-300 group-hover:text-yellow-400 transition-colors animate-pulse" />
          ) : (
            <Moon className="h-6 w-6 text-orange-300 group-hover:text-blue-400 transition-colors" />
          )}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/0 to-orange-400/20 group-hover:from-orange-400/20 group-hover:to-orange-400/40 transition-all duration-300"></div>
        </div>
      </Button>
    </aside>
  );
}