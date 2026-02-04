'use client';

import { useState, useEffect } from 'react';
import { UserPreferences } from '@/types';

const DEFAULT_PREFERENCES: UserPreferences = {
  favoriteGenres: [],
  watchlist: [],
  recentlyViewed: [],
  theme: 'dark',
  lastVisited: new Date().toISOString(),
};

const STORAGE_KEY = 'movieApp_preferences';

export function useLocalStorage() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (error) {
      console.error('Error loading preferences from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch (error) {
        console.error('Error saving preferences to localStorage:', error);
      }
    }
  }, [preferences, isLoaded]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...updates,
      lastVisited: new Date().toISOString(),
    }));
  };

  const addToWatchlist = (item: MediaItem) => {
    setPreferences(prev => {
      // Check if item already exists
      const exists = prev.watchlist.some(watchlistItem => watchlistItem.id === item.id);
      if (exists) return prev;
      
      return {
        ...prev,
        watchlist: [...prev.watchlist, item],
        lastVisited: new Date().toISOString(),
      };
    });
  };

  const removeFromWatchlist = (id: number) => {
    setPreferences(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(item => item.id !== id),
      lastVisited: new Date().toISOString(),
    }));
  };

  const toggleFavoriteGenre = (genreId: number) => {
    setPreferences(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genreId)
        ? prev.favoriteGenres.filter(id => id !== genreId)
        : [...prev.favoriteGenres, genreId],
      lastVisited: new Date().toISOString(),
    }));
  };

  const addToRecentlyViewed = (id: number) => {
    setPreferences(prev => {
      const filtered = prev.recentlyViewed.filter(item => item !== id);
      return {
        ...prev,
        recentlyViewed: [id, ...filtered].slice(0, 20), // Keep only 20 recent items
        lastVisited: new Date().toISOString(),
      };
    });
  };

  const isInWatchlist = (id: number) => preferences.watchlist.some(item => item.id === id);
  
  const isFavoriteGenre = (genreId: number) => preferences.favoriteGenres.includes(genreId);

  return {
    preferences,
    isLoaded,
    updatePreferences,
    addToWatchlist,
    removeFromWatchlist,
    toggleFavoriteGenre,
    addToRecentlyViewed,
    isInWatchlist,
    isFavoriteGenre,
  };
}