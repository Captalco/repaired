# Architecture Overview

## Overview

This repository implements a web application for "repaired.co", a SaaS platform focused on project management for re-manufacturing facilities. The application follows a modern full-stack architecture with a React frontend and Node.js Express backend. It uses a PostgreSQL database (via Neon serverless) with Drizzle ORM for data persistence.

The codebase is structured as a monorepo, containing both client-side and server-side code, with shared types and schemas between them.

## System Architecture

The system follows a client-server architecture with the following main components:

1. **Frontend (Client)**
   - Built with React + Vite
   - Uses React Router for navigation
   - Implements a component-based UI structure with Radix UI components and Tailwind CSS styling
   - State management with React Query

2. **Backend (Server)**
   - Node.js Express server
   - RESTful API endpoints
   - Database integration via Drizzle ORM
   - Serverless database connection with Neon

3. **Database**
   - PostgreSQL (via Neon serverless)
   - Schema management with Drizzle ORM
   - Currently implements a simple user model

4. **Build & Development**
   - Vite for frontend bundling and development
   - TypeScript for type safety across the stack
   - ESBuild for server-side code bundling

## Key Components

### Frontend Components

1. **UI Component Library**
   - Extensive use of Radix UI primitive components
   - Custom UI components built on top of Radix primitives
   - Styled with Tailwind CSS using a consistent design system
   - Motion components for animations

2. **Pages**
   - Landing page with multiple sections (Hero, Features, Pricing, etc.)
   - Not Found (404) page
   - Structure suggests plans for additional pages in the future

3. **Layouts**
   - Header component with navigation
   - Footer component with site links
   - Responsive design with mobile considerations

### Backend Components

1. **API Routes**
   - RESTful endpoints under `/api` prefix
   - Currently implements a contact form submission endpoint
   - Structure for user management routes

2. **Database Models**
   - User model with username and password fields
   - Schema defined using Drizzle ORM
   - Validation with Zod

3. **Storage Layer**
   - Abstraction for data storage with `IStorage` interface
   - In-memory implementation (`MemStorage`)
   - Database implementation using Drizzle ORM

## Data Flow

1. **Frontend to Backend**
   - React components make API requests to backend endpoints
   - API requests are handled using the React Query library
   - Form submissions are validated on the client before sending to the server

2. **Backend Processing**
   - Express routes receive requests
   - Requests are validated and processed
   - Data is stored or retrieved from the database
   - Responses are returned to the client

3. **Database Interactions**
   - Drizzle ORM manages database connections and queries
   - Schema validation ensures data integrity
   - Neon serverless handles database connections

## External Dependencies

### Frontend Dependencies

- **UI Framework**: React with Radix UI components
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: wouter
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Animation**: Framer Motion

### Backend Dependencies

- **Server Framework**: Express.js
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL via Neon serverless
- **Authentication**: bcrypt for password hashing
- **Type Safety**: TypeScript

## Deployment Strategy

The application is configured to be deployed in multiple environments:

1. **Development**
   - Local development server with hot reloading
   - Vite for frontend development
   - Node.js for backend development

2. **Production**
   - Build process bundles client code with Vite
   - Server-side code is bundled with ESBuild
   - Static assets are served by the Express server

3. **Replit Deployment**
   - Configuration for Replit with `run` command
   - Port mapping for Replit's environment
   - Cloud Run deployment target

The build process:
1. Frontend code is built using Vite
2. Backend code is bundled with ESBuild
3. Static assets are served from the `dist/public` directory
4. Server runs from the `dist/index.js` file

## Future Considerations

1. **Authentication System**
   - User model is defined but authentication flows are not fully implemented
   - Password hashing with bcrypt is available but needs integration

2. **Database Migration Strategy**
   - Drizzle ORM is configured for schema migrations
   - Migration scripts can be run with `npm run db:push`

3. **Expanded API Surface**
   - Current API is minimal with contact form submission
   - Structure allows for easy expansion of API endpoints

4. **Testing Strategy**
   - No testing framework is currently implemented
   - Adding Jest or Vitest would be recommended

5. **CI/CD Pipeline**
   - Currently relies on manual deployment
   - Could benefit from automated testing and deployment workflows