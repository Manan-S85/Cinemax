'use client';

import { useEffect, useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/media-card';
import { useUserPreferences } from '@/components/user-preferences-provider';
import { MediaItem } from '@/types';

export default function WatchlistPage() {
  const { preferences, removeFromWatchlist } = useUserPreferences();
  const [watchlistItems, setWatchlistItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Directly use the watchlist items from preferences
    setWatchlistItems(preferences.watchlist);
  }, [preferences.watchlist]);

  const clearWatchlist = () => {
    // Remove each item individually
    watchlistItems.forEach(item => removeFromWatchlist(item.id));
  };

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Watchlist</h1>
            <p className="text-muted-foreground">
              {watchlistItems.length} {watchlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>
        
        {watchlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWatchlist} className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Watchlist Content */}
      {watchlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding movies and shows to your watchlist by clicking the + button on any card
          </p>
          <Button asChild>
            <a href="/browse">Browse Content</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {watchlistItems.map((item) => (
            <MediaCard key={`watchlist-${item.media_type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}