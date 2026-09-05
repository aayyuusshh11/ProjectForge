import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const SKILLS_OPTIONS = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'HTML/CSS', 'JavaScript', 'TypeScript',
  'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring Boot',
  'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Go', 'Rust',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'SQLite',
  'Docker', 'AWS', 'Azure', 'GCP', 'Vercel', 'Netlify',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas',
  'React Native', 'Flutter', 'Swift', 'Kotlin',
  'Git', 'CI/CD', 'Testing', 'GraphQL', 'REST APIs'
];

const INTERESTS_OPTIONS = [
  'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Web Development',
  'Mobile Development', 'Cloud Computing', 'Cybersecurity', 'Blockchain',
  'IoT', 'Game Development', 'AR/VR', 'Robotics',
  'Healthcare Tech', 'EdTech', 'FinTech', 'E-Commerce',
  'Social Impact', 'Environment', 'Agriculture', 'Transportation'
];

const DOMAINS = [
  'Healthcare', 'Education', 'Finance', 'E-Commerce', 'Entertainment',
  'Agriculture', 'Transportation', 'Security', 'Social Media', 'Gaming',
  'IoT', 'AI/ML', 'Cybersecurity', 'Blockchain', 'Other'
];

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const DURATION_OPTIONS = [
  '4 weeks', '6 weeks', '8 weeks', '10 weeks', '12 weeks',
  '14 weeks', '16 weeks', '20 weeks', '24 weeks', '6 months'
];

const TECH_OPTIONS = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Express',
  'Python', 'Django', 'FastAPI', 'MongoDB', 'PostgreSQL', 'MySQL',
  'Firebase', 'Redis', 'Docker', 'AWS', 'TensorFlow', 'OpenAI API',
  'GraphQL', 'Socket.io', 'Stripe', 'Tailwind CSS', 'TypeScript'
];

export default function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    skills: [],
    interests: [],
    domain: '',
    experience: '',
    teamSize: 1,
    duration: '',
    technologies: [],
    hardware: false
  });

  const toggleItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('studentProfile', JSON.stringify(form));
    navigate('/projects');
  };

  const isValid = form.skills.length > 0 && form.experience && form.duration;

  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono block mb-4">
            Step 01 / 02
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Your Profile</h1>
          <p className="text-zinc-400 text-sm">
            Select your skills and constraints. We'll generate projects that fit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Skills */}
          <FieldGroup label="Skills" hint="Required - Select multiple">
            <div className="flex flex-wrap gap-2">
              {SKILLS_OPTIONS.map(skill => (
                <OptionButton
                  key={skill}
                  label={skill}
                  selected={form.skills.includes(skill)}
                  onClick={() => toggleItem('skills', skill)}
                />
              ))}
            </div>
          </FieldGroup>

          {/* Interests */}
          <FieldGroup label="Interests" hint="Optional - Select multiple">
            <div className="flex flex-wrap gap-2">
              {INTERESTS_OPTIONS.map(interest => (
                <OptionButton
                  key={interest}
                  label={interest}
                  selected={form.interests.includes(interest)}
                  onClick={() => toggleItem('interests', interest)}
                />
              ))}
            </div>
          </FieldGroup>

          {/* Domain */}
          <FieldGroup label="Preferred Domain" hint="Optional - Select one">
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map(domain => (
                <OptionButton
                  key={domain}
                  label={domain}
                  selected={form.domain === domain}
                  onClick={() => setForm(prev => ({ ...prev, domain: prev.domain === domain ? '' : domain }))}
                  single
                />
              ))}
            </div>
          </FieldGroup>

          {/* Experience */}
          <FieldGroup label="Experience Level" hint="Required">
            <div className="flex gap-3">
              {EXPERIENCE_LEVELS.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, experience: level }))}
                  className={`flex-1 py-3 text-sm font-medium tracking-wide border-2 transition-all duration-200 ${
                    form.experience === level
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                      : 'border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Team Size */}
          <FieldGroup label="Team Size" hint="Required">
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5, 6].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, teamSize: size }))}
                  className={`w-14 h-14 text-lg font-mono border-2 transition-all duration-200 ${
                    form.teamSize === size
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                      : 'border-zinc-700 text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Duration */}
          <FieldGroup label="Available Time" hint="Required - Select one">
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map(duration => (
                <OptionButton
                  key={duration}
                  label={duration}
                  selected={form.duration === duration}
                  onClick={() => setForm(prev => ({ ...prev, duration: prev.duration === duration ? '' : duration }))}
                  single
                />
              ))}
            </div>
          </FieldGroup>

          {/* Technologies */}
          <FieldGroup label="Preferred Technologies" hint="Optional - Select multiple">
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map(tech => (
                <OptionButton
                  key={tech}
                  label={tech}
                  selected={form.technologies.includes(tech)}
                  onClick={() => toggleItem('technologies', tech)}
                />
              ))}
            </div>
          </FieldGroup>

          {/* Hardware */}
          <FieldGroup label="Hardware Availability" hint="Optional">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, hardware: false }))}
                className={`flex-1 py-3 text-sm font-medium tracking-wide border-2 transition-all duration-200 ${
                  !form.hardware
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                    : 'border-zinc-700 text-zinc-300 hover:border-zinc-600'
                }`}
              >
                No Special Hardware
              </button>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, hardware: true }))}
                className={`flex-1 py-3 text-sm font-medium tracking-wide border-2 transition-all duration-200 ${
                  form.hardware
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                    : 'border-zinc-700 text-zinc-300 hover:border-zinc-600'
                }`}
              >
                Have Hardware
              </button>
            </div>
          </FieldGroup>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 flex items-center justify-center gap-3 border-2 transition-all duration-300 font-medium tracking-wider uppercase text-sm ${
              isValid
                ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer'
                : 'border-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            Generate Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function FieldGroup({ label, hint, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <label className="text-sm font-medium text-zinc-200">{label}</label>
        {hint && <span className="text-xs text-zinc-500">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function OptionButton({ label, selected, onClick, single = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border transition-all duration-200 ${
        selected
          ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
          : 'border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
      }`}
    >
      {selected && <Check className="w-3 h-3" />}
      {label}
    </button>
  );
}
