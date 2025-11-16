# AI-Powered Resume Builder

A modern, AI-powered resume builder that uses Claude AI to help users create, enhance, and tailor resumes to specific job positions.

## Features

- 🤖 **AI Chat Interface** - Create resumes through natural conversation
- 📄 **File Upload** - Parse existing resumes (PDF/DOCX)
- 🎨 **5 Professional Templates** - Choose from multiple resume designs
- ✨ **AI Enhancement** - Improve resume quality and impact
- 🎯 **Job Tailoring** - Adapt resume to specific job postings
- 📥 **PDF Export** - Download professional PDFs

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Claude API (Sonnet 4)
- **Backend**: Supabase Edge Functions
- **PDF Generation**: @react-pdf/renderer
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Claude API key
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ketipotova/resume-builder-app.git
cd resume-builder-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
VITE_CLAUDE_API_KEY=your_claude_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. (Optional) Start Supabase locally:
```bash
supabase start
```

### Deploying to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Link your project:
```bash
vercel link
```

3. Add environment variables to Vercel:
```bash
vercel env add VITE_CLAUDE_API_KEY
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

4. Deploy:
```bash
vercel --prod
```

### Deploying Supabase Edge Functions

1. Link your Supabase project:
```bash
supabase link --project-ref your-project-ref
```

2. Set secrets:
```bash
supabase secrets set CLAUDE_API_KEY=your_claude_api_key
```

3. Deploy functions:
```bash
supabase functions deploy scrape-job
```

## Project Structure

```
src/
├── components/       # React components
│   ├── chat/        # Chat interface components
│   ├── upload/      # File upload components
│   ├── resume/      # Resume editor components
│   ├── templates/   # Resume template components
│   ├── enhancement/ # AI enhancement components
│   └── common/      # Shared components
├── lib/             # Utility libraries
│   ├── claude-api.ts   # Claude API integration
│   └── supabase.ts     # Supabase client
├── types/           # TypeScript type definitions
├── pages/           # Page components
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
└── utils/           # Utility functions
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

- **On Push to Main**: Automatically deploys to Vercel production
- **On Pull Request**: Creates preview deployment
- **Quality Checks**: Linting, type checking, and build validation

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLAUDE_API_KEY` | Claude API key | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Templates

1. Create template component in `src/components/templates/designs/`
2. Implement the template using `@react-pdf/renderer`
3. Add template to template gallery

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

- Claude AI by Anthropic
- Supabase
- Vercel
- React PDF Renderer community
