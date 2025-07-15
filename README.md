# HomeBase - Real Estate Platform for Ghana

A modern, animated real estate platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Supabase. Designed specifically for the Ghanaian real estate market.

## Features

- 🏠 **Property Listings** - Browse and search properties across Ghana
- 🔍 **Advanced Search** - Filter by location, price, property type, and more
- 💫 **Smooth Animations** - Beautiful Framer Motion animations throughout
- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Built with Shadcn/UI components
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 🏪 **Property Details** - Comprehensive property information pages
- 👤 **User Profiles** - Manage your properties and preferences

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/homebase.git
   cd homebase
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Go to your Supabase project dashboard and run the SQL commands in `supabase-setup.sql` in the SQL Editor.

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Setup

The platform uses the following main tables:

- **properties** - Store property listings
- **agents** - Real estate agent profiles
- **property_images** - Multiple images per property

### Running the Database Migration

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the migration

This will create all necessary tables, indexes, RLS policies, and sample data.

## Project Structure

```
homebase/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── listings/          # Property listings and details
│   ├── dashboard/         # User dashboard
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/UI components
│   ├── property-card.tsx # Property card component
│   ├── navbar.tsx        # Navigation component
│   └── ...
├── hooks/                # Custom React hooks
│   ├── use-properties.ts # Property data fetching
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client setup
│   └── utils.ts          # General utilities
├── contexts/             # React contexts
│   └── auth-context.tsx  # Authentication context
└── supabase-setup.sql    # Database migration file
```

## Features in Detail

### Property Listings
- Browse all properties with filtering and search
- Property cards with images, price, and key details
- Smooth animations and loading states

### Property Details
- Comprehensive property information
- Image galleries
- Contact agent functionality
- Share property feature

### Authentication
- Email/password authentication
- Protected routes for user-specific content
- User session management

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@homebase.gh or join our Discord community.

## Acknowledgments

- Thanks to the Supabase team for the excellent backend-as-a-service
- Shadcn for the beautiful UI components
- Framer Motion for smooth animations
- The Next.js team for the amazing framework

---

Made with ❤️ for the Ghanaian real estate market 