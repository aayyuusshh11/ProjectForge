# ProjectForge

### AI-Powered Final-Year Project Generator & Mentor

ProjectForge is an AI-powered platform designed to help final-year students transform their **skills, interests, experience, and constraints** into practical and development-ready project ideas.

Instead of simply generating random project titles, ProjectForge evaluates each idea and provides:

* Project description
* Difficulty level
* Feasibility evaluation
* Technical blueprint
* Recommended technology stack
* System architecture
* Development plan
* AI improvement opportunities
* Existing-project analysis
* AI capability analysis

The goal is to take a student from:

> **"I don't know what project to make."**

to:

> **"I know exactly what I'm building, why I'm building it, what technologies I'll use, and how I'll develop it."**

---

# 1. Problem

Final-year students frequently struggle with:

* Choosing a project that matches their skills
* Finding a project that is sufficiently innovative
* Determining whether an idea is realistically achievable
* Selecting an appropriate technology stack
* Understanding the architecture required
* Breaking the project into development phases
* Knowing where AI can actually be useful
* Determining whether similar projects already exist
* Avoiding projects that are too complex for their available time

Existing AI chatbots can generate project ideas, but they generally provide **generic answers without maintaining a structured project-development workflow**.

ProjectForge addresses this by combining a curated knowledge base with AI reasoning.

---

# 2. Core Concept

ProjectForge follows this workflow:

```text
Student Information
        ↓
Relevant Knowledge
        ↓
AI Project Generation
        ↓
Project Suggestions
        ↓
Project Evaluation
        ↓
Blueprint
        ↓
Development Plan
        ↓
AI Improvements
        ↓
Project Validation
```

The AI acts as a **project mentor throughout the process**, rather than being only a chatbot.

---

# 3. Key Features

## 3.1 Student Profile

The student provides:

* Name (optional)
* Skills
* Programming languages
* Frameworks
* Interests
* Preferred domains
* Experience level
* Team size
* Available development time
* Preferred technologies
* Hardware availability
* API/service constraints

Example:

```text
Skills:
React, Node.js, Python

Interests:
Healthcare + AI

Experience:
Intermediate

Team:
3 students

Available Time:
4 months

Hardware:
No specialized hardware
```

---

# 4. Project Generation

The system generates multiple project suggestions based on the student's profile.

Each project contains:

```text
Project Name
Description
Problem Statement
Target Users
Difficulty
Estimated Development Time
Skill Match
Innovation
Recommended Technologies
Core Features
Advanced Features
```

The system should avoid generic projects such as:

* Basic To-Do applications
* Basic calculators
* Basic weather applications
* Simple CRUD management systems

unless the student explicitly requests beginner-level projects.

---

# 5. Project Evaluation

Each generated project can be evaluated using:

```text
Technical Feasibility
Skill Compatibility
Innovation
Complexity
Time Feasibility
Resource Requirements
Scalability
Overall Score
```

Example:

```text
Technical Feasibility      8/10
Skill Match                9/10
Innovation                 7/10
Time Feasibility           8/10
Resource Requirements      9/10

Overall Score              8.2/10
```

The AI should explain the reasoning behind the scores.

---

# 6. Project Blueprint

After selecting a project, ProjectForge generates a technical blueprint.

The blueprint includes:

### Problem

What problem the project solves.

### Target Users

Who would use the system.

### Core Features

The minimum features required for the project.

### Advanced Features

Features that can be added if additional time is available.

### Technology Stack

Example:

```text
Frontend:
React

Backend:
Node.js + Express

Database:
MongoDB

AI:
OpenAI API

Deployment:
Vercel + Render
```

### System Architecture

The AI describes:

* Frontend
* Backend
* Database
* External APIs
* AI services
* Authentication
* Data flow

---

# 7. Development Plan

The selected project is divided into practical development phases.

Example:

```text
Phase 1 - Research
Phase 2 - Requirements
Phase 3 - UI/UX
Phase 4 - Database
Phase 5 - Backend
Phase 6 - Frontend
Phase 7 - AI/Logic Integration
Phase 8 - Testing
Phase 9 - Deployment
```

Each phase contains:

```text
Goal
Tasks
Expected Output
Technologies
Dependencies
Testing Requirements
Potential Problems
```

The plan should be adapted to the student's available development time.

---

# 8. AI Improvements

ProjectForge identifies where AI can improve the project.

