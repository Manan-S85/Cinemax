import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Star, Filter, TrendingUp, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/media-card';
import { getAllMediaItems } from '@/lib/data';
import { getImageUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Collections - Curated Lists | Movies & Shows Directory',
  description: 'Explore our curated collections of movies and TV shows organized by themes, genres, ratings, and more.',
};

export default async function CollectionsPage() {
  const allItems = await getAllMediaItems();

  // Collection: Top Rated (8.0+)
  const topRated = allItems
    .filter(item => item.vote_average >= 8.0)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  // Collection: Best Action Movies
  const actionMovies = allItems
    .filter(item => 
      item.media_type === 'movie' && 
      item.genres?.some(genre => genre.name === 'Action')
    )
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  // Collection: Crime Dramas
  const crimeDramas = allItems
    .filter(item => 
      item.genres?.some(genre => genre.name === 'Crime' || genre.name === 'Drama')
    )
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  // Collection: Modern Classics (2000+)
  const modernClassics = allItems
    .filter(item => {
      const releaseDate = item.media_type === 'movie' ? item.release_date : item.first_air_date;
      const year = releaseDate ? new Date(releaseDate).getFullYear() : 0;
      return year >= 2000 && item.vote_average >= 8.0;
    })
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  // Collection: Animated Excellence
  const animatedContent = allItems
    .filter(item => 
      item.genres?.some(genre => genre.name === 'Animation')
    )
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  // Collection: Sci-Fi & Fantasy
  const sciFiFantasy = allItems
    .filter(item => 
      item.genres?.some(genre => 
        genre.name === 'Science Fiction' || 
        genre.name === 'Fantasy' ||
        genre.name === 'Sci-Fi & Fantasy'
      )
    )
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 8);

  const collections = [
    {
      id: 'top-rated',
      title: 'Top Rated Content',
      description: 'The highest-rated movies and TV shows with 8.0+ ratings',
      icon: Trophy,
      items: topRated,
      href: '/browse?rating=8.0',
      color: 'text-yellow-500',
    },
    {
      id: 'action-movies',
      title: 'Best Action Movies',
      description: 'Heart-pounding action films that deliver thrills',
      icon: TrendingUp,
      items: actionMovies,
      href: '/browse?type=movie&genre=Action',
      color: 'text-red-500',
    },
    {
      id: 'crime-dramas',
      title: 'Crime Dramas',
      description: 'Gripping crime stories and dramatic narratives',
      icon: Filter,
      items: crimeDramas,
      href: '/browse?genre=Crime',
      color: 'text-purple-500',
    },
    {
      id: 'modern-classics',
      title: 'Modern Classics',
      description: 'Exceptional content from 2000 onwards',
      icon: Calendar,
      items: modernClassics,
      href: '/browse?year=2000&rating=8.0',
      color: 'text-blue-500',
    },
    {
      id: 'animated-excellence',
      title: 'Animated Excellence',
      description: 'The finest in animated movies and shows',
      icon: Star,
      items: animatedContent,
      href: '/browse?genre=Animation',
      color: 'text-green-500',
    },
    {
      id: 'sci-fi-fantasy',
      title: 'Sci-Fi & Fantasy',
      description: 'Explore other worlds and future possibilities',
      icon: Users,
      items: sciFiFantasy,
      href: '/browse?genre=Science Fiction',
      color: 'text-indigo-500',
    },
  ];

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Curated Collections</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover movies and TV shows organized by themes, genres, and special criteria. 
          Each collection is carefully curated to help you find exactly what you're looking for.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="space-y-12">
        {collections.map((collection) => {
          const IconComponent = collection.icon;
          return (
            <section key={collection.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${collection.color}`} />
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {collection.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {collection.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={collection.href}>
                    View All
                  </Link>
                </Button>
              </div>

              {/* Collection Preview */}
              {collection.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {collection.items.slice(0, 4).map((item) => (
                    <MediaCard key={`${item.media_type}-${item.id}`} item={item} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <p className="text-muted-foreground">No content available in this collection yet.</p>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {collection.items.length} items in this collection
                </p>
                <Button asChild>
                  <Link href={collection.href}>
                    Explore {collection.title}
                  </Link>
                </Button>
              </div>
            </section>
          );
        })}
      </div>

      {/* Featured Collection Highlight */}
      <Card className="overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="absolute inset-0 bg-black/20" />
          <CardContent className="relative h-full flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Trophy className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold">Premium Collections</h3>
              <p className="text-muted-foreground max-w-md">
                More curated collections coming soon! We're constantly updating our library 
                with new themed collections and special features.
              </p>
              <Button asChild>
                <Link href="/browse">
                  Browse All Content
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}