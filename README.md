# URL Shortener Frontend

A modern URL shortener with QR code generation featuring a clean landing page, authentication system, and a dashboard.

## Features

- URL shortening with custom slugs and domains
- QR code generation for shortened links
- User authentication (login/signup)
- Dashboard for managing links
- Analytics for tracking link performance

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Mode

This project currently runs in demo mode with mock data. To connect it to your real backend API:

1. Set the `NEXT_PUBLIC_API_URL` environment variable to your API endpoint:

\`\`\`
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
\`\`\`

2. Restore the real API client implementation:
   - Open `src/lib/api-client.ts`
   - Follow the instructions in the file to uncomment the real implementation
   - Remove or comment out the mock implementation

3. Update the API hooks in `src/hooks/use-links.ts` to use the real API client

4. Update the auth context in `src/lib/auth-context.tsx` to work with your authentication endpoints

## Demo Credentials

For testing in demo mode:
- Email: demo@example.com
- Password: password

## Project Structure

- `/src/app` - Page routes and layouts
- `/src/components` - Reusable UI components
- `/src/hooks` - Custom hooks including API-related hooks
- `/src/lib` - Utilities, API client, auth helpers, types

## Technologies Used

- Next.js (App Router)
- React
- TanStack Query (React Query)
- Tailwind CSS
- shadcn/ui components
