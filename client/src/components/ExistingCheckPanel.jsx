import { useState } from 'react';
import { Search, Globe, GitBranch, AlertTriangle, CheckCircle } from 'lucide-react';
import { checkExistingProjects } from '../services/api';

// Fallback existing check data
const FALLBACK_EXISTING_CHECK = {
  similarProjects: [
    {
      name: 'PatientMonitor Pro',
      description: 'Commercial patient monitoring system used in hospitals for real-time vitals tracking.',
      similarity: 'High',
      source: 'Commercial',
      existingFeatures: ['Real-time vitals dashboard', 'Alert system', 'Patient history'],
      differences: ['No AI predictions', 'Commercial license', 'Enterprise-only']
    },
    {
      name: 'HealthTrack Open Source',
      description: 'Open source health tracking application with basic monitoring features.',
      similarity: 'Medium',
      source: 'GitHub',
      existingFeatures: ['Basic health tracking', 'Data visualization'],
      differences: ['No real-time monitoring', 'No ML integration', 'Mobile-only']
    },
    {
      name: 'SmartHealth Research',
      description: 'Research paper implementation of AI-based health monitoring system.',
      similarity: 'Low',
      source: 'Research',
      existingFeatures: ['AI anomaly detection', 'Research prototype'],
      differences: ['Not production-ready', 'No UI', 'Academic only']
    }
  ],
  originalityAssessment: 'No closely matching implementation was identified in the sources checked that combines all proposed features. While similar systems exist, the specific combination of real-time monitoring with AI predictions and student-friendly architecture appears to have limited direct precedents.',
  potentiallyUniqueComponents: [
    'Integration of real-time monitoring with ML predictions',
    'Student-friendly architecture with modern web stack',
    'Cost-effective implementation using open-source tools'
  ],
  disclaimer: 'This analysis is based on publicly available information and may not capture all existing implementations. The absence of a matching project in this search does not guarantee originality.'
};

export default function ExistingCheckPanel({ project }) {
  const [existingCheck, setExistingCheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleCheck = async () => {
    try {
      setLoading(true);
      setUsingFallback(false);
      
      const response = await checkExistingProjects(project);
      
      if (response.success) {
        setExistingCheck(response.existingCheck);
      } else {
        setExistingCheck(FALLBACK_EXISTING_CHECK);
        setUsingFallback(true);
      }
    } catch (err) {
      setExistingCheck(FALLBACK_EXISTING_CHECK);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const getSimilarityColor = (similarity) => {
    switch (similarity) {
      case 'High': return 'text-red-400 border-red-500/50';
      case 'Medium': return 'text-yellow-400 border-yellow-500/50';
      case 'Low': return 'text-emerald-400 border-emerald-500/50';
      default: return 'text-zinc-400 border-zinc-500/50';
    }
  };

  if (!existingCheck) {
    return (
      <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">Existing Project Check</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Check if similar projects already exist in the wild.
        </p>
        <button
          onClick={handleCheck}
          disabled={loading}
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 text-sm font-medium tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Check Existing Projects'}
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
      {usingFallback && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 border border-yellow-500/30 bg-yellow-500/10 rounded text-xs text-yellow-300">
          Using demo data - Add OpenAI credits for real search
        </div>
      )}

      {/* Similar Projects */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Similar Projects Found
        </h3>
        <div className="space-y-3">
          {existingCheck.similarProjects?.map((proj, i) => (
            <div key={i} className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-700">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-zinc-200">{proj.name}</h4>
                  <span className="text-xs text-zinc-500">{proj.source}</span>
                </div>
                <span className={`text-xs px-2 py-1 border ${getSimilarityColor(proj.similarity)}`}>
                  {proj.similarity} similarity
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">{proj.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-zinc-500">Existing Features:</span>
                  <ul className="mt-1 space-y-0.5">
                    {proj.existingFeatures?.map((f, j) => (
                      <li key={j} className="text-xs text-zinc-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-zinc-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Differences:</span>
                  <ul className="mt-1 space-y-0.5">
                    {proj.differences?.map((d, j) => (
                      <li key={j} className="text-xs text-zinc-400 flex items-center gap-1">
                        <GitBranch className="w-3 h-3 text-emerald-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Originality Assessment */}
      <div className="mb-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-700">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Originality Assessment</h3>
        <p className="text-xs text-zinc-400">{existingCheck.originalityAssessment}</p>
      </div>

      {/* Potentially Unique Components */}
      {existingCheck.potentiallyUniqueComponents?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-300 mb-2">Potentially Unique Components</h3>
          <ul className="space-y-1">
            {existingCheck.potentiallyUniqueComponents.map((comp, i) => (
              <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                {comp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300">{existingCheck.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
