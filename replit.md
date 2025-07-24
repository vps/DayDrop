# Countdown Widget - iOS Style PWA

## Overview

This is an iOS-inspired countdown widget application built as a Progressive Web App (PWA). The application allows users to set a target date and displays the number of days remaining in a beautiful, mobile-first interface that mimics iOS design patterns. The app can be installed on mobile devices and added to the home screen for quick access.

## User Preferences

Preferred communication style: Simple, everyday language.
Countdown copy text: "Hey jaani, the amount of days until forever with you is X days, Y hours, Z minutes, W seconds :)"
Target date: December 25, 2025 (fixed)

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom iOS-inspired design tokens
- **UI Components**: Custom component library based on shadcn/ui with Radix UI primitives
- **State Management**: React hooks with localStorage persistence
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but minimal usage)
- **Session Management**: Memory-based storage with interface for future database integration

### PWA Features
- **Service Worker**: Custom implementation for offline caching
- **Manifest**: Full PWA manifest with installability
- **Icons**: Multiple icon sizes for various devices
- **Offline Support**: Basic caching strategy for core assets

## Key Components

### Core Application Components
1. **CountdownWidget**: Main display component showing days remaining
2. **DatePickerModal**: iOS-style modal for selecting target dates
3. **SettingsModal**: Configuration panel with notification toggles and PWA install
4. **CompletionDisplay**: Full-screen celebration when countdown reaches zero
5. **PWAPrompt**: Instruction component for adding app to home screen

### Custom Hooks
1. **useCountdown**: Manages countdown logic, persistence, and daily updates
2. **usePWA**: Handles service worker registration and install prompts
3. **useIsMobile**: Responsive design helper

### Utility Functions
1. **countdown-utils**: Date calculations and formatting
2. **queryClient**: Configured TanStack Query client
3. **cn**: Tailwind class merging utility

## Data Flow

### Client-Side State Management
1. **Target Date Storage**: Persisted in localStorage with JSON serialization
2. **Countdown Calculation**: Real-time calculation based on current date vs target
3. **Daily Updates**: Automatic recalculation using setInterval
4. **Completion Detection**: Triggers celebration display when countdown reaches zero

### PWA Installation Flow
1. Browser detects installability via beforeinstallprompt event
2. Custom install button triggers browser's native install prompt
3. Enhanced service worker with background sync capabilities
4. App registers as installable PWA with iOS-optimized manifest
5. Page visibility and focus handling for proper iOS PWA updates

### Settings Persistence
- Notification preferences stored in component state (not persisted)
- PWA install state managed through browser APIs
- Countdown data persisted across sessions via localStorage
- Last update timestamp tracked for user verification

### iOS PWA Optimization (Added January 2025)
- Enhanced service worker with background sync messaging
- Page visibility change handlers for iOS app focus
- Visual last-updated timestamp indicator
- Periodic sync registration for supported browsers
- Proper PWA manifest with shortcuts and iOS meta tags

### Dynamic Content Generation (Added January 2025)
- Dynamic Open Graph meta tags for iMessage link previews showing current countdown
- Server-side icon generation with current day count using Sharp
- Personalized sharing message: "Hey jaani, X days until forever with you :)"
- Real-time countdown API endpoint for fresh data on every share
- Dynamic PWA icons that update with current countdown value

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom iOS color palette
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting utilities

### Build and Development
- **Vite**: Fast build tool with TypeScript support
- **TypeScript**: Type safety across frontend and backend
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Backend
- **Express.js**: Web server framework
- **Drizzle ORM**: Type-safe database toolkit (configured for future use)
- **Neon Database**: Serverless PostgreSQL (configured but not actively used)
- **Sharp**: High-performance image processing for dynamic icon generation

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Type Checking**: TypeScript validation across shared types

### Production Configuration
- **Static Assets**: Served from `dist/public` directory
- **API Routes**: Express server handles `/api/*` endpoints (currently minimal)
- **Environment Variables**: DATABASE_URL required for Drizzle configuration

### Development Workflow
- **Hot Reload**: Vite dev server with React Fast Refresh
- **Shared Types**: Common schema definitions in `shared/` directory
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)

### PWA Deployment Considerations
- **HTTPS Required**: PWAs require secure context for installation
- **Service Worker**: Must be served from same origin as app
- **Manifest**: Proper MIME type and accessibility from root path
- **Icons**: Multiple sizes for different device contexts

The application is designed as a client-side focused PWA with minimal backend requirements, making it suitable for static hosting with optional API enhancement.