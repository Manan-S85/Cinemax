'use client';

import { MediaCard as BaseMediaCard } from '@/components/media-card';
import { MediaItem } from '@/types';

interface ClientMediaCardProps {
  item: MediaItem;
}

export function ClientMediaCard({ item }: ClientMediaCardProps) {
  return <BaseMediaCard item={item} />;
}