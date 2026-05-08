# Help Study Abroad - Application

A modern study abroad management system built with **Next.js 14**, **MUI v5**, **Zustand**, **NextAuth.js**, and **DummyJSON API**.

## Features

✅ **Authentication** - NextAuth.js with CredentialsProvider  
✅ **Dashboard** - Welcome page with navigation  
✅ **Users Management** - View user list with search and pagination  
✅ **Products Management** - Browse products with category filtering  
✅ **Responsive Design** - Mobile-first UI with Material-UI  
✅ **State Management** - Zustand stores with caching  
✅ **Performance Optimized** - React.memo and useCallback optimization  

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Component Library**: Material-UI v5 (@mui/material)
- **State Management**: Zustand v4
- **Authentication**: NextAuth.js v4
- **Language**: TypeScript
- **Data Source**: DummyJSON API (https://dummyjson.com)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env.local (if not already created)
cp .env.example .env.local
```

### Environment Configuration

`.env.local`:
```env
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### Running the Application

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

Visit **http://localhost:3000** in your browser.

## Demo Credentials

Use these credentials to log in (from DummyJSON):

- **Username**: `emilys`
- **Password**: `emilyspass`

## Project Structure

```
src/
├── app/                      # Next.js app router
│   ├── layout.tsx           # Root layout with Providers wrapper
│   ├── page.tsx             # Root redirect page
│   ├── login/               # Login page
│   └── dashboard/           # Dashboard routes
│       ├── page.tsx         # Dashboard home
│       ├── users/           # Users section
│       │   ├── page.tsx     # Users list
│       │   └── [id]/page.tsx# User detail view
│       └── products/        # Products section
│           ├── page.tsx     # Products list
│           └── [id]/page.tsx# Product detail view
├── components/              # React components
│   ├── shared/             # Shared UI components
│   │   ├── Navbar.tsx      # App navbar with auth
│   │   ├── SearchBar.tsx   # Debounced search
│   │   ├── PaginationBar.tsx# Pagination controls
│   │   ├── BackButton.tsx  # Navigation back button
│   │   └── ErrorAlert.tsx  # Error alerts & loading
│   ├── auth/               # Auth components
│   │   └── LoginForm.tsx   # Login form
│   ├── users/              # User components
│   │   ├── UserTable.tsx   # Users table
│   │   └── UserDetailView.tsx# User detail view
│   └── products/           # Product components
│       ├── ProductGrid.tsx # Products grid layout
│       └── ProductDetailView.tsx# Product detail view
├── lib/                     # Utilities and API
│   ├── dummyJsonApi.ts     # API calls to DummyJSON
│   ├── authOptions.ts      # NextAuth configuration
│   └── theme/              # MUI theme config
├── store/                  # Zustand stores
│   ├── authStore.ts        # Auth state & persistence
│   ├── userStore.ts        # Users state with caching
│   └── productStore.ts     # Products state with caching
├── types/                  # TypeScript types
│   ├── auth.ts            # Auth types
│   ├── user.ts            # User types
│   └── product.ts         # Product types
└── providers.tsx           # Client-side providers wrapper
```

## State Management

### Zustand Stores

1. **authStore** - Authentication state with localStorage persistence
   - `token`, `user`, `isLoading`, `error`
   - Methods: `setAuth()`, `clearAuth()`, `rehydrate()`

2. **userStore** - Users list with caching
   - Caches paginated results by `page-limit` key
   - Supports search and pagination
   - Methods: `fetchUsers()`, `searchUsers()`, `fetchUserById()`

3. **productStore** - Products with category filtering
   - Supports search, category filtering, pagination
   - Caches by product ID
   - Methods: `fetchProducts()`, `searchProducts()`, `filterByCategory()`, `fetchCategories()`

## Performance Optimizations

- ✅ **React.memo** on ProductCard and UserRow components
- ✅ **useCallback** on event handlers to prevent unnecessary re-renders
- ✅ **useMemo** for derived calculations (totalPages, discounted prices)
- ✅ **Zustand persistence** for auth state via localStorage
- ✅ **API response caching** in stores to avoid duplicate requests
- ✅ **Skeleton loaders** for better perceived performance

## Known Issues & Solutions

### CORS Policy Issue

If you encounter "CORS policy: No 'Access-Control-Allow-Origin' header" errors when making API calls from the client side:

**Solution**: Create Next.js API routes as proxies to DummyJSON.

Then update `dummyJsonApi.ts` to call these routes instead of calling DummyJSON directly from the browser.

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect repository to Vercel dashboard
# Set environment variables in Vercel settings
# Automatic deployment on push
```

### Environment Variables for Production

- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production domain (e.g., `https://myapp.com`)

## Future Enhancements

- [ ] Add API proxy routes to fix CORS issues
- [ ] Implement form validation schema with Zod
- [ ] Add email verification for auth
- [ ] Create admin panel for data management
- [ ] Add dark mode support
- [ ] Implement analytics tracking
- [ ] Add e2e tests with Playwright

## Support

For issues and questions, review the implementation details and refer to the component documentation in each file.

---

**Built with ❤️ using Next.js, MUI, and Zustand**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
