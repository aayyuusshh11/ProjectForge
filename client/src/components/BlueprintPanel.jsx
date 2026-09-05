import { useState } from 'react';
import { FileText, Server, Database, Globe, Cpu, ArrowRight } from 'lucide-react';
import { generateBlueprint } from '../services/api';

// Fallback blueprint data
const FALLBACK_BLUEPRINT = {
  systemOverview: 'A modern web application with React frontend, Node.js backend, and MongoDB database. The system follows a client-server architecture with RESTful API communication.',
  components: [
    { name: 'Frontend', description: 'React-based single-page application with responsive UI', technology: 'React + Tailwind CSS' },
    { name: 'Backend API', description: 'Express.js REST API handling business logic', technology: 'Node.js + Express' },
    { name: 'Database', description: 'MongoDB for flexible document storage', technology: 'MongoDB' },
    { name: 'Authentication', description: 'JWT-based user authentication', technology: 'JWT + bcrypt' }
  ],
  frontendArchitecture: 'React with component-based architecture. Uses React Router for navigation, Context API for state management, and Axios for API calls.',
  backendArchitecture: 'Express.js with MVC pattern. Routes, controllers, and services separated. Middleware for auth, validation, and error handling.',
  databaseStructure: 'MongoDB with Mongoose ODM. Collections for users, projects, and sessions. Indexed queries for performance.',
  apis: [
    { name: 'POST /api/auth/register', description: 'User registration', method: 'POST' },
    { name: 'POST /api/auth/login', description: 'User login', method: 'POST' },
    { name: 'GET /api/projects', description: 'List projects', method: 'GET' },
    { name: 'POST /api/projects', description: 'Create project', method: 'POST' }
  ],
  externalServices: ['OpenAI API for AI features', 'Cloudinary for file storage'],
  aiComponents: ['Natural language processing for project analysis', 'Recommendation engine for suggestions'],
  dataFlow: 'Client sends request → Express routes → Controller validates → Service processes → Database stores → Response returns to client'
};

export default function BlueprintPanel({ project }) {
  const [blueprint, setBlueprint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setUsingFallback(false);
      
      const profile = JSON.parse(sessionStorage.getItem('studentProfile') || '{}');
      const response = await generateBlueprint(project, profile);
      
      if (response.success) {
        setBlueprint(response.blueprint);
      } else {
        setBlueprint(FALLBACK_BLUEPRINT);
        setUsingFallback(true);
      }
    } catch (err) {
      setBlueprint(FALLBACK_BLUEPRINT);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  if (!blueprint) {
    return (
      <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-semibold text-zinc-200">Technical Blueprint</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Generate a detailed technical architecture for this project.
        </p>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 text-sm font-medium tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Blueprint'}
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-zinc-800 bg-zinc-800/30 rounded-lg p-6">
      {usingFallback && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 border border-yellow-500/30 bg-yellow-500/10 rounded text-xs text-yellow-300">
          Using demo blueprint - Add OpenAI credits for AI-generated architecture
        </div>
      )}

      {/* System Overview */}
      <div className="mb-6 pb-6 border-b-2 border-zinc-700">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">System Overview</h3>
        <p className="text-sm text-zinc-400">{blueprint.systemOverview}</p>
      </div>

      {/* Components */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
          <Server className="w-4 h-4" />
          Components
        </h3>
        <div className="grid gap-3">
          {blueprint.components?.map((comp, i) => (
            <div key={i} className="p-3 bg-zinc-900/50 rounded border border-zinc-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-zinc-200">{comp.name}</span>
                <span className="text-xs text-emerald-400">{comp.technology}</span>
              </div>
              <p className="text-xs text-zinc-500">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Frontend
          </h3>
          <p className="text-xs text-zinc-400">{blueprint.frontendArchitecture}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
            <Server className="w-4 h-4" />
            Backend
          </h3>
          <p className="text-xs text-zinc-400">{blueprint.backendArchitecture}</p>
        </div>
      </div>

      {/* Database */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
          <Database className="w-4 h-4" />
          Database
        </h3>
        <p className="text-xs text-zinc-400">{blueprint.databaseStructure}</p>
      </div>

      {/* APIs */}
      {blueprint.apis?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-300 mb-3">API Endpoints</h3>
          <div className="space-y-2">
            {blueprint.apis.map((api, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="px-2 py-1 bg-zinc-900 rounded text-emerald-400 font-mono">{api.method}</span>
                <span className="text-zinc-300">{api.name}</span>
                <span className="text-zinc-600 ml-auto">{api.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* External Services */}
      {blueprint.externalServices?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-300 mb-2">External Services</h3>
          <ul className="space-y-1">
            {blueprint.externalServices.map((service, i) => (
              <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-zinc-600" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Components */}
      {blueprint.aiComponents?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            AI Components
          </h3>
          <ul className="space-y-1">
            {blueprint.aiComponents.map((comp, i) => (
              <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                <ArrowRight className="w-3 h-3 text-zinc-600" />
                {comp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Data Flow */}
      <div>
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Data Flow</h3>
        <p className="text-xs text-zinc-400">{blueprint.dataFlow}</p>
      </div>
    </div>
  );
}
