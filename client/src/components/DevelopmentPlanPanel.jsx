import { useState } from 'react';
import { Layers, ChevronDown, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { generateDevelopmentPlan } from '../services/api';

// Fallback development plan
const FALLBACK_PLAN = {
  phases: [
    {
      phase: 1,
      name: 'Research',
      objective: 'Understand requirements and explore existing solutions',
      tasks: ['Define project scope', 'Research similar projects', 'Identify key technologies', 'Create project charter'],
      technologies: ['Documentation tools'],
      dependencies: [],
      expectedOutput: 'Project charter and research report',
      testingRequirements: 'Review with stakeholders',
      potentialRisks: ['Scope creep', 'Unclear requirements']
    },
    {
      phase: 2,
      name: 'Requirements',
      objective: 'Define detailed functional and non-functional requirements',
      tasks: ['Gather user stories', 'Define acceptance criteria', 'Create wireframes', 'Document API contracts'],
      technologies: ['Figma', 'Swagger'],
      dependencies: ['Research phase complete'],
      expectedOutput: 'Requirements document and wireframes',
      testingRequirements: 'Requirements review',
      potentialRisks: ['Missing requirements', 'Changing priorities']
    },
    {
      phase: 3,
      name: 'UI/UX Design',
      objective: 'Design the user interface and experience',
      tasks: ['Create design system', 'Build component library', 'Design responsive layouts', 'Create prototypes'],
      technologies: ['Figma', 'Tailwind CSS'],
      dependencies: ['Requirements document'],
      expectedOutput: 'Design system and UI components',
      testingRequirements: 'Usability testing',
      potentialRisks: ['Design inconsistencies', 'Accessibility issues']
    },
    {
      phase: 4,
      name: 'Database',
      objective: 'Design and implement database schema',
      tasks: ['Design schema', 'Create migrations', 'Set up indexes', 'Seed initial data'],
      technologies: ['MongoDB', 'Mongoose'],
      dependencies: ['Requirements document'],
      expectedOutput: 'Database schema and seed data',
      testingRequirements: 'Query performance testing',
      potentialRisks: ['Schema changes', 'Data integrity issues']
    },
    {
      phase: 5,
      name: 'Backend',
      objective: 'Implement server-side logic and APIs',
      tasks: ['Set up Express server', 'Create API routes', 'Implement business logic', 'Add authentication'],
      technologies: ['Node.js', 'Express', 'JWT'],
      dependencies: ['Database schema', 'API contracts'],
      expectedOutput: 'Working REST API',
      testingRequirements: 'Unit and integration tests',
      potentialRisks: ['Security vulnerabilities', 'Performance issues']
    },
    {
      phase: 6,
      name: 'Frontend',
      objective: 'Build the user interface',
      tasks: ['Set up React project', 'Build components', 'Implement routing', 'Connect to API'],
      technologies: ['React', 'Tailwind CSS', 'Axios'],
      dependencies: ['UI design', 'Backend API'],
      expectedOutput: 'Working frontend application',
      testingRequirements: 'Component and E2E tests',
      potentialRisks: ['Browser compatibility', 'Responsive issues']
    },
    {
      phase: 7,
      name: 'AI/Logic Integration',
      objective: 'Integrate AI features if applicable',
      tasks: ['Set up AI service', 'Implement prompts', 'Handle responses', 'Add fallbacks'],
      technologies: ['OpenAI API', 'Python'],
      dependencies: ['Backend API', 'Frontend'],
      expectedOutput: 'AI features working',
      testingRequirements: 'AI output validation',
      potentialRisks: ['API costs', 'Response quality']
    },
    {
      phase: 8,
      name: 'Testing',
      objective: 'Comprehensive testing and bug fixes',
      tasks: ['Write unit tests', 'Integration testing', 'E2E testing', 'Performance testing'],
      technologies: ['Jest', 'Cypress'],
      dependencies: ['All features implemented'],
      expectedOutput: 'Test suite passing',
      testingRequirements: 'All tests passing',
      potentialRisks: ['Untested edge cases', 'Performance bottlenecks']
    },
    {
      phase: 9,
      name: 'Deployment',
      objective: 'Deploy to production',
      tasks: ['Set up CI/CD', 'Configure environment', 'Deploy backend', 'Deploy frontend'],
      technologies: ['Vercel', 'Render', 'Docker'],
      dependencies: ['Testing complete'],
      expectedOutput: 'Live application',
      testingRequirements: 'Production smoke tests',
      potentialRisks: ['Deployment issues', 'Environment config']
    }
  ]
};

export default function DevelopmentPlanPanel({ project }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setUsingFallback(false);
      
      const profile = JSON.parse(sessionStorage.getItem('studentProfile') || '{}');
      const response = await generateDevelopmentPlan(project, profile);
      
      if (response.success) {
        setPlan(response.plan);
      } else {
        setPlan(FALLBACK_PLAN);
        setUsingFallback(true);
      }
    } catch (err) {
      setPlan(FALLBACK_PLAN);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">Development Plan</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Generate a phased development plan with tasks, timelines, and dependencies.
        </p>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 text-sm font-medium tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
      {usingFallback && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 border border-yellow-500/30 bg-yellow-500/10 rounded text-xs text-yellow-300">
          Using demo plan - Add OpenAI credits for AI-generated plan
        </div>
      )}

      <div className="space-y-3">
        {plan.phases?.map((phase) => (
          <div key={phase.phase} className="border border-zinc-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
              className="w-full flex items-center justify-between p-4 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-zinc-800 rounded text-sm font-mono text-emerald-400">
                  {phase.phase}
                </span>
                <div className="text-left">
                  <h4 className="text-sm font-medium text-zinc-200">{phase.name}</h4>
                  <p className="text-xs text-zinc-500">{phase.objective}</p>
                </div>
              </div>
              {expandedPhase === phase.phase ? (
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              )}
            </button>
            
            {expandedPhase === phase.phase && (
              <div className="px-4 pb-4 border-t border-zinc-800">
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {/* Tasks */}
                  <div>
                    <h5 className="text-xs font-medium text-zinc-400 mb-2">Tasks</h5>
                    <ul className="space-y-1">
                      {phase.tasks?.map((task, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-xs font-medium text-zinc-400 mb-2">Technologies</h5>
                    <div className="flex flex-wrap gap-1">
                      {phase.technologies?.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-zinc-900 text-zinc-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expected Output */}
                  <div>
                    <h5 className="text-xs font-medium text-zinc-400 mb-2">Expected Output</h5>
                    <p className="text-xs text-zinc-400">{phase.expectedOutput}</p>
                  </div>

                  {/* Testing */}
                  <div>
                    <h5 className="text-xs font-medium text-zinc-400 mb-2">Testing</h5>
                    <p className="text-xs text-zinc-400">{phase.testingRequirements}</p>
                  </div>

                  {/* Risks */}
                  {phase.potentialRisks?.length > 0 && (
                    <div className="md:col-span-2">
                      <h5 className="text-xs font-medium text-zinc-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                        Potential Risks
                      </h5>
                      <ul className="space-y-1">
                        {phase.potentialRisks.map((risk, i) => (
                          <li key={i} className="text-xs text-zinc-500">- {risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
