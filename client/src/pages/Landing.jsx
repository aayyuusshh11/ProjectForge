import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Clock, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-16">
      {/* Hero Section */}
      <section className="relative px-6 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono">
              AI-Powered Project Mentor
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight mb-8">
            <span className="text-white">Stop</span>
            <br />
            <span className="text-zinc-500">guessing.</span>
            <br />
            <span className="text-emerald-400">Start building.</span>
          </h1>

          <p className="max-w-xl text-zinc-400 text-lg leading-relaxed mb-10">
            Transform your skills, interests, and constraints into a practical, 
            development-ready final-year project. No generic ideas. No fluff.
          </p>

          <Link
            to="/profile"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-zinc-700 hover:border-emerald-500 transition-all duration-300"
          >
            <span className="text-sm tracking-widest uppercase text-zinc-200 group-hover:text-emerald-400 transition-colors duration-300">
              Begin your project
            </span>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        {/* Decorative grid line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent" />
      </section>

      {/* How it works */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono block mb-12">
            The Process
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard 
              number="01"
              icon={<Zap className="w-5 h-5" />}
              title="Input Your Profile"
              description="Skills, interests, team size, timeline, constraints."
            />
            <StepCard 
              number="02"
              icon={<Target className="w-5 h-5" />}
              title="Get Project Ideas"
              description="AI generates projects matched to your exact situation."
            />
            <StepCard 
              number="03"
              icon={<Clock className="w-5 h-5" />}
              title="Evaluate & Plan"
              description="Feasibility scores, blueprints, and development phases."
            />
            <StepCard 
              number="04"
              icon={<Users className="w-5 h-5" />}
              title="Build Confidently"
              description="Know exactly what to build and how to build it."
            />
          </div>
        </div>
      </section>

      {/* Bottom section */}
      <section className="px-6 py-20 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              From uncertainty<br />to actionable plan.
            </h2>
            <p className="text-zinc-400 max-w-md">
              IdeateX evaluates feasibility, suggests tech stacks, 
              identifies AI opportunities, and checks for similar projects.
            </p>
          </div>
          
          <div className="space-y-6 text-right">
            <Stat value="3-5" label="project suggestions" />
            <Stat value="8+" label="evaluation criteria" />
            <Stat value="9" label="development phases" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="text-xs text-zinc-500 tracking-wider uppercase">IdeateX</span>
          <span className="text-xs text-zinc-600">AI-Powered Project Mentor</span>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ number, icon, title, description }) {
  return (
    <div className="group border border-zinc-800 p-6 hover:border-zinc-700 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-mono text-zinc-500">{number}</span>
        <div className="text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-base font-medium text-zinc-200 mb-2 tracking-wide">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-5xl font-bold text-white tracking-tighter">{value}</div>
      <div className="text-xs text-zinc-500 tracking-wider uppercase mt-1">{label}</div>
    </div>
  );
}
