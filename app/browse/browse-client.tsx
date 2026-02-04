'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { MediaCard } from '@/components/media-card';
import { MediaItem, Genre } from '@/types';
import { searchMulti } from '@/lib/tmdb-api';

interface BrowseClientProps {
  initialItems: MediaItem[];
  genres: Genre[];
}

export default function BrowseClient({ initialItems, genres }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(!!initialQuery);

  const updateURL = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/browse?${params.toString()}`, { scroll: false });
  };

  // Load search results if there's an initial query
  useEffect(() => {
    if (initialQuery) {
      const loadInitialResults = async () => {
        setIsLoading(true);
        try {
          const results = await searchMulti(initialQuery);
          setSearchResults(results.results);
          setShowSearchResults(true);
        } catch (error) {
          console.error('Initial search error:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadInitialResults();
    }
  }, [initialQuery]);

  const handleSearch = async (query: string) => {
    if (query.trim().length > 0) {
      setIsLoading(true);
      try {
        const results = await searchMulti(query);
        setSearchResults(results.results);
        setShowSearchResults(true);
        updateURL(query);
      } catch (error) {
        console.error('Search error:', error);
        alert(`Search failed. Please try again.`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
      updateURL('');
    }
  };

  // Debounced search - only for user input, not initial load
  useEffect(() => {
    // Don't debounce the initial query
    if (searchQuery === initialQuery && initialQuery) {
      return;
    }
    
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, initialQuery]);

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Universal Search
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find any movie or TV show instantly
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <input
            type="text"
            placeholder="Search movies, TV shows, anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-16 pr-6 text-lg bg-background/50 backdrop-blur border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
          {isLoading && (
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        
        {!showSearchResults && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button onClick={() => setSearchQuery('inception')} className="px-4 py-2 bg-background/50 backdrop-blur border border-border rounded-full text-sm hover:bg-background/80 transition-all">
              ✨ Inception
            </button>
            <button onClick={() => setSearchQuery('breaking bad')} className="px-4 py-2 bg-background/50 backdrop-blur border border-border rounded-full text-sm hover:bg-background/80 transition-all">
              📺 Breaking Bad
            </button>
            <button onClick={() => setSearchQuery('avatar')} className="px-4 py-2 bg-background/50 backdrop-blur border border-border rounded-full text-sm hover:bg-background/80 transition-all">
              🌟 Avatar
            </button>
            <button onClick={() => setSearchQuery('naruto')} className="px-4 py-2 bg-background/50 backdrop-blur border border-border rounded-full text-sm hover:bg-background/80 transition-all">
              🥷 Naruto
            </button>
            <button onClick={() => setSearchQuery('john wick')} className="px-4 py-2 bg-background/50 backdrop-blur border border-border rounded-full text-sm hover:bg-background/80 transition-all">
              🔫 John Wick
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-6">
        {showSearchResults && searchQuery && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Results for "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchResults.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto mb-6 opacity-30" />
            <h3 className="text-xl font-semibold mb-4">
              No results for "{searchQuery}"
            </h3>
            <p className="text-muted-foreground mb-6">
              Try a different search term or check your spelling
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={() => setSearchQuery('avengers')} className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm hover:bg-background/80 transition-all">
                Try "Avengers"
              </button>
              <button onClick={() => setSearchQuery('batman')} className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm hover:bg-background/80 transition-all">
                Try "Batman"
              </button>
              <button onClick={() => setSearchQuery('')} className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-sm hover:bg-red-500/30 transition-all">
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎬</div>
            <h3 className="text-2xl font-semibold mb-4">
              Ready to discover?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Use the search above to find any movie or TV show
            </p>
          </div>
        )}
      </div>
    </div>
  );
}