const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generate project suggestions based on student profile
 */
export async function generateProjects(profile) {
  const response = await fetch(`${API_BASE_URL}/api/projects/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to generate projects');
  }

  return response.json();
}

/**
 * Evaluate a project
 */
export async function evaluateProject(project, studentProfile) {
  const response = await fetch(`${API_BASE_URL}/api/projects/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project, studentProfile }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to evaluate project');
  }

  return response.json();
}

/**
 * Generate technical blueprint
 */
export async function generateBlueprint(project, studentProfile) {
  const response = await fetch(`${API_BASE_URL}/api/projects/blueprint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project, studentProfile }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to generate blueprint');
  }

  return response.json();
}

/**
 * Generate development plan
 */
export async function generateDevelopmentPlan(project, studentProfile) {
  const response = await fetch(`${API_BASE_URL}/api/projects/development-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project, studentProfile }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to generate development plan');
  }

  return response.json();
}

/**
 * Generate AI improvements
 */
export async function generateAIImprovements(project, studentProfile) {
  const response = await fetch(`${API_BASE_URL}/api/projects/ai-improvements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project, studentProfile }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to generate AI improvements');
  }

  return response.json();
}

/**
 * Check for existing similar projects
 */
export async function checkExistingProjects(project) {
  const response = await fetch(`${API_BASE_URL}/api/projects/existing-check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to check existing projects');
  }

  return response.json();
}

/**
 * Analyze AI capability
 */
export async function analyzeAICapability(project) {
  const response = await fetch(`${API_BASE_URL}/api/projects/ai-capability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to analyze AI capability');
  }

  return response.json();
}

export default { generateProjects, evaluateProject, generateBlueprint, generateDevelopmentPlan, generateAIImprovements, checkExistingProjects, analyzeAICapability };
