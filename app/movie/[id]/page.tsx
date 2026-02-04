import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, Clock, Globe, ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/back-button';
import { getMovieDetails } from '@/lib/tmdb-api';
import { formatRating, getImageUrl, formatDate } from '@/lib/utils';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  // Generate static params for popular movies only (to avoid API rate limits)
  // In a production app, you might want to pre-generate more paths
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const movie = await getMovieDetails(resolvedParams.id);
    
    return {
      title: `${movie.title} (${new Date(movie.release_date).getFullYear()}) | Movies Directory`,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: [getImageUrl(movie.poster_path || '', 'w780')],
      },
    };
  } catch (error) {
    return {
      title: 'Movie Not Found | Movies Directory',
      description: 'The requested movie could not be found.',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  
  let movie;
  try {
    movie = await getMovieDetails(resolvedParams.id);
  } catch (error) {
    notFound();
  }

  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${getImageUrl(movie.backdrop_path || '', 'original')})`
        }}
      >
        <div className="container px-4 py-8 h-full flex items-end">
          <div className="bg-black/50 border border-white/20 rounded-md p-1">
            <BackButton />
          </div>
        </div>
      </div>

      <div className="container px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(movie.poster_path || '', 'w780')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{movie.title}</CardTitle>
                    {movie.tagline && (
                      <CardDescription className="text-lg italic">
                        "{movie.tagline}"
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{formatRating(movie.vote_average)}</span>
                    <span className="text-muted-foreground">({movie.vote_count} votes)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
                </div>

                {/* Genres */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre: { id: number; name: string }) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Movie Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Release Date:</span>
                      <span className="text-muted-foreground">{formatDate(movie.release_date)}</span>
                    </div>
                    {movie.runtime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Runtime:</span>
                        <span className="text-muted-foreground">{movie.runtime} minutes</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Language:</span>
                      <span className="text-muted-foreground">{movie.original_language.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Popularity:</span>
                      <span className="text-muted-foreground">{movie.popularity.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Rating:</span>
                      <span className="text-muted-foreground">{formatRating(movie.vote_average)}/10</span>
                    </div>
                    {movie.adult && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Content:</span>
                        <Badge variant="destructive">Adult</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {(movie.budget || movie.revenue) && (
              <Card>
                <CardHeader>
                  <CardTitle>Box Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {movie.budget && (
                      <div>
                        <span className="font-medium">Budget:</span>
                        <p className="text-muted-foreground">
                          ${movie.budget.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {movie.revenue && (
                      <div>
                        <span className="font-medium">Revenue:</span>
                        <p className="text-muted-foreground">
                          ${movie.revenue.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}