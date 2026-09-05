import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are IdeateX, an AI-powered project mentor for final-year students.

Your role is to generate practical, development-ready project ideas based on student profiles.

CRITICAL RULES:
1. NEVER generate generic projects (todo apps, calculators, basic CRUD) unless explicitly requested
2. ALWAYS respect the student's time constraints - if they say 4 months, don't suggest 6-month projects
3. ALWAYS match projects to the student's skill level
4. ALWAYS explain WHY a project fits the student
5. NEVER claim a project is 100% original
6. Prefer practical technologies over exotic ones
7. Avoid unnecessary AI components - only suggest AI where it adds real value
8. Return structured JSON output only

OUTPUT FORMAT:
Return valid JSON matching the requested schema. No markdown, no explanations outside JSON.`;

/**
 * Generate project suggestions based on student profile and knowledge
 */
export async function generateProjects(studentProfile, relevantKnowledge) {
  const prompt = buildGenerationPrompt(studentProfile, relevantKnowledge);
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code
    });
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Build the generation prompt with student profile and knowledge
 */
function buildGenerationPrompt(profile, knowledge) {
  return `Generate 3-5 practical final-year project ideas.

STUDENT PROFILE:
- Skills: ${profile.skills?.join(', ') || 'Not specified'}
- Interests: ${profile.interests?.join(', ') || 'Not specified'}
- Domain: ${profile.domain || 'Not specified'}
- Experience: ${profile.experience || 'Intermediate'}
- Team Size: ${profile.teamSize || 1}
- Available Time: ${profile.duration || 'Not specified'}
- Preferred Technologies: ${profile.technologies?.join(', ') || 'None specified'}
- Hardware: ${profile.hardware ? 'Available' : 'Not available'}

RELEVANT KNOWLEDGE:
- Matching Domains: ${knowledge.domains?.map(d => d.name).join(', ') || 'None'}
- Available Technologies: ${knowledge.technologies?.map(t => t.name).join(', ') || 'None'}
- Suitable Patterns: ${knowledge.patterns?.map(p => p.name).join(', ') || 'None'}

CONSTRAINTS:
${knowledge.constraints?.map(c => `- ${c.rule}: ${c.implication}`).join('\n') || 'None'}

For each project, provide:
1. id: unique identifier (e.g., "proj-001")
2. title: catchy but professional project name
3. description: 2-3 sentence overview
4. problemStatement: what problem does this solve?
5. targetUsers: who would use this?
6. difficulty: Beginner/Intermediate/Advanced
7. estimatedTime: realistic timeline
8. fitScore: 0-100 how well it matches the student
9. innovation: what makes this project interesting
10. technologies: array of tech stack
11. coreFeatures: 3-5 essential features
12. advancedFeatures: 2-4 nice-to-have features
13. whyItFits: explain why this project is perfect for this student

Return as JSON with "projects" array.`;
}

/**
 * Evaluate a project's feasibility and fit
 */
export async function evaluateProject(project, studentProfile, knowledge) {
  const prompt = `Evaluate this final-year project for the given student.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Difficulty: ${project.difficulty}
- Technologies: ${project.technologies?.join(', ')}
- Estimated Time: ${project.estimatedTime}
- Core Features: ${project.coreFeatures?.join(', ')}
- Advanced Features: ${project.advancedFeatures?.join(', ')}

STUDENT PROFILE:
- Skills: ${studentProfile?.skills?.join(', ') || 'Not specified'}
- Experience: ${studentProfile?.experience || 'Intermediate'}
- Team Size: ${studentProfile?.teamSize || 1}
- Available Time: ${studentProfile?.duration || 'Not specified'}
- Hardware: ${studentProfile?.hardware ? 'Available' : 'Not available'}

Evaluate on these criteria (score 0-10 with reasoning):
1. Technical Feasibility - Can this be built with available tech?
2. Skill Match - How well does it match student's skills?
3. Innovation - How innovative/original is this project?
4. Complexity - Is complexity appropriate for the team?
5. Time Feasibility - Can it be done in available time?
6. Resource Requirements - Are resources reasonable?
7. Scalability - Can the project scale well?

Also provide:
- overallScore: weighted average (0-10)
- risks: array of potential risks
- recommendations: array of suggestions

Return as JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI evaluation error:', error.message);
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Generate technical blueprint for a project
 */
