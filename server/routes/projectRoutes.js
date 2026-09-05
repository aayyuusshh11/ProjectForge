import { Router } from 'express';
import { handleGenerateProjects, handleEvaluateProject, handleGenerateBlueprint, handleGenerateDevelopmentPlan, handleGenerateAIImprovements, handleCheckExistingProjects, handleAnalyzeAICapability } from '../controllers/projectController.js';
import { validateStudentProfile, validateProjectData } from '../middleware/validate.js';

const router = Router();

// Generate project suggestions (requires valid student profile)
router.post('/generate', validateStudentProfile, handleGenerateProjects);

// Evaluate a project
router.post('/evaluate', validateProjectData, handleEvaluateProject);

// Generate technical blueprint
router.post('/blueprint', validateProjectData, handleGenerateBlueprint);

// Generate development plan
router.post('/development-plan', validateProjectData, handleGenerateDevelopmentPlan);

// Generate AI improvements
router.post('/ai-improvements', validateProjectData, handleGenerateAIImprovements);

// Check for existing similar projects
router.post('/existing-check', validateProjectData, handleCheckExistingProjects);

// Analyze AI capability
router.post('/ai-capability', validateProjectData, handleAnalyzeAICapability);

export default router;
