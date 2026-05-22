# Full Stack Blog Management System

## Project Overview
A full stack Blog Management System with:
- **Admin panel** to manage blog posts and user accounts
- **Public frontend** for browsing published blogs, including SEO metadata and structured data
- **Node/Express backend** with **MongoDB + Mongoose**, **JWT authentication**, and **role-based access control**

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, CommonJS
- **Admin Panel**: React + Vite + Tailwind + Redux Toolkit + React Router DOM
- **Frontend**: Next.js (App Router) + Tailwind

## Key Features
- Public pages:
  - Home (latest published blogs)
  - Blog detail by slug (published-only)
  - Category archive (published-only)
  - Tag archive (published-only)
- SEO:
  - `generateMetadata()` for relevant pages
  - JSON-LD structured data on blog detail page (`BlogPosting` + optional `FAQPage`)
- Backend:
  - JWT auth, bcrypt password hashing
  - Role-based permissions for blog CRUD

## Setup

### Backend
1. Go to `backend/`
2. Install dependencies:
   - `npm install`
3. Create environment variables (do **not** commit them):
   - `MONGO_URI`
   - `PORT`
   - JWT secret / token configuration (if applicable in your code)
4. Start server:
   - `npm start`

### Admin Panel
1. Go to `admin-panel/`
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

### Frontend (Public Next.js)
1. Go to `frontend/`
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

## API Routes (Backend)

Base URL: `http://localhost:5000/api`

### Auth
- `POST /api/auth/...` (see `backend/routes/authRoutes.js`)

### Users
- `GET /api/users/...` (see `backend/routes/userRoutes.js`)

### Blogs
- `GET /api/blogs/`
  Returns all blogs (frontend filters by `status === "published"` where applicable)

- `GET /api/blogs/:id`
  Returns blog by Mongo document id

- `GET /api/blogs/slug/:slug`
  Returns **single published** blog by slug

- `POST /api/blogs/create` (protected; role restricted)
- `PUT /api/blogs/:id` (protected; role restricted)
- `DELETE /api/blogs/:id` (protected; role restricted)

## Role Permissions
Roles are enforced by backend middleware (see `backend/middleware/roleMiddleware.js`):
- **super-admin**: can manage all
- **editor**: allowed for blog create/update/delete (per middleware)
- **author**: allowed for create/update/delete of their own blogs (ownership checks)

## SEO Features
Blog detail page includes:
- `generateMetadata()` from blog fields
- JSON-LD:
  - `BlogPosting`
  - `FAQPage` when `blog.faq` is present

## Screenshots
Add screenshots here:
- Admin panel dashboard
- Blog create/edit screen
- Published blog detail page
- Category archive page
- Tag archive page

