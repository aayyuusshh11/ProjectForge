import { useState } from 'react';
import { Lightbulb, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { generateAIImprovements } from '../services/api';

// Fallback AI improvements
const FALLBACK_IMPROVEMENTS = {
  improvements: [
    {
      feature: 'User Authentication',
      purpose: 'Add biometric or passwordless authentication using AI-powered face recognition',
      technology: 'Face Recognition API, TensorFlow.js',
      requiredData: 'User face images (with consent)',
      complexity: 'Medium',
      expectedBenefit: 'Enhanced security and better user experience',
      limitations: 'Requires user consent, may have accuracy issues with certain demographics',
      recommendation: 'Optional'
    },
    {
      feature: 'Search Functionality',
      purpose: 'Implement semantic search using NLP to understand user intent',
      technology: 'OpenAI Embeddings, Vector Database',
      requiredData: 'User search queries, content corpus',
      complexity: 'High',
      expectedBenefit: 'More relevant search results, better user experience',
      limitations: 'Requires quality training data, may increase costs',
      recommendation: 'Recommended'
    },
    {
      feature: 'Content Recommendations',
      purpose: 'Personalized content recommendations based on user behavior',
      technology: 'Collaborative Filtering, Neural Networks',
      requiredData: 'User interaction history, content metadata',
      complexity: 'High',
      expectedBenefit: 'Increased engagement, personalized experience',
      limitations: 'Cold start problem, requires significant user data',
      recommendation: 'Optional'
    },
    {
      feature: 'Data Entry',
      purpose: 'Auto-fill forms using AI to predict values from partial input',
      technology: 'OpenAI API, Pattern Recognition',
      requiredData: 'Historical form submissions',
      complexity: 'Low',
      expectedBenefit: 'Faster data entry, reduced errors',
      limitations: 'Predictions may be inaccurate, requires validation',
      recommendation: 'Recommended'
    }
  ]
};

export default function AIImprovementsPanel({ project }) {
  const [improvements, setImprovements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setUsingFallback(false);
      
      const profile = JSON.parse(sessionStorage.getItem('studentProfile') || '{}');
      const response = await generateAIImprovements(project, profile);
      
      if (response.success) {
        setImprovements(response.improvements);
      } else {
        setImprovements(FALLBACK_IMPROVEMENTS);
        setUsingFallback(true);
      }
    } catch (err) {
      setImprovements(FALLBACK_IMPROVEMENTS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationIcon = (rec) => {
    switch (rec) {
      case 'Recommended': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'Optional': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'Not Recommended': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  const getRecommendationColor = (rec) => {
    switch (rec) {
      case 'Recommended': return 'border-emerald-500/50 bg-emerald-500/10';
      case 'Optional': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'Not Recommended': return 'border-red-500/50 bg-red-500/10';
      default: return 'border-zinc-700';
    }
  };

  if (!improvements) {
    return (
      <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">AI Improvements</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Discover where AI can meaningfully enhance this project.
        </p>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 text-sm font-medium tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze AI Opportunities'}
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
        {improvements.improvements?.map((item, i) => (
          <div 
            key={i} 
            className={`border rounded-lg p-4 ${getRecommendationColor(item.recommendation)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-medium text-zinc-200">{item.feature}</h4>
                <p className="text-xs text-zinc-400 mt-1">{item.purpose}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {getRecommendationIcon(item.recommendation)}
                <span className="text-xs font-medium">{item.recommendation}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500">Technology:</span>
                <p className="text-zinc-300 mt-0.5">{item.technology}</p>
              </div>
              <div>
                <span className="text-zinc-500">Complexity:</span>
                <p className="text-zinc-300 mt-0.5">{item.complexity}</p>
              </div>
              <div>
                <span className="text-zinc-500">Required Data:</span>
                <p className="text-zinc-300 mt-0.5">{item.requiredData}</p>
              </div>
              <div>
                <span className="text-zinc-500">Expected Benefit:</span>
                <p className="text-zinc-300 mt-0.5">{item.expectedBenefit}</p>
              </div>
            </div>

            {item.limitations && (
              <div className="mt-3 pt-3 border-t border-zinc-700/50">
                <span className="text-xs text-zinc-500">Limitations:</span>
                <p className="text-xs text-zinc-400 mt-0.5">{item.limitations}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
