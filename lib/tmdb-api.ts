// TMDB API configuration
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.warn('TMDB API key is not configured. Using mock data.');
}

// API request headers
const API_HEADERS = {
  'Authorization': `Bearer ${TMDB_API_KEY}`,
  'Content-Type': 'application/json'
};

// Generic fetch function with error handling
async function tmdbFetch(endpoint: string): Promise<any> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  const url = `${TMDB_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: API_HEADERS,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from TMDB API: ${endpoint}`, error);
    throw error;
  }
}

// Get popular movies
export async function getPopularMovies(page = 1) {
  return tmdbFetch(`/movie/popular?page=${page}`);
}

// Get top rated movies
export async function getTopRatedMovies(page = 1) {
  return tmdbFetch(`/movie/top_rated?page=${page}`);
}

// Get now playing movies
export async function getNowPlayingMovies(page = 1) {
  return tmdbFetch(`/movie/now_playing?page=${page}`);
}

// Get upcoming movies
export async function getUpcomingMovies(page = 1) {
  return tmdbFetch(`/movie/upcoming?page=${page}`);
}

// Get movie details
export async function getMovieDetails(movieId: string | number) {
  return tmdbFetch(`/movie/${movieId}?append_to_response=credits,videos,similar`);
}

// Get popular TV shows
export async function getPopularTVShows(page = 1) {
  return tmdbFetch(`/tv/popular?page=${page}`);
}

// Get top rated TV shows
export async function getTopRatedTVShows(page = 1) {
  return tmdbFetch(`/tv/top_rated?page=${page}`);
}

// Get airing today TV shows
export async function getAiringTodayTVShows(page = 1) {
  return tmdbFetch(`/tv/airing_today?page=${page}`);
}

// Get on the air TV shows
export async function getOnTheAirTVShows(page = 1) {
  return tmdbFetch(`/tv/on_the_air?page=${page}`);
}

// Get TV show details
export async function getTVShowDetails(tvId: string | number) {
  return tmdbFetch(`/tv/${tvId}?append_to_response=credits,videos,similar`);
}

// Get genres for movies
export async function getMovieGenres() {
  return tmdbFetch('/genre/movie/list');
}

// Get genres for TV shows
export async function getTVGenres() {
  return tmdbFetch('/genre/tv/list');
}

// Test function to verify API connectivity
export async function testAPI() {
  try {
    console.log('Testing TMDB API...');
    console.log('API Key:', TMDB_API_KEY ? 'Present' : 'Missing');
    
    const data = await tmdbFetch('/search/multi?query=dragon ball');
    console.log('API Test Results:', data);
    return data;
  } catch (error) {
    console.error('API Test Failed:', error);
    throw error;
  }
}

// Transform API response to MediaItem format
export function transformMediaItem(item: any): any {
  // Handle both movie and TV show formats
  if (item.media_type === 'movie' || item.title) {
    return {
      id: item.id,
      title: item.title,
      name: item.title, // For consistency
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre_ids: item.genre_ids || [],
      genres: item.genres || [],
      adult: item.adult || false,
      original_language: item.original_language,
      original_title: item.original_title,
      popularity: item.popularity,
      media_type: 'movie' as const,
    };
  } else if (item.media_type === 'tv' || item.name) {
    return {
      id: item.id,
      name: item.name,
      title: item.name, // For consistency
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      first_air_date: item.first_air_date,
      release_date: item.first_air_date, // For consistency
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre_ids: item.genre_ids || [],
      genres: item.genres || [],
      adult: item.adult || false,
      origin_country: item.origin_country || [],
      original_language: item.original_language,
      original_name: item.original_name,
      popularity: item.popularity,
      media_type: 'tv' as const,
    };
  }
  
  // Fallback - return as is with media_type
  return {
    ...item,
    media_type: item.media_type || 'movie'
  };
}

// Search movies and TV shows
export async function searchMulti(query: string, page = 1) {
  const data = await tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`);
  return {
    results: data.results.map(transformMediaItem),
    totalPages: data.total_pages,
    totalResults: data.total_results,
    page: data.page
  };
}

// Discover movies with filters
export async function discoverMovies(filters: {
  genre?: number;
  year?: number;
  rating?: number;
  sortBy?: string;
  page?: number;
} = {}) {
  const params = new URLSearchParams();
  
  if (filters.genre) params.append('with_genres', filters.genre.toString());
  if (filters.year) params.append('year', filters.year.toString());
  if (filters.rating) params.append('vote_average.gte', filters.rating.toString());
  if (filters.sortBy) params.append('sort_by', filters.sortBy);
  if (filters.page) params.append('page', filters.page.toString());

  return tmdbFetch(`/discover/movie?${params.toString()}`);
}

// Discover TV shows with filters
export async function discoverTVShows(filters: {
  genre?: number;
  year?: number;
  rating?: number;
  sortBy?: string;
  page?: number;
} = {}) {
  const params = new URLSearchParams();
  
  if (filters.genre) params.append('with_genres', filters.genre.toString());
  if (filters.year) params.append('first_air_date_year', filters.year.toString());
  if (filters.rating) params.append('vote_average.gte', filters.rating.toString());
  if (filters.sortBy) params.append('sort_by', filters.sortBy);
  if (filters.page) params.append('page', filters.page.toString());

  return tmdbFetch(`/discover/tv?${params.toString()}`);
}

// Transform TMDB movie data to our MediaItem format
export function transformMovieToMediaItem(movie: any): any {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: movie.genre_ids || [],
    genres: movie.genres || [],
    adult: movie.adult,
    original_language: movie.original_language,
    original_title: movie.original_title,
    popularity: movie.popularity,
    video: movie.video,
    media_type: 'movie' as const,
    runtime: movie.runtime,
    tagline: movie.tagline,
    status: movie.status
  };
}

// Transform TMDB TV show data to our MediaItem format
export function transformTVShowToMediaItem(show: any): any {
  return {
    id: show.id,
    name: show.name,
    title: show.name, // For consistency with MediaItem interface
    overview: show.overview,
    poster_path: show.poster_path,
    backdrop_path: show.backdrop_path,
    first_air_date: show.first_air_date,
    release_date: show.first_air_date, // For consistency with MediaItem interface
    vote_average: show.vote_average,
    vote_count: show.vote_count,
    genre_ids: show.genre_ids || [],
    genres: show.genres || [],
    adult: show.adult || false,
    origin_country: show.origin_country || [],
    original_language: show.original_language,
    original_name: show.original_name,
    popularity: show.popularity,
    media_type: 'tv' as const,
    number_of_episodes: show.number_of_episodes,
    number_of_seasons: show.number_of_seasons,
    episode_run_time: show.episode_run_time,
    status: show.status,
    tagline: show.tagline
  };
}