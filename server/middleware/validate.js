import { z } from 'zod';

// Student profile validation schema
const studentProfileSchema = z.object({
  name: z.string().max(100).optional(),
  skills: z.array(z.string().max(50)).min(1).max(20),
  interests: z.array(z.string().max(50)).max(10).optional(),
  domain: z.string().max(50).optional(),
  experience: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  teamSize: z.number().int().min(1).max(10),
  duration: z.string().max(50),
  technologies: z.array(z.string().max(50)).max(15).optional(),
  hardware: z.boolean().optional()
});

// Project validation schema
const projectSchema = z.object({
  id: z.string().max(50),
  title: z.string().max(200),
  description: z.string().max(2000),
  problemStatement: z.string().max(1000).optional(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  fitScore: z.number().min(0).max(100),
  estimatedTime: z.string().max(50),
  technologies: z.array(z.string().max(50)),
  targetUsers: z.string().max(500).optional(),
  coreFeatures: z.array(z.string().max(200)).optional(),
  advancedFeatures: z.array(z.string().max(200)).optional()
});

/**
 * Validate student profile input
 */
export function validateStudentProfile(req, res, next) {
  try {
    studentProfileSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    next(error);
  }
}

/**
 * Validate project data in request
 */
export function validateProjectData(req, res, next) {
  try {
    if (req.body.project) {
      projectSchema.parse(req.body.project);
    }
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid project data',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    next(error);
  }
}

export default { validateStudentProfile, validateProjectData };
