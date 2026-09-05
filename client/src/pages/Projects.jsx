import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Gauge, ChevronRight, AlertCircle } from 'lucide-react';
import { generateProjects } from '../services/api';

// Fallback demo data for when API is unavailable
const FALLBACK_PROJECTS = [
  {
    id: 'proj-demo-001',
    title: 'Smart Patient Monitoring System',
    description: 'An AI-powered dashboard that monitors patient vitals in real-time, alerts healthcare staff to anomalies, and provides predictive health insights using machine learning.',
    problemStatement: 'Hospitals struggle with continuous patient monitoring, leading to delayed responses to critical health changes.',
    difficulty: 'Advanced',
    fitScore: 87,
    estimatedTime: '14 weeks',
    technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'TensorFlow'],
    targetUsers: 'Hospitals, clinics, elderly care facilities',
    coreFeatures: ['Real-time vitals dashboard', 'Anomaly detection', 'Alert system', 'Patient history'],
    advancedFeatures: ['Predictive analytics', 'ML-based risk scoring', 'Integration with wearables'],
    whyItFits: 'Matches your React and Python skills with healthcare interest.',
    innovation: 'Combines real-time monitoring with predictive ML models.'
  },
  {
    id: 'proj-demo-002',
    title: 'AI Study Companion',
    description: 'A personalized learning platform that adapts to student behavior, generates practice questions, and provides intelligent study recommendations based on performance patterns.',
    problemStatement: 'Students lack personalized study tools that adapt to their learning pace and knowledge gaps.',
    difficulty: 'Intermediate',
    fitScore: 92,
    estimatedTime: '12 weeks',
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI'],
    targetUsers: 'University students, online learners',
    coreFeatures: ['Adaptive quizzes', 'Progress tracking', 'Study recommendations', 'Performance analytics'],
    advancedFeatures: ['AI-generated study notes', 'Spaced repetition', 'Learning style detection'],
    whyItFits: 'Perfect for your React and Python skills with AI interest.',
    innovation: 'Uses LLMs to generate personalized study content.'
  },
  {
    id: 'proj-demo-003',
    title: 'Smart Campus Navigation',
    description: 'An indoor navigation system for university campuses using BLE beacons and machine learning to provide real-time directions and occupancy information.',
    problemStatement: 'New students and visitors struggle to navigate large university campuses efficiently.',
    difficulty: 'Advanced',
    fitScore: 78,
    estimatedTime: '16 weeks',
    technologies: ['React Native', 'Node.js', 'Python', 'Firebase', 'BLE'],
    targetUsers: 'University students, faculty, visitors',
    coreFeatures: ['Indoor navigation', 'Room finder', 'Campus map', 'Event locations'],
    advancedFeatures: ['Crowd density tracking', 'Accessibility routes', 'AR navigation overlay'],
    whyItFits: 'Combines your web skills with emerging BLE technology.',
    innovation: 'Indoor positioning without GPS using BLE beacons.'
  }
];

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

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
      setUsingFallback(false);
      const response = await generateProjects(profile);
      if (response.success) {
        setProjects(response.projects);
      } else {
        setProjects(FALLBACK_PROJECTS);
        setUsingFallback(true);
      }
    } catch (err) {
      setProjects(FALLBACK_PROJECTS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
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
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-zinc-600 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-zinc-400 tracking-wider">Generating your projects...</p>
          <p className="text-xs text-zinc-600 mt-2">This may take 10-20 seconds</p>
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
          
          {usingFallback && (
            <div className="flex items-center gap-2 mb-4 px-4 py-3 border border-yellow-500/30 bg-yellow-500/10 rounded">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span className="text-xs text-yellow-300">Using demo data - Add OpenAI credits for AI-generated projects</span>
            </div>
          )}
          
          <p className="text-zinc-400 text-sm">
            {usingFallback 
              ? `Here are ${projects.length} demo projects. Add OpenAI credits to generate personalized projects.`
              : `Based on your profile, here are ${projects.length} projects tailored to your skills.`
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
