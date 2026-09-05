import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Gauge, Users, Layers, 
  BarChart3, FileText, Lightbulb, Search, Cpu,
  X
} from 'lucide-react';
import EvaluationPanel from '../components/EvaluationPanel';
import BlueprintPanel from '../components/BlueprintPanel';
import DevelopmentPlanPanel from '../components/DevelopmentPlanPanel';
import AIImprovementsPanel from '../components/AIImprovementsPanel';
import ExistingCheckPanel from '../components/ExistingCheckPanel';
import AICapabilityPanel from '../components/AICapabilityPanel';

export default function ProjectDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;
  const [activePanel, setActivePanel] = useState(null);

  if (!project) {
    navigate('/projects');
    return null;
  }

  const actions = [
    { id: 'evaluate', icon: <BarChart3 className="w-5 h-5" />, label: 'Evaluate Project', description: 'Feasibility scores and analysis' },
    { id: 'blueprint', icon: <FileText className="w-5 h-5" />, label: 'Blueprint', description: 'Technical architecture and design' },
    { id: 'plan', icon: <Layers className="w-5 h-5" />, label: 'Development Plan', description: 'Phases, tasks, and timeline' },
    { id: 'ai', icon: <Lightbulb className="w-5 h-5" />, label: 'AI Improvements', description: 'Where AI can enhance the project' },
    { id: 'existing', icon: <Search className="w-5 h-5" />, label: 'Existing Check', description: 'Similar projects analysis' },
    { id: 'capability', icon: <Cpu className="w-5 h-5" />, label: 'AI Capability', description: 'AI development assistance ratings' },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-400 border-emerald-500/50';
      case 'Intermediate': return 'text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'text-red-400 border-red-500/50';
      default: return 'text-zinc-400 border-zinc-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs tracking-wider uppercase">Back to Projects</span>
        </button>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-xs uppercase tracking-wider px-2 py-1 border ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
            <span className="text-xs text-zinc-500">
              Fit Score: {project.fitScore}%
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-6 border-y-2 border-zinc-800">
          <StatItem icon={<Clock className="w-4 h-4" />} label="Timeline" value={project.estimatedTime} />
          <StatItem icon={<Gauge className="w-4 h-4" />} label="Difficulty" value={project.difficulty} />
          <StatItem icon={<Users className="w-4 h-4" />} label="Target Users" value={project.targetUsers?.split(',')[0] || 'General'} />
          <StatItem icon={<Layers className="w-4 h-4" />} label="Technologies" value={`${project.technologies.length} stack`} />
        </div>

        {/* Problem Statement */}
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono mb-4">Problem Statement</h2>
          <p className="text-zinc-300 leading-relaxed max-w-2xl">
            {project.problemStatement}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-4 py-2 text-sm text-zinc-200 border-2 border-zinc-700 hover:border-zinc-500 transition-colors duration-200 bg-zinc-800/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono mb-4">Core Features</h2>
            <ul className="space-y-3">
              {project.coreFeatures?.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1 font-bold">-</span>
                  <span className="text-zinc-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono mb-4">Advanced Features</h2>
            <ul className="space-y-3">
              {project.advancedFeatures?.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-zinc-500 mt-1 font-bold">-</span>
                  <span className="text-zinc-400 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono mb-6">Project Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => setActivePanel(activePanel === action.id ? null : action.id)}
                className={`group p-6 border-2 text-left transition-all duration-300 rounded-lg ${
                  activePanel === action.id
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-zinc-800 hover:border-zinc-600 bg-zinc-800/30'
                }`}
              >
                <div className={`mb-4 transition-colors duration-300 ${
                  activePanel === action.id ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-emerald-400'
                }`}>
                  {action.icon}
                </div>
                <h3 className="text-sm font-medium text-zinc-200 mb-1">{action.label}</h3>
                <p className="text-xs text-zinc-500">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Active Panel */}
        {activePanel && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono">
                {actions.find(a => a.id === activePanel)?.label}
              </h2>
              <button
                onClick={() => setActivePanel(null)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {activePanel === 'evaluate' && <EvaluationPanel project={project} />}
            {activePanel === 'blueprint' && <BlueprintPanel project={project} />}
            {activePanel === 'plan' && <DevelopmentPlanPanel project={project} />}
            {activePanel === 'ai' && <AIImprovementsPanel project={project} />}
            {activePanel === 'existing' && <ExistingCheckPanel project={project} />}
            {activePanel === 'capability' && <AICapabilityPanel project={project} />}
          </div>
        )}
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-zinc-500 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-sm text-zinc-200 font-medium">{value}</div>
    </div>
  );
}