export async function generateBlueprint(project, studentProfile) {
  const prompt = `Generate a detailed technical blueprint for this final-year project.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Technologies: ${project.technologies?.join(', ')}
- Core Features: ${project.coreFeatures?.join(', ')}
- Advanced Features: ${project.advancedFeatures?.join(', ')}

STUDENT PROFILE:
- Skills: ${studentProfile?.skills?.join(', ') || 'Not specified'}
- Experience: ${studentProfile?.experience || 'Intermediate'}
- Team Size: ${studentProfile?.teamSize || 1}

Generate a practical blueprint with:
1. systemOverview: High-level description of the system
2. components: Array of {name, description, technology} for each major component
3. frontendArchitecture: Frontend structure and patterns
4. backendArchitecture: Backend structure and patterns
5. databaseStructure: Database schema and relationships
6. apis: Array of {name, description, method} for each API endpoint
7. externalServices: Array of external services needed
8. aiComponents: Array of AI/ML components (if any)
9. dataFlow: Description of how data flows through the system

Keep it practical for a student project. Return as JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI blueprint error:', error.message);
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Generate development plan for a project
 */
export async function generateDevelopmentPlan(project, studentProfile) {
  const prompt = `Generate a detailed development plan for this final-year project.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Technologies: ${project.technologies?.join(', ')}
- Core Features: ${project.coreFeatures?.join(', ')}
- Advanced Features: ${project.advancedFeatures?.join(', ')}
- Estimated Time: ${project.estimatedTime}

STUDENT PROFILE:
- Skills: ${studentProfile?.skills?.join(', ') || 'Not specified'}
- Experience: ${studentProfile?.experience || 'Intermediate'}
- Team Size: ${studentProfile?.teamSize || 1}
- Available Time: ${studentProfile?.duration || 'Not specified'}

Generate a phased development plan with:
- phases: Array of phase objects, each with:
  - phase: number (1-9)
  - name: phase name (Research, Requirements, UI/UX, Database, Backend, Frontend, AI/Logic, Testing, Deployment)
  - objective: what this phase achieves
  - tasks: array of specific tasks
  - technologies: array of technologies used
  - dependencies: array of what must be done first
  - expectedOutput: what gets delivered
  - testingRequirements: what to test
  - potentialRisks: array of risks

Adapt the plan to the student's timeline and team size.
Return as JSON object with "phases" array.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 5000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI development plan error:', error.message);
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Generate AI improvement suggestions
 */
export async function generateAIImprovements(project, studentProfile) {
  const prompt = `Analyze this project and suggest where AI can meaningfully improve it.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Technologies: ${project.technologies?.join(', ')}
- Core Features: ${project.coreFeatures?.join(', ')}
- Advanced Features: ${project.advancedFeatures?.join(', ')}

IMPORTANT RULES:
- Only suggest AI where it adds REAL value
- Be honest if AI is NOT recommended for some features
- Consider data privacy implications
- Mention human verification needs for critical features

Generate improvements with:
- improvements: Array of objects, each with:
  - feature: which feature can be improved
  - purpose: what AI would do
  - technology: which AI technology to use
  - requiredData: what data is needed
  - complexity: Low/Medium/High
  - expectedBenefit: what improvement to expect
  - limitations: what AI cannot do
  - recommendation: Recommended/Optional/Not Recommended

Return as JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI AI improvements error:', error.message);
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Check for existing similar projects
 */
export async function checkExistingProjects(project) {
  const prompt = `Analyze this project and identify similar existing projects.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Core Features: ${project.coreFeatures?.join(', ')}
- Technologies: ${project.technologies?.join(', ')}

IMPORTANT RULES:
- NEVER claim a project is 100% original
- Use phrases like "No closely matching implementation was identified in the sources checked"
- Be honest about similarities

Generate analysis with:
- similarProjects: Array of objects, each with:
  - name: project name
  - description: brief description
  - similarity: Low/Medium/High
  - source: where it exists (GitHub, Research, Commercial)
  - existingFeatures: array of features they have
  - differences: array of differences from this project
- originalityAssessment: overall assessment (be careful with claims)
- potentiallyUniqueComponents: array of potentially original aspects
- disclaimer: standard disclaimer about search limitations

Return as JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI existing check error:', error.message);
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

/**
 * Analyze AI development capability for a project
 */
export async function analyzeAICapability(project) {
  const prompt = `Analyze how AI development tools (like ChatGPT, Copilot, etc.) can assist in building this project.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Technologies: ${project.technologies?.join(', ')}
- Core Features: ${project.coreFeatures?.join(', ')}
- Advanced Features: ${project.advancedFeatures?.join(', ')}

Analyze each component and rate AI assistance capability:

components: Array of objects, each with:
- name: component name (Frontend, Backend, Database, API, AI/ML, Testing, Documentation, Deployment, Hardware)
- aiAssistanceLevel: High/Medium/Low
- whatAiCanGenerate: array of what AI tools can help with
- whatRequiresHuman: array of what needs human expertise
- recommendation: specific recommendation for using AI

IMPORTANT:
- "AI can generate code" does NOT mean "AI can completely solve"
- Always mention human verification is required
- Be realistic about limitations
- Security-sensitive components need manual review

Return as JSON object.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI AI capability error:', error.message);
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

export default { generateProjects, evaluateProject, generateBlueprint, generateDevelopmentPlan, generateAIImprovements, checkExistingProjects, analyzeAICapability };
