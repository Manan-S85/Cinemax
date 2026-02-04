import Link from 'next/link';
import { Search, Home, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="container px-4 py-16 text-center space-y-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <Search className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. 
            The movie or TV show might have been moved or doesn't exist.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Film className="h-5 w-5" />
              What would you like to do?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/browse">
                <Search className="mr-2 h-4 w-4" />
                Browse All Content
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/collections">
                <Film className="mr-2 h-4 w-4" />
                View Collections
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}