import { z } from 'zod';

// Schema for a single project suggestion
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(1000),
  problemStatement: z.string().min(10).max(500),
  targetUsers: z.string().min(5).max(300),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  estimatedTime: z.string().min(1).max(50),
  fitScore: z.number().min(0).max(100),
  innovation: z.string().min(5).max(300),
  technologies: z.array(z.string()).min(1).max(10),
  coreFeatures: z.array(z.string()).min(2).max(8),
  advancedFeatures: z.array(z.string()).min(1).max(6),
  whyItFits: z.string().min(10).max(500)
});

// Schema for project generation response
export const generateProjectsResponseSchema = z.object({
  projects: z.array(projectSchema).min(1).max(5)
});

// Schema for project evaluation
export const evaluationSchema = z.object({
  technicalFeasibility: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  skillMatch: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  innovation: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  complexity: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  timeFeasibility: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  resourceRequirements: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  scalability: z.object({
    score: z.number().min(0).max(10),
    reasoning: z.string()
  }),
  overallScore: z.number().min(0).max(10),
  risks: z.array(z.string()),
  recommendations: z.array(z.string())
});

// Schema for project blueprint
export const blueprintSchema = z.object({
  systemOverview: z.string(),
  components: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technology: z.string()
  })),
  frontendArchitecture: z.string(),
  backendArchitecture: z.string(),
  databaseStructure: z.string(),
  apis: z.array(z.object({
    name: z.string(),
    description: z.string(),
    method: z.string()
  })),
  externalServices: z.array(z.string()),
  aiComponents: z.array(z.string()),
  dataFlow: z.string()
});

// Schema for development plan
export const developmentPlanSchema = z.object({
  phases: z.array(z.object({
    phase: z.number(),
    name: z.string(),
    objective: z.string(),
    tasks: z.array(z.string()),
    technologies: z.array(z.string()),
    dependencies: z.array(z.string()),
    expectedOutput: z.string(),
    testingRequirements: z.string(),
    potentialRisks: z.array(z.string())
  }))
});

// Schema for AI improvements
export const aiImprovementsSchema = z.object({
  improvements: z.array(z.object({
    feature: z.string(),
    purpose: z.string(),
    technology: z.string(),
    requiredData: z.string(),
    complexity: z.enum(['Low', 'Medium', 'High']),
    expectedBenefit: z.string(),
    limitations: z.string(),
    recommendation: z.enum(['Recommended', 'Optional', 'Not Recommended'])
  }))
});

// Schema for existing project check
export const existingProjectSchema = z.object({
  similarProjects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    similarity: z.enum(['Low', 'Medium', 'High']),
    source: z.string(),
    existingFeatures: z.array(z.string()),
    differences: z.array(z.string())
  })),
  originalityAssessment: z.string(),
  potentiallyUniqueComponents: z.array(z.string()),
  disclaimer: z.string()
});

// Schema for AI capability check
export const aiCapabilitySchema = z.object({
  components: z.array(z.object({
    name: z.string(),
    aiAssistanceLevel: z.enum(['High', 'Medium', 'Low']),
    whatAiCanGenerate: z.array(z.string()),
    whatRequiresHuman: z.array(z.string()),
    recommendation: z.string()
  }))
});

// Validation helper
export function validateAIResponse(schema, data) {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.errors };
  }
}
