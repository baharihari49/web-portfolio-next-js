# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15** portfolio website built with the App Router architecture. It's a personal portfolio for "Bahari" featuring a modern, responsive design with multiple sections including hero, about, experience, portfolio, tech stack, testimonials, blog, and contact forms.

## Key Technologies & Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom animations
- **UI Components**: ShadCN UI (based on Radix UI)
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Email Service**: EmailJS for contact forms
- **Deployment**: PM2 ecosystem configuration included

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
```

## Project Architecture

### App Router Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with metadata, fonts, and global styles
  - `page.tsx` - Home page that renders the main portfolio component
  - `Porto.tsx` - Main portfolio component orchestrating all sections
  - `blog/` - Blog section with dynamic routing
  - `projects/` - Project detail pages
  - `privacy-policy/` & `terms-of-service/` - Legal pages

### Component Architecture
- **Modular Design**: Each major section is a separate component
- **Section Components**: Hero, About, Experience, Portfolio, TechStack, Stats, Testimonials, Contact, Blog, Footer
- **Reusable UI**: Located in `components/ui/` following ShadCN patterns
- **Custom Hooks**: Located in component-specific `hooks/` directories

### Key Components Structure
- `components/Experience/` - Timeline-based experience display with desktop/mobile variants
- `components/Portfolio/` - Project showcase with filtering and pagination
- `components/TechStack/` - Technology skills with detailed modal views
- `components/Contact/` - Contact form with EmailJS integration and FAQ section
- `components/blog/` - Blog system with full post management

### Data Management
- **Static Data**: JSON files in `app/data/` for stats and tech stack
- **Blog Service**: Comprehensive API service in `services/blogService.ts`
- **Type Definitions**: TypeScript interfaces in `app/types/`

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
- **Client Components**: Use `'use client'` directive for interactive components
- **Server Components**: Default for static content and data fetching
- **Custom Hooks**: Extracted for reusable logic (e.g., `useContactForm`, `useExperienceAnimation`)

### Styling Patterns
- **Tailwind Classes**: Extensive use of utility classes
- **CSS-in-JS**: Custom animations using styled-jsx for blob animations
- **Responsive Design**: Mobile-first approach with desktop/mobile component variants

### State Management
- **Local State**: React useState for component-specific state
- **Effect Hooks**: useEffect for scroll tracking and section highlighting
- **Custom Hooks**: Encapsulated logic for complex behaviors

## Data Sources

### Static Data
- `app/data/stats.json` - Portfolio statistics (projects, experience, etc.)
- `app/data/techstack.json` - Technology stack with proficiency levels
- `app/data/testimoni.json` - Client testimonials

### External Services
- **EmailJS**: Contact form submissions (`app/config/emailJs.ts`)
- **Cloudinary**: Image hosting for portfolio assets
- **Blog API**: External API integration for blog content

## Important Notes

### EmailJS Configuration
- Service configured in `app/config/emailJs.ts`
- Initialization handled by `useEmailJsInit` hook
- Contact form uses this service for message delivery

### Image Handling
- Next.js Image component configured for Cloudinary and ui-avatars.com
- Optimized loading and responsive images throughout

### Blog System
- Comprehensive blog service with API integration
- Support for categories, tags, search, and pagination
- Dynamic routing for individual blog posts

### Scroll Behavior
- Custom scroll tracking for navigation highlighting
- Smooth scrolling implementation for section navigation
- Back-to-top functionality with custom component

## File Organization

- `/app` - Next.js App Router pages and configuration
- `/components` - Reusable UI components organized by feature
- `/lib` - Utility functions and external service integrations
- `/services` - API services and data fetching logic
- `/public` - Static assets and verification files