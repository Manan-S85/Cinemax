import Link from 'next/link';
import Image from 'next/image';
import { Star, Calendar, Film, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MediaItem } from '@/types';
import { formatRating, getImageUrl, formatDate } from '@/lib/utils';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const title = item.media_type === 'movie' ? item.title : item.name;
  const releaseDate = item.media_type === 'movie' ? item.release_date : item.first_air_date;
  const detailUrl = item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={getImageUrl(item.poster_path || '', 'w500')}
          alt={title || 'Media poster'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            {formatRating(item.vote_average)}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="flex items-center gap-1 bg-background/80">
            {item.media_type === 'movie' ? (
              <Film className="h-3 w-3" />
            ) : (
              <Tv className="h-3 w-3" />
            )}
            {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-3 w-3" />
          {releaseDate ? formatDate(releaseDate) : 'Date unknown'}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {item.overview}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.genres?.slice(0, 2).map((genre) => (
            <Badge key={genre.id} variant="outline" className="text-xs">
              {genre.name}
            </Badge>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={detailUrl}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}