# Hack4Change Frontend

A Next.js application for the Hack4Change hackathon with trash mapping and AI-powered analysis capabilities.

## Features

- **Interactive Trash Map**: View trash locations on an interactive map using MapLibre GL JS
- **AI-Powered Analysis**: Generate insights about trash distribution patterns using OpenAI
- **Real-time Data**: Fetch trash location data from GraphQL API
- **Responsive Design**: Modern UI built with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Get your OpenAI API key:
- Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- Create a new API key
- Add it to your `.env.local` file

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Trash Analysis Feature

The application includes a complex operation that:

1. **Fetches trash data** from the GraphQL API (`thrashmap` query)
2. **Pipes the data** to OpenAI's GPT-4 model
3. **Generates insights** about trash distribution patterns
4. **Provides recommendations** for environmental improvement

### How it works:

- The `TrashAnalysis` component fetches trash location data
- Data is sent to the `/api/analyze-trash` endpoint
- The endpoint uses OpenAI's API to analyze the trash points
- Results include thoughts, insights, recommendations, and environmental impact assessment

### API Endpoints:

- `POST /api/analyze-trash` - Analyzes trash points using OpenAI

### Components:

- `ThrashMap` - Interactive map displaying trash locations
- `TrashAnalysis` - AI-powered analysis interface
- `OpenAIService` - Service for OpenAI API integration

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Apollo Client** - GraphQL client
- **MapLibre GL JS** - Interactive maps
- **OpenAI API** - AI analysis
- **GraphQL** - Data fetching

## Project Structure

```
src/
├── api/
│   ├── openai/
│   │   └── openai.service.ts    # OpenAI integration
│   └── __generated__/           # GraphQL generated types
├── components/
│   └── widgets/
│       ├── ThrashMap.tsx        # Interactive map component
│       └── TrashAnalysis.tsx    # AI analysis component
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate GraphQL types
