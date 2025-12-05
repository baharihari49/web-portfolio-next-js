# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16** portfolio website built with the App Router architecture and **React 19**. It's a personal portfolio for "Bahari" featuring a modern, responsive design with multiple sections including hero, about, experience, portfolio, tech stack, testimonials, blog, and contact forms.

## Key Technologies & Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Language**: TypeScript (strict mode)
- **React**: React 19
- **Styling**: Tailwind CSS v4 with custom animations
- **UI Components**: ShadCN UI (based on Radix UI)
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Email Service**: EmailJS for contact forms
- **Deployment**: PM2 ecosystem configuration (port 3006)
- **Performance Monitoring**: Web Vitals tracking in production
- **Analytics**: Google Analytics integration

## Common Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Analyze bundle size
npm run analyze

# Clean build artifacts
npm run clean
```

## Project Architecture

### App Router Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with metadata, fonts, SEO, and structured data (Schema.org)
  - `page.tsx` - Home page that renders the main portfolio component
  - `Porto.tsx` - Server component orchestrating all section components
  - `PortfolioClient.tsx` - Client wrapper handling navigation, scroll tracking, and EmailJS initialization
  - `blog/` - Blog section with dynamic routing (`[slug]`, category/`[category]`, tag/`[tag]`)
  - `portfolio/` - Portfolio showcase page with dedicated layout
  - `projects/` - Project detail pages with dynamic `[slug]` routing
  - `privacy-policy/` & `terms-of-service/` - Legal pages

### Component Architecture
- **Hybrid Server/Client Pattern**: Server components by default, client components marked with `'use client'`
- **Section Components**: Hero, About, Experience, Portfolio, Gallery, TechStack, Stats, Testimonials, Contact, Blog, Footer
- **Reusable UI**: Located in `components/ui/` following ShadCN patterns (button, skeleton, breadcrumbs, etc.)
- **Custom Hooks**: Located in component-specific `hooks/` directories (e.g., `useContactForm`, `useExperienceAnimation`)
- **Utility Functions**: Located in `app/utils/` for component-specific helpers (experienceUtils, techStackUtils, portfolioUtils)

### Key Components Structure
- `components/Experience/` - Timeline-based experience display with desktop/mobile variants, fetches from external API
- `components/Portfolio/` - Project showcase with filtering, pagination, and grid/list views
- `components/Gallery/` - Template/design collection gallery with category filtering and interactive preview modal (iframe-based)
- `components/TechStack/` - Technology skills with search, pagination, and detailed modal views
- `components/Contact/` - Contact form with EmailJS integration, FAQ section, and availability tracking
- `components/blog/` - Blog system with search, categories, tags, table of contents, and social sharing
- `components/analytics/` - Google Analytics integration with event tracking
- `components/performance/` - Performance monitoring with Web Vitals
- `components/seo/` - SEO components including structured data and FAQ schema

### Data Management
- **Static Data**: JSON files in `app/data/` for stats, tech stack, and testimonials
- **External API**: Experience data fetched from `NEXT_PUBLIC_API_BASE_URL/api/experiences`
- **Blog Service**: Comprehensive API service in `services/blogService.ts` for blog posts, categories, tags, search, and pagination
- **Collection Service**: API service in `services/collectionService.ts` for gallery/template collections
- **Type Definitions**: TypeScript interfaces in `app/types/` (experience, portfolio, techStack, collection)
- **Configuration**: Centralized configs in `app/config/` (emailJs.ts)

## Configuration Files

### Core Configuration
- `next.config.ts` - Next.js configuration with image domains for Cloudinary
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*`)
- `components.json` - ShadCN UI configuration
- `postcss.config.mjs` - PostCSS with Tailwind CSS plugin
- `eslint.config.mjs` - ESLint configuration extending Next.js rules

### Deployment
- `ecosystem.config.js` - PM2 configuration for production deployment on port 3006

## Development Patterns

### Component Patterns
- **Client Components**: Use `'use client'` directive for interactive components (forms, animations, scroll tracking)
- **Server Components**: Default for static content and data fetching (layout, static sections)
- **Custom Hooks**: Extracted for reusable logic (e.g., `useContactForm`, `useExperienceAnimation`, `useEmailJsInit`)
- **Component Composition**: Large sections broken into smaller sub-components (e.g., Experience has DesktopTimeline, MobileTimeline, FilterTabs, etc.)