For every major feature, the system can classify AI suitability:

```text
Feature                    AI Suitability

Authentication             High
Dashboard                  High
Recommendation System     High
Prediction Model           High
Document Processing        High
Hardware Control           Low
Physical Sensor Reading    Low
```

The system explains:

* Why AI is suitable
* Which AI technology could be used
* What data would be required
* Possible limitations
* Whether AI is actually necessary

The system must **not recommend AI simply because the project is an AI-themed platform**.

---

# 9. Existing Project Check

ProjectForge can check whether a similar project already exists.

The workflow is:

```text
Selected Project
       ↓
Web Search
       ↓
Existing Projects / GitHub / Research
       ↓
Similarity Analysis
       ↓
Originality Report
```

The result should include:

```text
Similar Projects Found
Similarity Level
Existing Features
Differences
Potentially Original Components
```

Important:

The system should never claim that a project is completely original merely because no result was found.

Instead use wording such as:

> "No closely matching implementation was identified in the sources checked."

---

# 10. AI Capability Check

ProjectForge evaluates whether AI tools such as ChatGPT can realistically assist in building the project.

The system should divide the project into components:

```text
Frontend
Backend
Database
Authentication
AI/ML
Testing
Documentation
Deployment
Hardware
```

Each component receives:

```text
High
Medium
Low
```

AI assistance should be described realistically.

Example:

```text
Frontend Development → High

AI can generate:
- Components
- Forms
- Styling
- API integration

Human verification is still required.
```

---

# 11. AI Architecture

ProjectForge uses a hybrid architecture.

```text
                   Student
                      │
                      ▼
              Student Profile
                      │
                      ▼
              Backend Server
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
   Curated Knowledge          Web Search
       Base                   (optional)
          │                       │
          └───────────┬───────────┘
                      ▼
                 OpenAI API
                      │
                      ▼
             Structured Response
                      │
                      ▼
                Backend
                      │
                      ▼
                 Frontend
```

---

# 12. Data Strategy

ProjectForge does not require a massive project dataset.

Instead, the system uses a small curated knowledge base containing:

```text
Domains
Technologies
Project Patterns
Difficulty Levels
Constraints
Technology Capabilities
Common APIs
Hardware Requirements
```

Example:

```json
{
  "technology": "React",
  "category": "Frontend",
  "difficulty": "Intermediate",
  "aiCapability": "High"
}
```

The backend selects relevant information based on the student's input and sends it to OpenAI as context.

Therefore:

```text
Student Data
+
Relevant Curated Knowledge
+
AI Reasoning
=
Personalized Project
```

---

# 13. Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Lucide React

## Backend

* Node.js
* Express.js

## AI

* OpenAI API
* Responses API
* Structured JSON output

## Database

* MongoDB

## Validation

* Zod

## External Search

A web search/API service can be added for existing-project verification.

## Deployment

* Vercel
* Render

---

# 14. API Architecture

### Generate Projects

```http
POST /api/projects/generate
```

Request:

```json
{
  "skills": ["React", "Python", "Node.js"],
  "interests": ["Healthcare", "AI"],
  "experience": "Intermediate",
  "teamSize": 3,
  "duration": "4 months",
  "hardware": false
}
```

Response:

```json
{
  "projects": [
    {
      "id": "project-001",
      "title": "Smart Patient Monitoring",
      "description": "...",
      "difficulty": "Advanced",
      "fitScore": 87,
      "estimatedTime": "14 weeks",
      "technologies": [
        "React",
        "Node.js",
        "Python",
        "MongoDB"
      ]
    }
  ]
}
```

---

### Evaluate Project

```http
POST /api/projects/evaluate
```

---

### Generate Blueprint

```http
POST /api/projects/blueprint
```

---

### Generate Development Plan

```http
POST /api/projects/development-plan
```

---

### Generate AI Improvements

```http
POST /api/projects/ai-improvements
```

---

### Existing Project Check

```http
POST /api/projects/existing-check
```

---

### AI Capability Check

```http
POST /api/projects/ai-capability
```

---

# 15. Frontend Structure

```text
src/
│
├── components/
│   ├── Navbar
│   ├── ProjectCard
│   ├── ScoreCard
│   ├── FeatureList
│   └── LoadingState
│
├── pages/
│   ├── Landing
│   ├── Profile
│   ├── Projects
│   └── ProjectDetails
│
├── services/
│   └── api.js
│
├── data/
│   └── fallbackProjects.js
│
├── App.jsx
└── main.jsx
```

