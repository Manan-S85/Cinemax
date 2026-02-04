import { Metadata } from 'next';
import Link from 'next/link';
import { Film, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServerMediaCard } from '@/components/server-media-card';
import { getMovies } from '@/lib/data';
import { MediaItem } from '@/types';

export const metadata: Metadata = {
  title: 'Movies - Top Rated Films | Movies & Shows Directory',
  description: 'Discover the best movies of all time. Browse our curated collection of top-rated films with detailed information, ratings, and reviews.',
};

export default async function MoviesPage() {
  const movies = await getMovies();
  
  const movieItems: MediaItem[] = movies.map(movie => ({
    ...movie,
    media_type: 'movie' as const,
  }));

  const topRatedMovies = movieItems
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  const recentMovies = movieItems
    .sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime())
    .slice(0, 8);

  const popularMovies = movieItems
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 8);

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Movies Collection</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully curated selection of the greatest movies ever made, 
          from timeless classics to modern masterpieces.
        </p>
        <Button asChild size="lg">
          <Link href="/browse?type=movie">
            <TrendingUp className="mr-2 h-4 w-4" />
            Browse All Movies
          </Link>
        </Button>
      </div>



      {/* Top Rated Movies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Highest Rated Movies</h2>
            <p className="text-muted-foreground">The best of the best according to user ratings</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse?type=movie&sort=vote_average.desc">
              View All
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRatedMovies.map((movie) => (
            <ServerMediaCard key={movie.id} item={movie} />
          ))}
        </div>
      </section>

      {/* Recent Movies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recent Releases</h2>
            <p className="text-muted-foreground">Latest movies in our collection</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse?type=movie&sort=release_date.desc">
              View All
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentMovies.map((movie) => (
            <ServerMediaCard key={movie.id} item={movie} />
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Most Popular</h2>
            <p className="text-muted-foreground">Trending movies everyone's talking about</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse?type=movie&sort=popularity.desc">
              View All
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularMovies.map((movie) => (
            <ServerMediaCard key={movie.id} item={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}