### Styling Patterns
- **Tailwind Classes**: Extensive use of utility classes with Tailwind CSS v4
- **CSS-in-JS**: Custom animations using styled-jsx for blob animations in CustomStyles component
- **Responsive Design**: Mobile-first approach with desktop/mobile component variants
- **ShadCN UI**: Consistent use of ShadCN components with CVA (Class Variance Authority) for variants

### State Management
- **Local State**: React useState for component-specific state
- **Effect Hooks**: useEffect for scroll tracking, section highlighting, and data fetching
- **Custom Hooks**: Encapsulated logic for complex behaviors (form validation, animations, time tracking)
- **No Global State Library**: Uses React's built-in state management exclusively

### Scroll Tracking Architecture
The app uses a centralized scroll tracking system in `PortfolioClient.tsx`:
- Tracks active section based on scroll position for navigation highlighting
- Provides `scrollToSection` function to child components for smooth scrolling
- BackToTop button appears after scrolling 300px down
- Navigation updates automatically based on scroll position (offset: 300px)
- Includes FloatingWhatsApp component for direct contact

## Important Implementation Details

### EmailJS Configuration
- Service configured in `app/config/emailJs.ts` with SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY
- Initialization handled by `useEmailJsInit` hook in `lib/emailJs.ts` (called in PortfolioClient)
- Contact form uses `useContactForm` hook from `components/Contact/hooks/useContactForm.tsx`
- Form includes validation, error handling, and success/error status tracking

### Image Handling
- Next.js Image component configured in `next.config.ts` for:
  - Cloudinary: `res.cloudinary.com/du0tz73ma/image/upload/**`
  - UI Avatars: `ui-avatars.com/api/**`
  - Unsplash: `images.unsplash.com/**`
- Both `domains` and `remotePatterns` configured for compatibility

### Blog System Architecture
- Blog service (`services/blogService.ts`) provides:
  - Post fetching by slug/ID with fallback to list search
  - Pagination, filtering by category/tag, and search functionality
  - Related posts, popular posts, and recent posts
  - View counting and comment submission
- API base URL from `NEXT_PUBLIC_API_BASE_URL` environment variable
- Supports both API-first and fallback approaches for resilience

### External API Integration
- Experience data fetched from `${NEXT_PUBLIC_API_BASE_URL}/api/experiences`
- Blog data fetched from various endpoints under `/api/blog/`
- Collection/Gallery data fetched from `${NEXT_PUBLIC_API_BASE_URL}/api/collections`
- Components handle loading, error states, and empty data gracefully
- TypeScript interfaces ensure type safety across API responses

### Gallery System Architecture
- Gallery service (`services/collectionService.ts`) provides:
  - Fetching all published collections with 60-second cache
  - Filtering by category
  - Single collection lookup by slug
- Gallery modal renders HTML content in sandboxed iframe for interactive preview
- Supports fullscreen mode and opening templates in new tabs

### SEO & Analytics
- Comprehensive metadata in `app/layout.tsx` (Open Graph, Twitter Cards, verification tags)
- Schema.org structured data for Person, WebSite, and ProfessionalService
- Google Analytics integrated with route tracking (production only)
- Analytics events tracked for form submissions and errors

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_API_BASE_URL` - Base URL for blog and experience APIs
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID (optional, production)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google site verification (optional)
- `NEXT_PUBLIC_YANDEX_VERIFICATION` - Yandex verification (optional)
- `NEXT_PUBLIC_YAHOO_VERIFICATION` - Yahoo verification (optional)
- `NEXT_PUBLIC_BING_VERIFICATION` - Bing verification (optional)

### Performance Optimization
- `PerformanceProvider` wraps the app in production to enable:
  - Web Vitals tracking
  - Service Worker registration
  - Critical resource preloading
- Turbopack enabled in development for faster builds
- Component-level code splitting via dynamic imports where applicable

## Data Sources

### Static Data
- `app/data/stats.json` - Portfolio statistics (projects, experience, etc.)
- `app/data/techstack.json` - Technology stack with proficiency levels
- `app/data/testimoni.json` - Client testimonials

### External Services
- **EmailJS**: Contact form submissions (`app/config/emailJs.ts`)
- **Cloudinary**: Image hosting for portfolio assets
- **Blog API**: External API integration for blog content

## File Organization

- `/app` - Next.js App Router pages, layouts, types, utils, data, and config
- `/components` - Reusable UI components organized by feature (with sub-folders for complex features)
- `/lib` - Utility functions (emailJs initialization, content utils, general utils)
- `/services` - API services and data fetching logic (blogService, collectionService)
- `/public` - Static assets, verification files, and public resources