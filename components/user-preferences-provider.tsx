'use client';

import React, { createContext, useContext } from 'react';
import { UserContext } from '@/types';
import { useLocalStorage } from '@/lib/useLocalStorage';

const UserPreferencesContext = createContext<UserContext | null>(null);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const {
    preferences,
    isLoaded,
    updatePreferences,
    addToWatchlist,
    removeFromWatchlist,
    toggleFavoriteGenre,
    addToRecentlyViewed,
    isInWatchlist,
    isFavoriteGenre,
  } = useLocalStorage();

  const contextValue: UserContext = {
    preferences,
    updatePreferences,
    addToWatchlist,
    removeFromWatchlist,
    toggleFavoriteGenre,
    addToRecentlyViewed,
    isInWatchlist,
    isFavoriteGenre,
  };

  // Don't render children until preferences are loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}