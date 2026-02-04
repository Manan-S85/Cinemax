'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Home, Film, Tv, Search, Sun, Moon } from 'lucide-react';
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
    <aside className="fixed left-0 top-0 z-50 h-screen w-16 bg-black border-r border-gray-800 flex flex-col items-center py-4">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Film className="h-6 w-6 text-white" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="nav-icon group" title="Home">
          <Home className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </Link>
        <Link href="/movies" className="nav-icon group" title="Movies">
          <Film className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </Link>
        <Link href="/browse" className="nav-icon group" title="Search">
          <Search className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
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
            <Sun className="h-6 w-6 text-gray-400 group-hover:text-yellow-500 transition-colors animate-pulse" />
          ) : (
            <Moon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
          )}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/0 to-yellow-400/20 group-hover:from-yellow-400/20 group-hover:to-yellow-400/40 transition-all duration-300"></div>
        </div>
      </Button>
    </aside>
  );
}