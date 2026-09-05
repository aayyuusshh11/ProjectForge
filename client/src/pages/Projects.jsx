import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Gauge, ChevronRight, AlertCircle, Zap } from 'lucide-react';
import { generateProjects } from '../services/api';
import { generateRuleBasedProjects } from '../services/ruleBasedGenerator';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingRuleBased, setUsingRuleBased] = useState(false);
  const [aiRequestActive, setAiRequestActive] = useState(true);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('studentProfile');
    if (!storedProfile) {
      navigate('/profile');
      return;
    }

    const profile = JSON.parse(storedProfile);
    fetchProjects(profile);
  }, [navigate]);

  async function fetchProjects(profile) {
    try {
      setLoading(true);
      setAiRequestActive(true);
      setUsingRuleBased(false);
      
      const response = await generateProjects(profile);
      
      if (response.success && !usingRuleBased) {
        setProjects(response.projects);
        setUsingRuleBased(false);
      } else if (!usingRuleBased) {
        setProjects(generateRuleBasedProjects(profile));
        setUsingRuleBased(true);
      }
    } catch (err) {
      if (!usingRuleBased) {
        const profile = JSON.parse(sessionStorage.getItem('studentProfile') || '{}');
        setProjects(generateRuleBasedProjects(profile));
        setUsingRuleBased(true);
      }
    } finally {
      setLoading(false);
      setAiRequestActive(false);
    }
  }

  function handleQuickView() {
    const profile = JSON.parse(sessionStorage.getItem('studentProfile') || '{}');
    setProjects(generateRuleBasedProjects(profile));
    setUsingRuleBased(true);
    setLoading(false);
    setAiRequestActive(false);
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-400 border-emerald-500/50';
      case 'Intermediate': return 'text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'text-red-400 border-red-500/50';
      default: return 'text-zinc-400 border-zinc-500/50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-10 h-10 border-2 border-zinc-600 border-t-emerald-400 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-lg text-zinc-300 tracking-wider mb-2">Generating your projects...</p>
          <p className="text-sm text-zinc-500 mb-6">AI is analyzing your profile and creating personalized recommendations</p>
          
          <button
            onClick={handleQuickView}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600 transition-all duration-200 text-xs tracking-wide"
          >
            <Zap className="w-3 h-3" />
            View results instantly
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs tracking-wider uppercase">Back to Profile</span>
          </button>

          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono block mb-4">
            Step 02 / 02
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Your Projects</h1>
          
          {usingRuleBased && (
            <div className="flex items-center gap-3 mb-6 px-5 py-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-300 font-medium">Generated using Rule-Based System</p>
                <p className="text-xs text-yellow-400/70 mt-1">
                  These recommendations were calculated instantly using our rule-based engine. 
                  For AI-powered personalized projects, go back to profile and wait for AI generation.
                </p>
              </div>
            </div>
          )}
          
          <p className="text-zinc-400 text-sm">
            {usingRuleBased 
              ? `Based on your profile, here are ${projects.length} recommended projects.`
              : `Based on your profile, here are ${projects.length} AI-generated projects tailored to your skills.`
            }
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => navigate(`/project/${project.id}`, { state: { project } })}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onClick, getDifficultyColor }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border-2 border-zinc-800 hover:border-zinc-600 bg-zinc-800/50 p-6 transition-all duration-300 rounded-lg"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs font-mono text-zinc-500">0{index + 1}</span>
            <span className={`text-xs uppercase tracking-wider px-2 py-1 border ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
            <span className="text-xs text-zinc-500">
              Fit: {project.fitScore}%
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </h2>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-zinc-300 border border-zinc-700 bg-zinc-800/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row lg:flex-col gap-4 lg:items-end">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{project.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Gauge className="w-4 h-4" />
            <span className="text-xs">{project.fitScore}% match</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300">
            <span className="text-xs tracking-wider uppercase">View</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
