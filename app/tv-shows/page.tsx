import { Metadata } from 'next';
import Link from 'next/link';
import { Tv, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaCard } from '@/components/media-card';
import { getTVShows } from '@/lib/data';
import { MediaItem } from '@/types';

export const metadata: Metadata = {
  title: 'TV Shows - Best Series & Shows | Movies & Shows Directory',
  description: 'Discover the best TV shows and series. Browse our curated collection of top-rated television content with detailed information, ratings, and reviews.',
};

export default async function TVShowsPage() {
  const tvShows = await getTVShows();
  
  const showItems: MediaItem[] = tvShows.map(show => ({
    ...show,
    title: show.name,
    release_date: show.first_air_date,
    media_type: 'tv' as const,
  }));

  const topRatedShows = showItems
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  const recentShows = showItems
    .sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime())
    .slice(0, 8);

  const popularShows = showItems
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 8);

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Tv className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">TV Shows Collection</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Dive into our handpicked selection of the most acclaimed television series, 
          from groundbreaking dramas to binge-worthy comedies.
        </p>
        <Button asChild size="lg">
          <Link href="/browse?type=tv">
            <TrendingUp className="mr-2 h-4 w-4" />
            Browse All TV Shows
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shows</CardTitle>
            <Tv className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tvShows.length}</div>
            <p className="text-xs text-muted-foreground">
              Quality series
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tvShows.length > 0 ? (tvShows.reduce((acc, show) => acc + show.vote_average, 0) / tvShows.length).toFixed(1) : '0.0'}
            </div>
            <p className="text-xs text-muted-foreground">
              User rating
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTVShows.reduce((acc, show) => acc + (show.number_of_episodes || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all series
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Rated Shows */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Highest Rated Shows</h2>
            <p className="text-muted-foreground">The finest television has to offer</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse?type=tv&sort=vote_average.desc">
              View All
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topRatedShows.map((show) => (
            <MediaCard key={show.id} item={show} />
          ))}
        </div>
      </section>

      {/* Recent Shows */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Latest Additions</h2>
            <p className="text-muted-foreground">Recently added to our collection</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse?type=tv&sort=first_air_date.desc">
              View All
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentShows.map((show) => (
            <MediaCard key={show.id} item={show} />
          ))}
        </div>
      </section>

      {/* Popular Shows */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-muted-foreground">Shows everyone's binge-watching</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse?type=tv&sort=popularity.desc">
              View All
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularShows.map((show) => (
            <MediaCard key={show.id} item={show} />
          ))}
        </div>
      </section>
    </div>
  );
}