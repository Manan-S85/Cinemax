# Movies & Shows Directory

A modern, polished website showcasing top-rated movies and trending TV shows built with Next.js 14, TypeScript, and Tailwind CSS.

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg> Features

- **Modern Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive with mobile-first approach
- **Static Generation**: Uses Static Site Generation (SSG) for optimal performance
- **Rich Content**: Detailed pages for each movie and TV show with ratings, genres, and metadata
- **Advanced Filtering**: Search, sort, and filter content by genre, year, rating, and type
- **Curated Collections**: Special themed collections like "Top Rated", "Best Action Movies", etc.
- **SEO Optimized**: Complete SEO setup with metadata, sitemap, and robots.txt
- **TypeScript**: Full type safety throughout the application
- **shadcn/ui**: Beautiful UI components with Radix UI primitives

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> Pages

1. **Home Page** - Overview of the dataset with featured content
2. **Browse Page** - Complete listing with search, filters, and sorting
3. **Movies Page** - Dedicated movies section with curated lists
4. **TV Shows Page** - Dedicated TV shows section with organized content
5. **Individual Detail Pages** - Rich detail pages for each movie/show
6. **Collections Page** - Themed collections and special categories
7. **404 Page** - Custom not found page

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> Collections & Permutations

- Top Rated Content (8.0+ rating)
- Best Action Movies
- Crime Dramas
- Modern Classics (2000+)
- Animated Excellence
- Sci-Fi & Fantasy
- And more themed collections...

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg> Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movies-directory
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg> Project Structure

```
├── app/                 # Next.js 14 App Router
│   ├── browse/         # Browse page with filters
│   ├── collections/    # Collections page
│   ├── movie/[id]/    # Individual movie pages
│   ├── movies/        # Movies listing page
│   ├── tv/[id]/       # Individual TV show pages
│   ├── tv-shows/      # TV shows listing page
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   ├── not-found.tsx  # 404 page
│   ├── robots.ts      # Robots.txt
│   └── sitemap.ts     # Sitemap generation
├── components/         # React components
│   ├── layout/        # Layout components
│   ├── ui/            # shadcn/ui components
│   └── media-card.tsx # Media card component
├── lib/               # Utility functions and data
│   ├── data.ts        # Mock data (movies & TV shows)
│   └── utils.ts       # Utility functions
├── types/             # TypeScript type definitions
└── scripts/           # Build and data generation scripts
```

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg> Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Build Tool**: Built-in Next.js bundler
- **Deployment**: Vercel-ready (or any static hosting)

### Design Inspiration

**Visual References**:
- **Netflix** - Clean grid layouts and card-based content presentation
- **IMDb** - Comprehensive movie/show detail pages with ratings and metadata
- **Apple TV+** - Minimal, elegant design with focus on visual content
- **Letterboxd** - Community-driven movie discovery and curation approach

**Design Principles**:
- **Content-First**: Let movie posters and visuals drive the aesthetic
- **Minimal UI**: Clean, uncluttered interface that doesn't compete with content
- **Dark Theme**: Cinematic dark theme for better movie poster contrast
- **Responsive Grid**: Adaptive layouts that work seamlessly across devices
- **Typography**: Clear hierarchy with focus on readability and elegance

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg> Data Source

The application uses carefully curated mock data representing:
- Top 250 movies (sample included)
- Trending TV shows (sample included)
- TMDB-compatible data structure for easy API integration

### Dataset Details

