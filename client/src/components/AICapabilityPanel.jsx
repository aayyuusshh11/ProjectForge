import { useState } from 'react';
import { Cpu, CheckCircle, AlertTriangle, XCircle, Code, Shield } from 'lucide-react';
import { analyzeAICapability } from '../services/api';

// Fallback AI capability data
const FALLBACK_CAPABILITY = {
  components: [
    {
      name: 'Frontend Development',
      aiAssistanceLevel: 'High',
      whatAiCanGenerate: [
        'React components',
        'Form layouts',
        'CSS styling with Tailwind',
        'API integration code',
        'State management logic'
      ],
      whatRequiresHuman: [
        'UX design decisions',
        'Accessibility compliance',
        'Performance optimization',
        'Complex interaction patterns'
      ],
      recommendation: 'AI can generate 70-80% of frontend code. Always review for accessibility and performance.'
    },
    {
      name: 'Backend Development',
      aiAssistanceLevel: 'High',
      whatAiCanGenerate: [
        'Express routes',
        'Controller logic',
        'Middleware functions',
        'Database queries',
        'API endpoint structure'
      ],
      whatRequiresHuman: [
        'Security implementation',
        'Business logic validation',
        'Error handling strategy',
        'Performance tuning'
      ],
      recommendation: 'AI is excellent for boilerplate code. Security-critical code needs manual review.'
    },
    {
      name: 'Database',
      aiAssistanceLevel: 'Medium',
      whatAiCanGenerate: [
        'Schema definitions',
        'Migration scripts',
        'Basic queries',
        'Index recommendations'
      ],
      whatRequiresHuman: [
        'Data modeling decisions',
        'Performance optimization',
        'Scaling strategy',
        'Backup and recovery'
      ],
      recommendation: 'Use AI for initial schema design. Optimize queries manually based on actual usage.'
    },
    {
      name: 'AI/ML Integration',
      aiAssistanceLevel: 'High',
      whatAiCanGenerate: [
        'API integration code',
        'Prompt engineering',
        'Response parsing',
        'Error handling'
      ],
      whatRequiresHuman: [
        'Model selection',
        'Training data curation',
        'Output validation',
        'Ethical considerations'
      ],
      recommendation: 'AI can help integrate existing AI services. Building custom models requires ML expertise.'
    },
    {
      name: 'Testing',
      aiAssistanceLevel: 'High',
      whatAiCanGenerate: [
        'Unit test templates',
        'Test cases',
        'Mock implementations',
        'Integration test scaffolding'
      ],
      whatRequiresHuman: [
        'Test strategy',
        'Edge case identification',
        'E2E test scenarios',
        'Performance benchmarks'
      ],
      recommendation: 'AI can generate test boilerplate. Human insight needed for meaningful test coverage.'
    },
    {
      name: 'Documentation',
      aiAssistanceLevel: 'High',
      whatAiCanGenerate: [
        'README files',
        'API documentation',
        'Code comments',
        'Usage examples'
      ],
      whatRequiresHuman: [
        'Architecture decisions',
        'Business context',
        'Deployment guides',
        'Troubleshooting guides'
      ],
      recommendation: 'AI excels at documentation. Review for accuracy and completeness.'
    },
    {
      name: 'Deployment',
      aiAssistanceLevel: 'Medium',
      whatAiCanGenerate: [
        'Docker configurations',
        'CI/CD templates',
        'Environment setup scripts',
        'Deployment documentation'
      ],
      whatRequiresHuman: [
        'Infrastructure decisions',
        'Security configuration',
        'Scaling strategy',
        'Monitoring setup'
      ],
      recommendation: 'AI can help with standard deployments. Custom infrastructure needs expert review.'
    },
    {
      name: 'Security',
      aiAssistanceLevel: 'Low',
      whatAiCanGenerate: [
        'Basic security patterns',
        'Input validation code',
        'Authentication boilerplate'
      ],
      whatRequiresHuman: [
        'Security architecture',
        'Vulnerability assessment',
        'Penetration testing',
        'Compliance requirements'
      ],
      recommendation: 'Security-critical code should always be reviewed by a human expert.'
    }
  ]
};

export default function AICapabilityPanel({ project }) {
  const [capability, setCapability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setUsingFallback(false);
      
      const response = await analyzeAICapability(project);
      
      if (response.success) {
        setCapability(response.capability);
      } else {
        setCapability(FALLBACK_CAPABILITY);
        setUsingFallback(true);
      }
    } catch (err) {
      setCapability(FALLBACK_CAPABILITY);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'High': return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
      case 'Medium': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
      case 'Low': return 'text-red-400 border-red-500/50 bg-red-500/10';
      default: return 'text-zinc-400 border-zinc-500/50';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'High': return <CheckCircle className="w-4 h-4" />;
      case 'Medium': return <AlertTriangle className="w-4 h-4" />;
      case 'Low': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (!capability) {
    return (
      <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">AI Capability Analysis</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Analyze how AI tools can assist in building this project.
        </p>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 text-sm font-medium tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze AI Capability'}
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
      {usingFallback && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 border border-yellow-500/30 bg-yellow-500/10 rounded text-xs text-yellow-300">
          Using demo data - Add OpenAI credits for AI analysis
        </div>
      )}

      <div className="space-y-4">
        {capability.components?.map((comp, i) => (
          <div key={i} className="border border-zinc-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-zinc-200">{comp.name}</h4>
              <span className={`flex items-center gap-1.5 text-xs px-2 py-1 border ${getLevelColor(comp.aiAssistanceLevel)}`}>
                {getLevelIcon(comp.aiAssistanceLevel)}
                {comp.aiAssistanceLevel} AI Help
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <h5 className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2">
                  <Code className="w-3 h-3" />
                  AI Can Generate
                </h5>
                <ul className="space-y-1">
                  {comp.whatAiCanGenerate?.map((item, j) => (
                    <li key={j} className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2">
                  <Shield className="w-3 h-3" />
                  Requires Human
                </h5>
                <ul className="space-y-1">
                  {comp.whatRequiresHuman?.map((item, j) => (
                    <li key={j} className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <p className="text-xs text-zinc-500">{comp.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
