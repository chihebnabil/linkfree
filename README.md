# Developer Linktree

A modern, customizable linktree alternative built with Next.js, perfect for developers and creators to showcase their projects, social links, and professional information.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchihebnabil%2Flinkfree&env=DATABASE_URL,ANALYTICS_PASSWORD&envDescription=Required%20environment%20variables%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fchihebnabil%2Flinkfree%23-environment-variables&project-name=my-developer-linktree&repository-name=my-developer-linktree)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chihebnabil/linkfree)

## Features

- Modern UI with dark/light theme support
- Built-in analytics with click tracking
- Simple authentication for analytics dashboard
- Fully responsive design
- Fast performance with Next.js 15
- Click tracking for all links
- Analytics dashboard with insights

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database (we recommend [Neon](https://neon.tech) for serverless PostgreSQL)

### 1. Clone and Install

```bash
git clone https://github.com/chihebnabil/linkfree
cd linkfree
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Analytics Authentication (set any secure password)
ANALYTICS_PASSWORD="your_secure_password_here"

# Optional: Analytics settings
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### 3. Database Setup

Run the SQL script to create the necessary tables:

```bash
# Connect to your PostgreSQL database and execute:
psql $DATABASE_URL -f scripts/001-create-clicks-table.sql
```

Or manually execute the SQL commands from `scripts/001-create-clicks-table.sql` in your database console.

### 4. Customize Your Profile

Edit `data/profile.json` to update your information:

```json
{
  "profile": {
    "name": "Your Name",
    "avatar": "/your-avatar.jpg",
    "bio": "Your bio description",
    "badges": ["Your", "Skills", "Here"]
  },
  "linkGroups": [
    {
      "title": "Professional",
      "links": [
        {
          "title": "Your Project",
          "description": "Project description",
          "url": "https://your-project.com",
          "icon": "Globe",
          "featured": true
        }
      ]
    }
  ],
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "Github"
    }
  ]
}
```

### 5. Run the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your linktree!

## 📊 Analytics Dashboard

Access analytics at `/analytics` and login with your `ANALYTICS_PASSWORD`.

The analytics dashboard provides:
- Total clicks and unique visitors
- Top performing links
- Daily click trends
- Link performance by group

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── analytics/          # Analytics dashboard pages
│   ├── api/               # API routes (analytics, auth, tracking)
│   └── page.tsx           # Main linktree page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── analytics-login.tsx
├── data/
│   └── profile.json      # Your profile configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
├── scripts/              # Database scripts
│   └── 001-create-clicks-table.sql
└── styles/               # Global styles
```

## 🎨 Customization

### Adding New Links

Edit `data/profile.json` and add links to the appropriate `linkGroups`:

```json
{
  "title": "New Link",
  "description": "Link description",
  "url": "https://example.com",
  "icon": "IconName",
  "featured": false
}
```

### Available Icons

The project uses [Lucide React](https://lucide.dev) icons. Common icons include:
- `Globe`, `Github`, `Twitter`, `Linkedin`, `Mail`
- `Code2`, `BookOpen`, `Coffee`, `Users`
- `GraduationCap`, `Zap`, `Bot`, `Package`, `Calendar`

### Styling

The project uses Tailwind CSS with shadcn/ui components. Customize:
- Colors and themes in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component styles by editing individual components

## Database Schema

The application creates the following table:

```sql
link_clicks (
  id SERIAL PRIMARY KEY,
  link_title VARCHAR(255) NOT NULL,
  link_url TEXT NOT NULL,
  link_group VARCHAR(100),
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id VARCHAR(255)
)
```

## Deployment

### One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fchihebnabil%2Flinkfree&env=DATABASE_URL,ANALYTICS_PASSWORD&envDescription=Required%20environment%20variables%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fchihebnabil%2Flinkfree%23-environment-variables&project-name=my-developer-linktree&repository-name=my-developer-linktree)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chihebnabil/linkfree)

**One-click deployment:** Click either button above to deploy directly with pre-configured settings (make sure to set the env var).

### Vercel (Recommended)

**Manual deployment:**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ANALYTICS_PASSWORD` | Password for analytics dashboard | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your domain URL | No |

## Analytics Features

- **Click Tracking**: Automatic tracking of all link clicks
- **Session Management**: Unique visitor identification
- **Performance Metrics**: Total clicks, unique visitors, top links
- **Trend Analysis**: Daily click patterns
- **Group Analytics**: Performance by link categories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).


## Acknowledgments

Built with:
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Lucide](https://lucide.dev) - Icons

---

Made with ❤️ for the developer community
