# Architecture

## System Overview

ProjectForge uses a client-server architecture with React frontend and Express backend.

## Folder Structure

```
ProjectForge/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── data/           # Fallback/static data
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controllers/        # Route handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── data/               # Curated knowledge base
│   ├── schemas/            # Zod validation schemas
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

## Data Flow

```
Student Input → React Frontend → Express Backend → OpenAI API
                                    ↓
                              Curated Knowledge
                                    ↓
                              Structured Response → Frontend
```

## API Endpoints

- POST /api/projects/generate - Generate project ideas
- POST /api/projects/evaluate - Evaluate a project
- POST /api/projects/blueprint - Generate blueprint
- POST /api/projects/development-plan - Generate dev plan
- POST /api/projects/ai-improvements - AI improvement suggestions
- POST /api/projects/existing-check - Check existing projects
- POST /api/projects/ai-capability - AI capability analysis

## Security

- API keys stored in environment variables
- Helmet for security headers
- CORS configured for client URL
- Request body size limits
- Input validation with Zod
- No secrets in frontend code
