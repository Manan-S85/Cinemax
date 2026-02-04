'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's a previous page in history
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      // Fallback to browse page
      router.push('/browse');
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleBack}
      className="flex items-center gap-2 mb-4 hover:bg-accent"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}