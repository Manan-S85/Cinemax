# Movies & Shows Directory

A modern, polished website showcasing top-rated movies and trending TV shows built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive with mobile-first approach
- **Static Generation**: Uses Static Site Generation (SSG) for optimal performance
- **Rich Content**: Detailed pages for each movie and TV show with ratings, genres, and metadata
- **Advanced Filtering**: Search, sort, and filter content by genre, year, rating, and type
- **Curated Collections**: Special themed collections like "Top Rated", "Best Action Movies", etc.
- **SEO Optimized**: Complete SEO setup with metadata, sitemap, and robots.txt
- **TypeScript**: Full type safety throughout the application
- **shadcn/ui**: Beautiful UI components with Radix UI primitives

## 📋 Pages

1. **Home Page** - Overview of the dataset with featured content
2. **Browse Page** - Complete listing with search, filters, and sorting
3. **Movies Page** - Dedicated movies section with curated lists
4. **TV Shows Page** - Dedicated TV shows section with organized content
5. **Individual Detail Pages** - Rich detail pages for each movie/show
6. **Collections Page** - Themed collections and special categories
7. **404 Page** - Custom not found page

## 🔧 Collections & Permutations

- Top Rated Content (8.0+ rating)
- Best Action Movies
- Crime Dramas
- Modern Classics (2000+)
- Animated Excellence
- Sci-Fi & Fantasy
- And more themed collections...

## 🚀 Getting Started

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

## 📁 Project Structure

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

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Build Tool**: Built-in Next.js bundler
- **Deployment**: Vercel-ready (or any static hosting)

## 📊 Data Source

The application uses carefully curated mock data representing:
- Top 250 movies (sample included)
- Trending TV shows (sample included)
- TMDB-compatible data structure for easy API integration

### Real TMDB Integration (Optional)

To use real TMDB data, add your API key to `.env.local`:

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## 🔍 SEO Features

- Dynamic metadata generation for all pages
- Open Graph tags for social media sharing
- Twitter Card support
- Automatic sitemap generation
- Robots.txt configuration
- Structured data markup

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive enhancement

## ⚡ Performance

- Static Site Generation (SSG)
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Optimized bundle size
- Fast page transitions

## 🛠 Development

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🎯 Future Enhancements

- User authentication and favorites
- Advanced search with filters
- Recommendation engine
- User reviews and ratings
- Watchlist functionality
- Social sharing features

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS