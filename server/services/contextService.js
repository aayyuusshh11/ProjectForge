import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load knowledge base data
const domains = JSON.parse(readFileSync(join(__dirname, '../data/domains.json'), 'utf-8'));
const technologies = JSON.parse(readFileSync(join(__dirname, '../data/technologies.json'), 'utf-8'));
const projectPatterns = JSON.parse(readFileSync(join(__dirname, '../data/project-patterns.json'), 'utf-8'));
const constraints = JSON.parse(readFileSync(join(__dirname, '../data/constraints.json'), 'utf-8'));

/**
 * Get relevant knowledge based on student profile
 * @param {Object} studentProfile - Student's profile data
 * @returns {Object} Relevant knowledge for AI context
 */
export function getRelevantKnowledge(studentProfile) {
  const { skills, interests, domain, experience, teamSize, duration, technologies: preferredTech, hardware } = studentProfile;

  // Find matching domains
  const relevantDomains = domains.filter(d => {
    if (domain && d.id === domain.toLowerCase()) return true;
    if (interests?.some(i => d.name.toLowerCase().includes(i.toLowerCase()))) return true;
    return false;
  });

  // Find matching technologies based on skills
  const relevantTechnologies = technologies.filter(tech => {
    if (skills?.some(skill => tech.name.toLowerCase().includes(skill.toLowerCase()))) return true;
    if (preferredTech?.some(t => tech.name.toLowerCase().includes(t.toLowerCase()))) return true;
    return false;
  });

  // Get tech categories from skills
  const techCategories = [...new Set(relevantTechnologies.map(t => t.category))];

  // Find suitable project patterns based on constraints
  const relevantPatterns = projectPatterns.filter(pattern => {
    // Filter by complexity based on experience
    if (experience === 'Beginner' && pattern.complexity === 'Advanced') return false;
    if (experience === 'Intermediate' && pattern.complexity === 'Advanced' && teamSize < 3) return false;
    
    // Filter by duration
    const durationWeeks = parseDurationToWeeks(duration);
    if (durationWeeks) {
      const patternWeeks = parsePatternDuration(pattern.duration);
      if (patternWeeks && durationWeeks < patternWeeks.min) return false;
    }

    return true;
  });

  // Find applicable constraints
  const applicableConstraints = constraints.filter(c => {
    if (c.id.includes('team-size') && teamSize) {
      if (c.id === 'team-size-small' && teamSize <= 2) return true;
      if (c.id === 'team-size-medium' && teamSize >= 3 && teamSize <= 4) return true;
      if (c.id === 'team-size-large' && teamSize >= 5) return true;
    }
    if (c.id.includes('duration') && duration) {
      const weeks = parseDurationToWeeks(duration);
      if (c.id === 'duration-short' && weeks <= 6) return true;
      if (c.id === 'duration-medium' && weeks > 6 && weeks <= 12) return true;
      if (c.id === 'duration-long' && weeks > 12) return true;
    }
    if (c.id.includes('experience') && experience) {
      if (c.id === 'beginner-experience' && experience === 'Beginner') return true;
      if (c.id === 'intermediate-experience' && experience === 'Intermediate') return true;
      if (c.id === 'advanced-experience' && experience === 'Advanced') return true;
    }
    if (c.id === 'no-hardware' && !hardware) return true;
    if (c.id === 'has-hardware' && hardware) return true;
    if (c.id === 'avoid-generic') return true;
    return false;
  });

  return {
    domains: relevantDomains,
    technologies: relevantTechnologies,
    techCategories,
    patterns: relevantPatterns,
    constraints: applicableConstraints,
    summary: {
      skillCount: skills?.length || 0,
      techCount: relevantTechnologies.length,
      patternCount: relevantPatterns.length,
      constraintCount: applicableConstraints.length
    }
  };
}

/**
 * Parse duration string to weeks
 */
function parseDurationToWeeks(duration) {
  if (!duration) return null;
  const lower = duration.toLowerCase();
  const num = parseInt(lower);
  if (isNaN(num)) return null;
  if (lower.includes('month')) return num * 4;
  if (lower.includes('week')) return num;
  return num; // assume weeks if no unit
}

/**
 * Parse pattern duration range
 */
function parsePatternDuration(duration) {
  if (!duration) return null;
  const match = duration.match(/(\d+)-(\d+)\s*weeks/);
  if (match) {
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }
  return null;
}

export default { getRelevantKnowledge };
