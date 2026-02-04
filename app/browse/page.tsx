import { Metadata } from 'next';
import { getAllMediaItems, getGenres } from '@/lib/data';
import BrowseClient from './browse-client';

export const metadata: Metadata = {
  title: 'Browse All Content | Movies & Shows Directory',
  description: 'Browse and filter our complete collection of movies and TV shows. Find exactly what you\'re looking for with advanced filtering options.',
};

export default async function BrowsePage() {
  const [allItems, genres] = await Promise.all([
    getAllMediaItems(),
    getGenres()
  ]);

  return <BrowseClient initialItems={allItems} genres={genres} />;
}