---

# 16. Backend Structure

```text
server/
│
├── controllers/
│   └── projectController.js
│
├── routes/
│   └── projectRoutes.js
│
├── services/
│   ├── openaiService.js
│   ├── searchService.js
│   └── contextService.js
│
├── data/
│   ├── domains.json
│   ├── technologies.json
│   ├── project-patterns.json
│   └── constraints.json
│
├── schemas/
│   └── projectSchema.js
│
├── app.js
└── server.js
```

---

# 17. AI Prompt Strategy

AI should receive:

```text
Student Profile
+
Relevant Knowledge
+
Selected Project
+
Current Task
```

Example:

```text
Student:
React, Python, Node.js
Healthcare
Intermediate
3 members
4 months

Relevant Knowledge:
React → Frontend
Python → AI/Backend
Healthcare → Monitoring systems
Difficulty → Intermediate

Task:
Generate practical project ideas.
```

The AI must follow the provided constraints.

---

# 18. AI Output Rules

The AI should:

1. Prefer practical projects.
2. Match projects to student skills.
3. Respect development time.
4. Consider team size.
5. Avoid unnecessary complexity.
6. Clearly identify assumptions.
7. Never fabricate existing-project evidence.
8. Never claim guaranteed originality.
9. Explain recommendations.
10. Return structured data.
11. Avoid recommending AI where it provides no meaningful benefit.
12. Prefer realistic technologies over unnecessarily exotic ones.

---

# 19. UI Design

ProjectForge should use a modern developer-oriented interface.

### Visual Direction

```text
Background: Near Black
Primary Text: White
Secondary Text: Gray
Borders: Subtle Gray
Border Radius: 4–6px
Shadows: Minimal/None
```

The interface should feel like a **developer tool**, not a generic AI landing page.

---

# 20. Main User Journey

```text
Landing
   ↓
Enter Profile
   ↓
Generate Projects
   ↓
Compare Projects
   ↓
Select Project
   ↓
Project Overview
   ↓
┌─────────────────────┐
│ Evaluate Project    │
│ Blueprint           │
│ Development Plan    │
│ AI Improvements     │
│ Existing Check      │
│ AI Capability       │
└─────────────────────┘
```

---

# 21. MVP Scope

### Must Have

* Student profile form
* AI project generation
* Multiple project suggestions
* Difficulty
* Project evaluation
* Blueprint
* Development plan
* AI improvements
* AI capability analysis
* Existing-project analysis
* Responsive UI

### Should Have

* Project history
* MongoDB persistence
* Web search integration
* Download project plan

### Not Required for MVP

* Authentication
* User profiles/accounts
* Progress tracking
* Social features
* Collaboration
* Mobile application
* Complex recommendation algorithms
* RAG/vector database
* Microservices

---

# 22. Three-Hour Development Priority

```text
Priority 1
React + Backend

Priority 2
OpenAI API

Priority 3
Project Generator

Priority 4
Project Details

Priority 5
Evaluation / Blueprint / Development Plan

Priority 6
AI Improvements

Priority 7
Existing Project Check

Priority 8
AI Capability Check

Priority 9
UI Polish
```

If time becomes limited, remove secondary infrastructure rather than removing the core workflow.

---

# 23. Success Criteria

ProjectForge succeeds when a student can:

1. Enter their skills and interests.
2. Receive relevant project ideas.
3. Understand why a project fits them.
4. Evaluate feasibility.
5. Understand the required architecture.
6. Receive a practical development plan.
7. Identify useful AI additions.
8. Determine whether similar projects exist.
9. Understand where AI tools can assist development.

The product should feel like a **project mentor**, not an AI text generator.

---

# 24. Future Improvements

Potential future versions can include:

* Personalized project history
* Faculty mentor collaboration
* Project documentation generation
* GitHub repository analysis
* Codebase analysis
* Automatic architecture diagrams
* Research-paper recommendations
* Dataset recommendations
* Project cost estimation
* Resume/GitHub integration
* Team skill matching
* Continuous project mentoring

---

# 25. Core Principle

> **Don't generate projects merely because they sound impressive. Generate projects that students can realistically build.**

ProjectForge should optimize for:

**Relevance + Feasibility + Technical Depth + Practical Value + Originality**

rather than simply producing impressive-sounding project names.
