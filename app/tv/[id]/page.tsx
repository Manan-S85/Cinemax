import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, Tv2, Globe, ArrowLeft, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTVShowDetails } from '@/lib/tmdb-api';
import { formatRating, getImageUrl, formatDate } from '@/lib/utils';

interface TVShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  // Generate static params for popular shows only
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export async function generateMetadata({ params }: TVShowPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const show = await getTVShowDetails(resolvedParams.id);
    
    return {
      title: `${show.name} (${new Date(show.first_air_date).getFullYear()}) | TV Shows Directory`,
      description: show.overview,
      openGraph: {
        title: show.name,
        description: show.overview,
        images: [getImageUrl(show.poster_path || '', 'w780')],
      },
    };
  } catch (error) {
    return {
      title: 'TV Show Not Found | TV Shows Directory',
      description: 'The requested TV show could not be found.',
    };
  }
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const resolvedParams = await params;
  
  let show;
  try {
    show = await getTVShowDetails(resolvedParams.id);
  } catch (error) {
    notFound();
  }

  const firstAirYear = new Date(show.first_air_date).getFullYear();
  const lastAirYear = show.last_air_date ? new Date(show.last_air_date).getFullYear() : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${getImageUrl(show.backdrop_path || '', 'original')})`
        }}
      >
        <div className="container px-4 py-8 h-full flex items-end">
          <Button variant="outline" size="sm" asChild className="mb-4 bg-black/50 border-white/20 text-white hover:bg-white/10">
            <Link href="/tv-shows">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to TV Shows
            </Link>
          </Button>
        </div>
      </div>

      <div className="container px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(show.poster_path || '', 'w780')}
                  alt={show.name}
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
                    <CardTitle className="text-3xl mb-2">{show.name}</CardTitle>
                    {show.tagline && (
                      <CardDescription className="text-lg italic">
                        "{show.tagline}"
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{formatRating(show.vote_average)}</span>
                    <span className="text-muted-foreground">({show.vote_count} votes)</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {show.status && (
                    <Badge variant={show.status === 'Ended' ? 'secondary' : 'default'}>
                      {show.status}
                    </Badge>
                  )}
                  <span className="text-muted-foreground">
                    {firstAirYear}{lastAirYear && lastAirYear !== firstAirYear ? ` - ${lastAirYear}` : ''}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{show.overview}</p>
                </div>

                {/* Genres */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {show.genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Show Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">First Air Date:</span>
                      <span className="text-muted-foreground">{formatDate(show.first_air_date)}</span>
                    </div>
                    {show.last_air_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Last Air Date:</span>
                        <span className="text-muted-foreground">{formatDate(show.last_air_date)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Language:</span>
                      <span className="text-muted-foreground">{show.original_language.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Origin:</span>
                      <span className="text-muted-foreground">{show.origin_country.join(', ')}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {show.number_of_seasons && (
                      <div className="flex items-center gap-2">
                        <Tv2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Seasons:</span>
                        <span className="text-muted-foreground">{show.number_of_seasons}</span>
                      </div>
                    )}
                    {show.number_of_episodes && (
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Episodes:</span>
                        <span className="text-muted-foreground">{show.number_of_episodes}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Popularity:</span>
                      <span className="text-muted-foreground">{show.popularity.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Rating:</span>
                      <span className="text-muted-foreground">{formatRating(show.vote_average)}/10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Information */}
            {show.production_companies && show.production_companies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <span className="font-medium">Production Companies:</span>
                    <div className="flex flex-wrap gap-2">
                      {show.production_companies.map((company) => (
                        <Badge key={company.id} variant="outline">
                          {company.name}
                        </Badge>
                      ))}
                    </div>
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