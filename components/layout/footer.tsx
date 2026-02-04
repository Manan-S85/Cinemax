import Link from 'next/link';
import { Film, Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-5 w-5" />
              <span className="font-bold">Movies & Shows</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover top-rated movies and trending TV shows with detailed information, ratings, and reviews.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies" className="text-muted-foreground hover:text-foreground">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="text-muted-foreground hover:text-foreground">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-foreground">
                  All Content
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Collections</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/top-rated" className="text-muted-foreground hover:text-foreground">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/collections/action-movies" className="text-muted-foreground hover:text-foreground">
                  Best Action Movies
                </Link>
              </li>
              <li>
                <Link href="/collections/crime-dramas" className="text-muted-foreground hover:text-foreground">
                  Crime Dramas
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Movies & Shows Directory. Data provided by TMDB.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}