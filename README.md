# Cosmic Crews - Frontend

This is a modern, responsive Single Page Application (SPA) designed to connect astro-photographers, stargazers, and astronomy enthusiasts worldwide. The application's name is **Cosmic Crews**.

This repository holds the React-based user interface that interacts with the Express/PostgreSQL backend.

## The Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Project Structure

The codebase is organized into a clean, feature-based architecture within the src directory:


```text
src
 - api          # Axios client config and the API service wrapper
 - components  # UI components
   - admin    # Admin panel components 
   - crews    # Crew cards, Event modals, Crew navigators compoennts 
   - dashboard# Main feed widgets 
   - landing  # Public-facing landing page components
   - layout   # Global layouts 
   - posts    # Observation logs, Comment sections, Bortle sliders, etc 
   - profile  # User profile compeonetnets
 - context      # Global React Context
 - pages        # route components mapping to individual URLs
 - routes       # Centralized application routing logic
 - utils        # Helper constants and utility functions
```

## Key Features

1.  Stargazing Feed (Dashboard): Scroll through global observation logs, view the latest astrophotography, and engage by leaving comments and likes.
2.  Cosmic Crews: Join local or global astronomy clubs. Event organizers can schedule star-party events and manage crew members.
3.  Advanced Observation Logs: Create detailed stargazing logs, including equipment used, Bortle class (light pollution), transparency, and high-res image uploads.
4.  Admin Telemetry Panel: Platform administrators have full control over moderation, user suspensions/deletions, and crew management through a dedicated tabbed interface.
5.  Dynamic Profiles: Track "SkyMiles" (activity metrics) and showcase personal observation galleries.

## Local Development Setup

1. Install Dependencies
Make sure you have Node.js installed, then run: npm install

2. Environment Variables
Create a .env file in the root directory and configure your backend URL and any necessary external API keys:

3. Start the Development Server: npm run dev
The application will start instantly and be accessible at http://localhost:5173.

## Production Build

To build the application for production deployment: npm run build
This command generates optimized, minified static files in the dist/ directory, ready to be served by any static hosting provider.

## Authentication Flow
The application uses JWT for authentication.
- When a user logs in, the token is stored in localStorage.
- The axiosClient (src/api/axiosClient.js) automatically intercepts all outgoing requests and adds the Bearer <token> to the Authorization header.
- Protected routes are secured using the <ProtectedRoute /> wrapper, which checks the global AuthContext`.
