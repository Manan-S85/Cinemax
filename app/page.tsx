import Link from 'next/link';
import Image from 'next/image';
import { Star, TrendingUp, Film, Tv, Users, Calendar, Play } from 'lucide-react';
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
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container px-4 py-24 md:py-32 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Movies & Shows
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Directory
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Discover your next favorite movie or TV show from our curated collection
            of top-rated content from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-2xl shadow-orange-500/30 transform hover:scale-105 transition-all duration-300">
              <Link href="/browse">
                <TrendingUp className="mr-2 h-5 w-5" />
                Browse All
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-amber-600 text-amber-200 hover:bg-amber-500/20 hover:text-white backdrop-blur-sm shadow-lg shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
              <Link href="/top-250">
                <Star className="mr-2 h-5 w-5" />
                Top 250
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="container px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
              Featured Movies
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 mt-3 rounded-full shadow-lg shadow-orange-500/50"></div>
          </div>
          <Button variant="outline" asChild className="border-orange-600 text-orange-200 hover:bg-orange-500/20 hover:text-white backdrop-blur-sm shadow-lg shadow-orange-500/20">
            <Link href="/movies">
              <Film className="mr-2 h-4 w-4" />
              View All Movies
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMovies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden bg-black/50 backdrop-blur-md border-orange-800/50 hover:bg-black/70 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/25 transform hover:scale-[1.02]">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(movie.poster_path || '', 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="flex items-center gap-1 bg-black/80 backdrop-blur-md border-0">
                    <Star className="h-3 w-3 fill-current text-amber-400" />
                    {formatRating(movie.vote_average)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 bg-gradient-to-br from-orange-900/60 to-black/80 backdrop-blur-md">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-white drop-shadow-lg">
                  {movie.title}
                </h3>
                <p className="text-sm text-amber-100 mb-3 line-clamp-2">
                  {movie.overview}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre.id} variant="outline" className="text-xs border-orange-600/60 text-orange-200 bg-orange-900/30">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-lg shadow-orange-500/30 transform hover:scale-105 transition-all duration-300">
                  <Link href={`/movie/${movie.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured TV Shows */}
      <section className="container px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
              Featured TV Shows
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-pink-500 to-red-500 mt-3 rounded-full shadow-lg shadow-pink-500/50"></div>
          </div>
          <Button variant="outline" asChild className="border-pink-600 text-pink-200 hover:bg-pink-500/20 hover:text-white backdrop-blur-sm shadow-lg shadow-pink-500/20">
            <Link href="/tv-shows">
              <Tv className="mr-2 h-4 w-4" />
              View All Shows
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTVShows.map((show) => (
            <Card key={show.id} className="overflow-hidden bg-black/50 backdrop-blur-md border-pink-800/50 hover:bg-black/70 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/25 transform hover:scale-[1.02]">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(show.poster_path || '', 'w500')}
                  alt={show.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="flex items-center gap-1 bg-black/80 backdrop-blur-md border-0">
                    <Star className="h-3 w-3 fill-current text-amber-400" />
                    {formatRating(show.vote_average)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 bg-gradient-to-br from-pink-900/60 to-black/80 backdrop-blur-md">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-white drop-shadow-lg">
                  {show.name}
                </h3>
                <p className="text-sm text-pink-100 mb-3 line-clamp-2">
                  {show.overview}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {show.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre.id} variant="outline" className="text-xs border-pink-600/60 text-pink-200 bg-pink-900/30">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 text-white border-0 shadow-lg shadow-pink-500/30 transform hover:scale-105 transition-all duration-300">
                  <Link href={`/tv/${show.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container px-4 relative z-10 mb-12">
        <Card className="bg-black/60 backdrop-blur-lg border-orange-800/50 shadow-2xl shadow-orange-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
              About Our Directory
            </CardTitle>
            <CardDescription className="text-amber-200">
              Everything you need to know about our movie and TV show database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-amber-100 text-center max-w-3xl mx-auto leading-relaxed">
              Our Movies & Shows Directory is a comprehensive collection featuring top-rated movies 
              from cinema history and trending TV shows from around the world. We provide detailed 
              information including plot summaries, cast details, ratings, release dates, and much more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-orange-500/30 to-red-500/30 p-6 rounded-xl backdrop-blur-md border border-orange-600/30 shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                <h4 className="font-semibold flex items-center gap-2 text-white mb-3">
                  <Film className="h-5 w-5 text-orange-400" />
                  Movies Collection
                </h4>
                <p className="text-sm text-orange-100">
                  Curated selection of critically acclaimed and popular movies spanning multiple genres and decades.
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-500/30 to-red-500/30 p-6 rounded-xl backdrop-blur-md border border-pink-600/30 shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                <h4 className="font-semibold flex items-center gap-2 text-white mb-3">
                  <Tv className="h-5 w-5 text-pink-400" />
                  TV Shows Collection
                </h4>
                <p className="text-sm text-pink-100">
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