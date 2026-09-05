# Changelog

## [0.1.0] - 2026-09-05

### Added
- React + Vite + Tailwind CSS frontend initialization
- Node.js + Express backend initialization
- Express security middleware (helmet, cors, morgan)
- .gitignore configuration
- .env.example template
- PROJECT_CONTEXT.md
- ARCHITECTURE.md
- TASK.md
- CHANGELOG.md

### Security
- Environment variables for secrets
- CORS configuration
- Request body size limits
- Helmet security headers

### Completed
- Phase 0 (Project Initialization) complete
- Phase 1 (Base UI) complete
- Frontend and backend build verified

## [0.2.0] - 2026-09-05

### Added
- Landing page with artistic minimalist design
- Student Profile form with tag inputs
- Project Results page with project cards
- Project Details page with features and actions
- React Router navigation
- Navbar component
- Fallback demo project data

## [0.3.0] - 2026-09-05

### Added
- Curated knowledge base (domains.json, technologies.json, project-patterns.json, constraints.json)
- 14 domains, 35 technologies, 23 project patterns, 13 constraint rules
- contextService.js with getRelevantKnowledge function
- Knowledge service test endpoint

## [0.4.0] - 2026-09-05

### Added
- OpenAI SDK integration
- openaiService.js for AI project generation
- Zod schemas for response validation
- Project generation endpoint (POST /api/projects/generate)
- Frontend API service
- Fallback data when API unavailable

## [0.5.0] - 2026-09-05

### Added
- Project evaluation endpoint (POST /api/projects/evaluate)
- EvaluationPanel component with score bars
- Evaluation criteria: feasibility, skill match, innovation, complexity, time, resources, scalability
- Risks and recommendations display
- Fallback evaluation data

### Changed
- Improved UI contrast (zinc-900 background, better text visibility)
- All form inputs now use selectable buttons instead of text fields
- Profile page redesigned with option buttons for skills, interests, technologies, duration

## [0.6.0] - 2026-09-05

### Added
- Technical blueprint endpoint (POST /api/projects/blueprint)
- BlueprintPanel component with architecture visualization
- System overview, components, frontend/backend architecture
- Database structure, API endpoints, external services
- AI components and data flow display

## [0.7.0] - 2026-09-05

### Added
- Development plan endpoint (POST /api/projects/development-plan)
- DevelopmentPlanPanel component with expandable phases
- 9 development phases (Research to Deployment)
- Tasks, technologies, dependencies, outputs, testing, risks per phase

## [0.8.0] - 2026-09-05

### Added
- AI improvements endpoint (POST /api/projects/ai-improvements)
- AIImprovementsPanel component with recommendation cards
- Feature-by-feature AI suitability analysis
- Technology, complexity, data requirements, benefits, limitations
- Recommendation badges (Recommended/Optional/Not Recommended)

## [0.9.0] - 2026-09-05

### Added
- Existing project check endpoint (POST /api/projects/existing-check)
- ExistingCheckPanel component with similarity analysis
- Similar projects list with features and differences
- Originality assessment with disclaimer
- Potentially unique components list

## [0.10.0] - 2026-09-05

### Added
- AI capability endpoint (POST /api/projects/ai-capability)
- AICapabilityPanel component with component-by-component analysis
- AI assistance levels (High/Medium/Low) per component
- What AI can generate vs what requires human expertise
- Recommendations for each component

## [0.11.0] - 2026-09-05

### Security
- Rate limiting (100 requests/15min general, 10/min for AI endpoints)
- Input validation with Zod schemas
- Security headers with Helmet
- Request size limits (1MB)
- 404 handler
- Production-safe error messages

### Added
- Railway deployment config (Procfile)
- Vercel deployment config (vercel.json)
- Deployment guide (DEPLOYMENT.md)
- Multi-origin CORS support

## [0.12.0] - 2026-09-05

### Changed
- Profile form now starts with Project Level selector (Beginner/Intermediate/Advanced)
- Recommended options are highlighted based on selected level
- Fallback data is now personalized based on user inputs
- Fit scores calculated based on skill/interest/domain matching
- Different project templates for each difficulty level

## [0.13.0] - 2026-09-05

### Added
- Rule-based project generator with 50+ projects across 8 categories
- "View results instantly" button (small, secondary style)
- Yellow banner indicating rule-based system was used
- Domain-based project matching (prioritizes user's selected domain)
- Categories: Web Dev, Mobile, AI/ML, Healthcare, Finance, Education, E-Commerce, Cybersecurity, IoT

### Changed
- Gemini model updated to gemini-3.6-flash
- Project renamed from ProjectForge to IdeateX
- Loading screen button is now subtle and secondary