**Primary Source**: The Movie Database (TMDB) API  
**Source URL**: [https://api.themoviedb.org/3](https://api.themoviedb.org/3)  
**Dataset Size**: 250+ movies and 100+ TV shows  
**Data Format**: JSON with TMDB-compatible schema  

### Data Generation & Scraping Methodology

The dataset was generated through a combination of approaches:

1. **TMDB API Integration**: Used the official TMDB API to fetch popular, top-rated, and trending content
2. **Curated Selection**: Manually curated a selection of critically acclaimed and popular titles
3. **Data Enhancement**: Enhanced basic API data with additional metadata and categorization
4. **Mock Data Generation**: Created realistic mock data for development and testing purposes

**Scripts Used**:
- `scripts/generate-data.ts` - Automated data fetching and processing
- Custom filtering for quality content (8.0+ rating threshold)
- Genre-based categorization and collection grouping
- Image URL optimization and caching

**Data Structure**:
```typescript
interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  popularity: number;
}
```

### Real TMDB Integration (Optional)

To use real TMDB data, add your API key to `.env.local`:

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg> SEO Features

- Dynamic metadata generation for all pages
- Open Graph tags for social media sharing
- Twitter Card support
- Automatic sitemap generation
- Robots.txt configuration
- Structured data markup

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive enhancement

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"></polygon></svg> Performance

- Static Site Generation (SSG)
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Optimized bundle size
- Fast page transitions

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5Z"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M12 18h.01"></path></svg> AI-Assisted Development

### Key AI Prompts Used

**1. Component Architecture Design**
```
"Create a reusable MediaCard component for a movie database app using Next.js 14, 
TypeScript, and shadcn/ui. The card should display movie poster, title, rating, 
release year, and genres. Include hover effects and responsive design. 
Make it work for both movies and TV shows with proper TypeScript interfaces."
```

**2. Data Structure & API Design**
```
"Design a TypeScript interface and data fetching strategy for a movie/TV show 
application. Create mock data structure compatible with TMDB API format. 
Include methods for filtering by genre, sorting by rating, and searching. 
Implement proper error handling and loading states using Next.js best practices."
```

**3. Layout & Styling Implementation**
```
"Build a Netflix-inspired movie browsing interface using Tailwind CSS and Next.js. 
Create a sidebar navigation, responsive grid layout, and detailed movie pages. 
Implement dark theme with proper contrast ratios. Include search functionality, 
filtering options, and smooth animations. Ensure mobile-first responsive design."
```

### AI Tools Utilized
- **GitHub Copilot**: Code completion and component generation
- **Claude/ChatGPT**: Architecture decisions and complex logic implementation
- **AI-assisted debugging**: Error resolution and performance optimization

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript check
- `npm run generate-data` - Generate additional mock data

### Code Quality

- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Consistent code style

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline></svg> License

This project is open source and available under the [MIT License](LICENSE).

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><path d="M16 5a4 4 0 0 0-8 0c0 2.21 1.79 4 4 4s4-1.79 4-4Z"></path></svg> Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> Future Enhancements

- User authentication and favorites
- Advanced search with filters
- Recommendation engine
- User reviews and ratings
- Watchlist functionality
- Social sharing features

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><clock cx="12" cy="12" r="10"></clock><polyline points="12,6 12,12 16,14"></polyline></svg> 2-Day Improvement Roadmap

### Day 1: Enhanced User Experience

**Morning (4 hours)**:
- **Real-time Search**: Implement debounced search with instant results
- **Advanced Filtering**: Multi-select genre filters, year range slider, rating filters
- **Lazy Loading**: Implement intersection observer for infinite scroll
- **Skeleton Loading**: Add proper loading states for better perceived performance

**Afternoon (4 hours)**:
- **Personalization**: User preferences (favorite genres, watchlist)
- **Local Storage**: Persist user selections and recently viewed content
- **Keyboard Navigation**: Full keyboard accessibility support
- **Performance Optimization**: Image optimization, code splitting, caching strategies

### Day 2: Content Enhancement & Polish

**Morning (4 hours)**:
- **Rich Content**: Trailers integration (YouTube API), cast information, similar recommendations
- **Interactive Features**: Rating system, reviews, social sharing
- **Content Collections**: Dynamic collections based on trends, awards, themes
- **Data Visualization**: Charts for genre popularity, rating distributions

**Afternoon (4 hours)**:
- **Mobile Experience**: Swipe gestures, pull-to-refresh, bottom sheet navigation
- **Accessibility**: ARIA labels, screen reader optimization, high contrast mode
- **Testing Suite**: Unit tests, integration tests, E2E testing with Playwright
- **Deployment**: CI/CD pipeline, performance monitoring, error tracking

**Bonus Features (if time permits)**:
- PWA capabilities for offline browsing
- Machine learning recommendations based on viewing history
- Multi-language support and internationalization
- Advanced analytics and user behavior tracking

---

Built with <svg width="16" height="16" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> using Next.js, TypeScript, and Tailwind CSS