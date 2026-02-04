'use client';

import { useEffect, useState } from 'react';
import { ClientMediaCard } from '@/components/client-media-card';
import { getTopRatedMovies, transformMovieToMediaItem } from '@/lib/tmdb-api';

export default function Top250Page() {
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Get the first 13 pages to get ~250 movies (20 per page)
        const pages = await Promise.all([
          getTopRatedMovies(1),
          getTopRatedMovies(2),
          getTopRatedMovies(3),
          getTopRatedMovies(4),
          getTopRatedMovies(5),
          getTopRatedMovies(6),
          getTopRatedMovies(7),
          getTopRatedMovies(8),
          getTopRatedMovies(9),
          getTopRatedMovies(10),
          getTopRatedMovies(11),
          getTopRatedMovies(12),
          getTopRatedMovies(13),
        ]);

        // Flatten all results, transform data, and limit to 250
        const movies = pages
          .flatMap(page => page.results || [])
          .map(transformMovieToMediaItem)
          .slice(0, 250);
        
        setAllMovies(movies);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Top 250 Movies</h1>
          <p className="text-muted-foreground">
            The highest-rated movies of all time, ranked by user ratings and critical acclaim.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allMovies.map((movie, index) => {
            const mediaItem = {
              ...movie,
              media_type: 'movie' as const,
            };
            
            return (
              <div key={`top-250-${index}`} className="relative">
                <div className="absolute -top-2 -left-2 z-10 bg-red-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </div>
                <ClientMediaCard item={mediaItem} />
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-8">
          Showing {allMovies.length} of the highest-rated movies from The Movie Database (TMDB)
        </div>
      </div>
    </div>
  );
}