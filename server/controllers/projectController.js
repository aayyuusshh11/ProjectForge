import { generateProjects, evaluateProject, generateBlueprint, generateDevelopmentPlan, generateAIImprovements, checkExistingProjects, analyzeAICapability } from '../services/openaiService.js';
import { getRelevantKnowledge } from '../services/contextService.js';
import { generateProjectsResponseSchema, evaluationSchema, blueprintSchema, developmentPlanSchema, aiImprovementsSchema, existingProjectSchema, aiCapabilitySchema, validateAIResponse } from '../schemas/projectSchema.js';

/**
 * Generate project suggestions
 * POST /api/projects/generate
 */
export async function handleGenerateProjects(req, res) {
  try {
    const studentProfile = req.body;

    // Validate required fields
    if (!studentProfile.skills || studentProfile.skills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one skill is required'
      });
    }

    if (!studentProfile.experience) {
      return res.status(400).json({
        success: false,
        error: 'Experience level is required'
      });
    }

    if (!studentProfile.duration) {
      return res.status(400).json({
        success: false,
        error: 'Available time/duration is required'
      });
    }

    // Get relevant knowledge based on profile
    const knowledge = getRelevantKnowledge(studentProfile);

    // Generate projects using OpenAI
    const aiResponse = await generateProjects(studentProfile, knowledge);

    // Validate AI response
    const validation = validateAIResponse(generateProjectsResponseSchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'Generated response was invalid. Please try again.'
      });
    }

    // Return validated projects
    res.json({
      success: true,
      projects: validation.data.projects,
      metadata: {
        profileUsed: {
          skills: studentProfile.skills,
          experience: studentProfile.experience,
          duration: studentProfile.duration
        },
        knowledgeUsed: knowledge.summary
      }
    });

  } catch (error) {
    console.error('Project generation error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate projects'
    });
  }
}

/**
 * Evaluate a project
 * POST /api/projects/evaluate
 */
export async function handleEvaluateProject(req, res) {
  try {
    const { project, studentProfile } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        error: 'Project data is required'
      });
    }

    // Get relevant knowledge
    const knowledge = getRelevantKnowledge(studentProfile || {});

    // Evaluate using OpenAI
    const aiResponse = await evaluateProject(project, studentProfile, knowledge);

    // Validate AI response
    const validation = validateAIResponse(evaluationSchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'Evaluation response was invalid. Please try again.'
      });
    }

    res.json({
      success: true,
      evaluation: validation.data
    });

  } catch (error) {
    console.error('Project evaluation error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to evaluate project'
    });
  }
}

/**
 * Generate technical blueprint
 * POST /api/projects/blueprint
 */
export async function handleGenerateBlueprint(req, res) {
  try {
    const { project, studentProfile } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        error: 'Project data is required'
      });
    }

    // Generate blueprint using OpenAI
    const aiResponse = await generateBlueprint(project, studentProfile);

    // Validate AI response
    const validation = validateAIResponse(blueprintSchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'Blueprint response was invalid. Please try again.'
      });
    }

    res.json({
      success: true,
      blueprint: validation.data
    });

  } catch (error) {
    console.error('Blueprint generation error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate blueprint'
    });
  }
}

/**
 * Generate development plan
 * POST /api/projects/development-plan
 */
export async function handleGenerateDevelopmentPlan(req, res) {
  try {
    const { project, studentProfile } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        error: 'Project data is required'
      });
    }

    // Generate development plan using OpenAI
    const aiResponse = await generateDevelopmentPlan(project, studentProfile);

    // Validate AI response
    const validation = validateAIResponse(developmentPlanSchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'Development plan response was invalid. Please try again.'
      });
    }

    res.json({
      success: true,
      plan: validation.data
    });

  } catch (error) {
    console.error('Development plan error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate development plan'
    });
  }
}

/**
 * Generate AI improvements
 * POST /api/projects/ai-improvements
 */
export async function handleGenerateAIImprovements(req, res) {
  try {
    const { project, studentProfile } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        error: 'Project data is required'
      });
    }

    // Generate AI improvements using OpenAI
    const aiResponse = await generateAIImprovements(project, studentProfile);

    // Validate AI response
    const validation = validateAIResponse(aiImprovementsSchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'AI improvements response was invalid. Please try again.'
      });
    }

    res.json({
      success: true,
      improvements: validation.data
    });

  } catch (error) {
    console.error('AI improvements error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate AI improvements'
    });
  }
}

/**
 * Check for existing similar projects
 * POST /api/projects/existing-check
 */
export async function handleCheckExistingProjects(req, res) {
  try {
    const { project } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        error: 'Project data is required'
      });
    }

    // Check existing projects using OpenAI
    const aiResponse = await checkExistingProjects(project);

    // Validate AI response
    const validation = validateAIResponse(existingProjectSchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'Existing check response was invalid. Please try again.'
      });
    }

    res.json({
      success: true,
      existingCheck: validation.data
    });

  } catch (error) {
    console.error('Existing check error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to check existing projects'
    });
  }
}

/**
 * Analyze AI capability
 * POST /api/projects/ai-capability
 */
export async function handleAnalyzeAICapability(req, res) {
  try {
    const { project } = req.body;

    if (!project) {
      return res.status(400).json({
        success: false,
        error: 'Project data is required'
      });
    }

    // Analyze AI capability using OpenAI
    const aiResponse = await analyzeAICapability(project);

    // Validate AI response
    const validation = validateAIResponse(aiCapabilitySchema, aiResponse);

    if (!validation.success) {
      console.error('AI response validation failed:', validation.errors);
      return res.status(502).json({
        success: false,
        error: 'AI capability response was invalid. Please try again.'
      });
    }

    res.json({
      success: true,
      capability: validation.data
    });

  } catch (error) {
    console.error('AI capability error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze AI capability'
    });
  }
}

export default { handleGenerateProjects, handleEvaluateProject, handleGenerateBlueprint, handleGenerateDevelopmentPlan, handleGenerateAIImprovements, handleCheckExistingProjects, handleAnalyzeAICapability };
