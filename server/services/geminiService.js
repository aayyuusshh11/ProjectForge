import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are IdeateX, an AI-powered project mentor for final-year students.

Your role is to generate practical, development-ready project ideas based on student profiles.

CRITICAL RULES:
1. NEVER generate generic projects (todo apps, calculators, basic CRUD) unless explicitly requested
2. ALWAYS respect the student's time constraints
3. ALWAYS match projects to the student's skill level
4. ALWAYS explain WHY a project fits the student
5. NEVER claim a project is 100% original
6. Prefer practical technologies over exotic ones
7. Avoid unnecessary AI components
8. Return structured JSON output only`;

async function generateWithGemini(prompt) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-3.6-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4000,
    }
  });

  const result = await model.generateContent(SYSTEM_PROMPT + '\n\n' + prompt);
  const response = result.response;
  const text = response.text();
  
  // Extract JSON from response (handles both object {} and array [] responses)
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                    text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1] || jsonMatch[0]);
  }
  throw new Error('Invalid JSON response from Gemini');
}

export async function generateProjects(studentProfile, relevantKnowledge) {
  const prompt = `Generate 3-5 practical final-year project ideas.

STUDENT PROFILE:
- Skills: ${studentProfile.skills?.join(', ') || 'Not specified'}
- Interests: ${studentProfile.interests?.join(', ') || 'Not specified'}
- Domain: ${studentProfile.domain || 'Not specified'}
- Experience: ${studentProfile.experience || 'Intermediate'}
- Team Size: ${studentProfile.teamSize || 1}
- Available Time: ${studentProfile.duration || 'Not specified'}
- Preferred Technologies: ${studentProfile.technologies?.join(', ') || 'None specified'}
- Hardware: ${studentProfile.hardware ? 'Available' : 'Not available'}

RELEVANT KNOWLEDGE:
- Matching Domains: ${relevantKnowledge.domains?.map(d => d.name).join(', ') || 'None'}
- Available Technologies: ${relevantKnowledge.technologies?.map(t => t.name).join(', ') || 'None'}
- Suitable Patterns: ${relevantKnowledge.patterns?.map(p => p.name).join(', ') || 'None'}

CONSTRAINTS:
${relevantKnowledge.constraints?.map(c => '- ' + c.rule + ': ' + c.implication).join('\n') || 'None'}

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

  return generateWithGemini(prompt);
}

export async function evaluateProject(project, studentProfile, knowledge) {
  const prompt = `Evaluate this final-year project for the given student.

PROJECT:
- Title: ${project.title}
- Description: ${project.description}
- Difficulty: ${project.difficulty}
- Technologies: ${project.technologies?.join(', ')}
- Estimated Time: ${project.estimatedTime}

STUDENT PROFILE:
- Skills: ${studentProfile?.skills?.join(', ') || 'Not specified'}
- Experience: ${studentProfile?.experience || 'Intermediate'}
- Team Size: ${studentProfile?.teamSize || 1}
- Available Time: ${studentProfile?.duration || 'Not specified'}

Evaluate on these criteria (score 0-10 with reasoning):
1. Technical Feasibility
2. Skill Match
3. Innovation
4. Complexity
5. Time Feasibility
6. Resource Requirements
7. Scalability

Also provide:
- overallScore: weighted average (0-10)
- risks: array of potential risks
- recommendations: array of suggestions

Return as JSON object.`;

  return generateWithGemini(prompt);
}

export async function generateBlueprint(project, studentProfile) {
  const prompt = `Generate a technical blueprint for this project.

PROJECT:
- Title: ${project.title}
- Technologies: ${project.technologies?.join(', ')}
- Core Features: ${project.coreFeatures?.join(', ')}

Generate:
1. systemOverview
2. components: Array of {name, description, technology}
3. frontendArchitecture
4. backendArchitecture
5. databaseStructure
6. apis: Array of {name, description, method}
7. externalServices
8. aiComponents
9. dataFlow

Return as JSON object.`;

  return generateWithGemini(prompt);
}

export async function generateDevelopmentPlan(project, studentProfile) {
  const prompt = `Generate a development plan for this project.

PROJECT: ${project.title}
TIME: ${studentProfile?.duration || 'Not specified'}
TEAM: ${studentProfile?.teamSize || 1} members

Generate phases array with:
- phase, name, objective, tasks, technologies, dependencies, expectedOutput, testingRequirements, potentialRisks

Return as JSON with "phases" array.`;

  return generateWithGemini(prompt);
}

export async function generateAIImprovements(project, studentProfile) {
  const prompt = `Suggest AI improvements for this project.

PROJECT: ${project.title}
FEATURES: ${project.coreFeatures?.join(', ')}

Generate improvements array with:
- feature, purpose, technology, requiredData, complexity, expectedBenefit, limitations, recommendation

Return as JSON with "improvements" array.`;

  return generateWithGemini(prompt);
}

export async function checkExistingProjects(project) {
  const prompt = `Find similar existing projects for: ${project.title}

DESCRIPTION: ${project.description}

Generate:
- similarProjects: Array with name, description, similarity, source, existingFeatures, differences
- originalityAssessment
- potentiallyUniqueComponents
- disclaimer

Return as JSON object.`;

  return generateWithGemini(prompt);
}

export async function analyzeAICapability(project) {
  const prompt = `Analyze AI development capability for: ${project.title}

Generate components array with:
- name, aiAssistanceLevel, whatAiCanGenerate, whatRequiresHuman, recommendation

Return as JSON object.`;

  return generateWithGemini(prompt);
}

export default { 
  generateProjects, 
  evaluateProject, 
  generateBlueprint, 
  generateDevelopmentPlan, 
  generateAIImprovements, 
  checkExistingProjects, 
  analyzeAICapability 
};
