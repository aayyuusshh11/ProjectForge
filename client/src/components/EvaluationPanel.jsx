import { useState } from 'react';
import { BarChart3, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { evaluateProject } from '../services/api';

// Fallback evaluation data
const FALLBACK_EVALUATION = {
  technicalFeasibility: { score: 8, reasoning: 'Uses well-established technologies with good documentation.' },
  skillMatch: { score: 9, reasoning: 'Directly matches the student\'s declared skills and experience level.' },
  innovation: { score: 7, reasoning: 'Combines existing technologies in a practical but somewhat novel way.' },
  complexity: { score: 7, reasoning: 'Moderate complexity appropriate for a team of this size.' },
  timeFeasibility: { score: 8, reasoning: 'Timeline is realistic with proper planning and execution.' },
  resourceRequirements: { score: 9, reasoning: 'All required resources are freely available or low-cost.' },
  scalability: { score: 7, reasoning: 'Architecture supports moderate scaling with some adjustments.' },
  overallScore: 7.9,
  risks: [
    'Integration between multiple services may cause delays',
    'ML model training requires sufficient quality data',
    'Testing all edge cases will require dedicated time'
  ],
  recommendations: [
    'Start with core features and add advanced features later',
    'Use existing libraries instead of building from scratch',
    'Set up CI/CD pipeline early for faster iteration'
  ]
};

export default function EvaluationPanel({ project }) {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleEvaluate = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);
      
      const profile = JSON.parse(sessionStorage.getItem('studentProfile') || '{}');
      const response = await evaluateProject(project, profile);
      
      if (response.success) {
        setEvaluation(response.evaluation);
      } else {
        setEvaluation(FALLBACK_EVALUATION);
        setUsingFallback(true);
      }
    } catch (err) {
      setEvaluation(FALLBACK_EVALUATION);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!evaluation) {
    return (
      <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">Project Evaluation</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Get detailed feasibility scores and analysis for this project.
        </p>
        <button
          onClick={handleEvaluate}
          disabled={loading}
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 text-sm font-medium tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Evaluate Project'}
        </button>
      </div>
    );
  }

  const criteria = [
    { key: 'technicalFeasibility', label: 'Technical Feasibility', icon: <CheckCircle className="w-4 h-4" /> },
    { key: 'skillMatch', label: 'Skill Match', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'innovation', label: 'Innovation', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'complexity', label: 'Complexity', icon: <AlertTriangle className="w-4 h-4" /> },
    { key: 'timeFeasibility', label: 'Time Feasibility', icon: <CheckCircle className="w-4 h-4" /> },
    { key: 'resourceRequirements', label: 'Resources', icon: <CheckCircle className="w-4 h-4" /> },
    { key: 'scalability', label: 'Scalability', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
      {usingFallback && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 border border-yellow-500/30 bg-yellow-500/10 rounded text-xs text-yellow-300">
          Using demo evaluation - Add OpenAI credits for AI analysis
        </div>
      )}

      {/* Overall Score */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-zinc-700">
        <div>
          <h3 className="text-lg font-semibold text-zinc-200 mb-1">Overall Score</h3>
          <p className="text-xs text-zinc-500">Weighted average of all criteria</p>
        </div>
        <div className={`text-5xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
          {evaluation.overallScore.toFixed(1)}
          <span className="text-lg text-zinc-500">/10</span>
        </div>
      </div>

      {/* Score Bars */}
      <div className="space-y-4 mb-6">
        {criteria.map(({ key, label, icon }) => {
          const item = evaluation[key];
          if (!item) return null;
          
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  {icon}
                  <span className="text-sm">{label}</span>
                </div>
                <span className={`text-sm font-mono font-bold ${getScoreColor(item.score)}`}>
                  {item.score}/10
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreBg(item.score)} rounded-full transition-all duration-500`}
                  style={{ width: `${item.score * 10}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1">{item.reasoning}</p>
            </div>
          );
        })}
      </div>

      {/* Risks */}
      {evaluation.risks?.length > 0 && (
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Potential Risks
          </h4>
          <ul className="space-y-2">
            {evaluation.risks.map((risk, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-yellow-400 mt-1">-</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {evaluation.recommendations?.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {evaluation.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-400 mt-1">-</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
