import { Movie, TVShow, Genre, MediaItem, MediaType } from '@/types';
import {
  getPopularMovies,
  getTopRatedMovies,
  getPopularTVShows,
  getTopRatedTVShows,
  getMovieGenres,
  getTVGenres,
  transformMovieToMediaItem,
  transformTVShowToMediaItem
} from './tmdb-api';

// Cache for API responses
let cachedMovies: Movie[] | null = null;
let cachedTVShows: TVShow[] | null = null;
let cachedGenres: Genre[] | null = null;

// Get all genres (movies + TV combined)
export async function getGenres(): Promise<Genre[]> {
  if (cachedGenres) return cachedGenres;

  try {
    const [movieGenresResponse, tvGenresResponse] = await Promise.all([
      getMovieGenres(),
      getTVGenres()
    ]);

    // Combine and deduplicate genres
    const allGenres = [
      ...movieGenresResponse.genres,
      ...tvGenresResponse.genres
    ];
    
    const uniqueGenres = allGenres.filter((genre, index, self) => 
      index === self.findIndex(g => g.id === genre.id)
    );

    cachedGenres = uniqueGenres;
    return uniqueGenres;
  } catch (error) {
    console.error('Error fetching genres, using fallback:', error);
    // Fallback to basic genres if API fails
    return [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 27, name: 'Horror' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 53, name: 'Thriller' },
      { id: 37, name: 'Western' }
    ];
  }
}

// Get popular and top-rated movies
export async function getMovies(): Promise<Movie[]> {
  if (cachedMovies) return cachedMovies;

  try {
    // Fetch multiple pages to get more movies
    const [popularPage1, popularPage2, topRatedPage1, topRatedPage2] = await Promise.all([
      getPopularMovies(1),
      getPopularMovies(2), 
      getTopRatedMovies(1),
      getTopRatedMovies(2)
    ]);

    const genres = await getGenres();
    
    // Combine all pages, remove duplicates, take top 200
    const allMovies = [
      ...popularPage1.results,
      ...popularPage2.results,
      ...topRatedPage1.results,
      ...topRatedPage2.results
    ];
    
    const uniqueMovies = allMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.id === movie.id)
    ).slice(0, 200);

    // Add genres to each movie
    const moviesWithGenres = uniqueMovies.map(movie => ({
      ...transformMovieToMediaItem(movie),
      genres: movie.genre_ids?.map((id: number) => 
        genres.find(genre => genre.id === id)
      ).filter(Boolean) || []
    }));

    cachedMovies = moviesWithGenres;
    return moviesWithGenres;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Get popular and top-rated TV shows
export async function getTVShows(): Promise<TVShow[]> {
  if (cachedTVShows) return cachedTVShows;

  try {
    // Fetch multiple pages to get more TV shows
    const [popularPage1, popularPage2, topRatedPage1, topRatedPage2] = await Promise.all([
      getPopularTVShows(1),
      getPopularTVShows(2),
      getTopRatedTVShows(1), 
      getTopRatedTVShows(2)
    ]);

    const genres = await getGenres();
    
    // Combine all pages, remove duplicates, take top 200
    const allTVShows = [
      ...popularPage1.results,
      ...popularPage2.results,
      ...topRatedPage1.results,
      ...topRatedPage2.results
    ];
    
    const uniqueTVShows = allTVShows.filter((show, index, self) => 
      index === self.findIndex(s => s.id === show.id)
    ).slice(0, 200);

    // Add genres to each TV show
    const tvShowsWithGenres = uniqueTVShows.map(show => ({
      ...transformTVShowToMediaItem(show),
      genres: show.genre_ids?.map((id: number) => 
        genres.find(genre => genre.id === id)
      ).filter(Boolean) || []
    }));

    cachedTVShows = tvShowsWithGenres;
    return tvShowsWithGenres;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

// Export for backward compatibility
export const mockMovies = getMovies();
export const mockTVShows = getTVShows();
export const genres = getGenres();

// Combined function to get all media items
export async function getAllMediaItems(): Promise<MediaItem[]> {
  try {
    const [movies, tvShows] = await Promise.all([
      getMovies(),
      getTVShows()
    ]);

    const movieItems: MediaItem[] = movies.map(movie => ({
      ...movie,
      media_type: 'movie' as MediaType,
    }));

    const tvItems: MediaItem[] = tvShows.map(show => ({
      ...show,
      title: show.name,
      release_date: show.first_air_date,
      media_type: 'tv' as MediaType,
    }));

    return [...movieItems, ...tvItems];
  } catch (error) {
    console.error('Error fetching all media items:', error);
    return [];
  }
}