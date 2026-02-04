import Link from 'next/link';
import Image from 'next/image';
import { Star, TrendingUp, Film, Tv, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMovies, getTVShows } from '@/lib/data';
import { formatRating, getImageUrl } from '@/lib/utils';

export default async function HomePage() {
  const [movies, tvShows] = await Promise.all([
    getMovies(),
    getTVShows()
  ]);

  const featuredMovies = movies.slice(0, 3);
  const featuredTVShows = tvShows.slice(0, 3);
  const totalContent = movies.length + tvShows.length;

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-24">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Amazing
            <br />
            <span className="text-primary">Movies & Shows</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Explore our curated collection of top-rated movies and trending TV shows. 
            Find detailed information, ratings, reviews, and much more.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/browse">
                <TrendingUp className="mr-2 h-4 w-4" />
                Browse All Content
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/collections">
                View Collections
              </Link>
            </Button>
          </div>
        </div>
      </section>



      {/* Featured Movies */}
      <section className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Featured Movies</h2>
          <Button variant="outline" asChild>
            <Link href="/movies">
              <Film className="mr-2 h-4 w-4" />
              View All Movies
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMovies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(movie.poster_path || '', 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {formatRating(movie.vote_average)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {movie.overview}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre.id} variant="outline" className="text-xs">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/movie/${movie.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured TV Shows */}
      <section className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Featured TV Shows</h2>
          <Button variant="outline" asChild>
            <Link href="/tv-shows">
              <Tv className="mr-2 h-4 w-4" />
              View All Shows
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTVShows.map((show) => (
            <Card key={show.id} className="overflow-hidden">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(show.poster_path || '', 'w500')}
                  alt={show.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {formatRating(show.vote_average)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {show.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {show.overview}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {show.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre.id} variant="outline" className="text-xs">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/tv/${show.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">About Our Directory</CardTitle>
            <CardDescription>
              Everything you need to know about our movie and TV show database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Our Movies & Shows Directory is a comprehensive collection featuring top-rated movies 
              from cinema history and trending TV shows from around the world. We provide detailed 
              information including plot summaries, cast details, ratings, release dates, and much more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  Movies Collection
                </h4>
                <p className="text-sm text-muted-foreground">
                  Curated selection of critically acclaimed and popular movies spanning multiple genres and decades.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Tv className="h-4 w-4" />
                  TV Shows Collection
                </h4>
                <p className="text-sm text-muted-foreground">
                  Trending and highly-rated television series including both ongoing and completed shows.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}