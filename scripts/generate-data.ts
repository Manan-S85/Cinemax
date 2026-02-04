// This script can be used to generate additional mock data or fetch real data from TMDB API
// Run with: npm run generate-data

import fs from 'fs';
import path from 'path';

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

// Mock additional movies data
const additionalMovies: TMDBMovie[] = [
  {
    id: 680,
    title: 'Pulp Fiction',
    overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper.',
    poster_path: '/dM2w364MScsjFf8pfMbaWUcWrR.jpg',
    backdrop_path: '/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg',
    release_date: '1994-09-10',
    vote_average: 8.5,
    vote_count: 27000,
    genre_ids: [53, 80],
    adult: false,
    original_language: 'en',
    original_title: 'Pulp Fiction',
    popularity: 65.0,
    video: false,
  },
  {
    id: 13,
    title: 'Forrest Gump',
    overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.',
    poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdrop_path: '/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg',
    release_date: '1994-06-23',
    vote_average: 8.5,
    vote_count: 26000,
    genre_ids: [35, 18, 10749],
    adult: false,
    original_language: 'en',
    original_title: 'Forrest Gump',
    popularity: 75.0,
    video: false,
  },
];

function generateAdditionalData() {
  const outputPath = path.join(process.cwd(), 'lib', 'additional-data.ts');
  
  const content = `// Additional generated data
export const additionalMovies = ${JSON.stringify(additionalMovies, null, 2)};
`;

  fs.writeFileSync(outputPath, content);
  console.log(`Generated additional data at ${outputPath}`);
}

if (require.main === module) {
  generateAdditionalData();
}

export { generateAdditionalData };