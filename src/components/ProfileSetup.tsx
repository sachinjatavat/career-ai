import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Check, Compass, Brain, Target, Zap, Clock, Calendar, Globe, Briefcase } from 'lucide-react';

interface ProfileSetupProps {
  onNavigate: (screen: string, transition?: string) => void;
}

const steps = [
  {
    id: 1,
    title: "Interest Type",
    subtitle: "What kind of work do you enjoy most?",
    icon: <Brain className="w-6 h-6" />,
    options: ["Logical / Problem-solving", "Creative / Designing", "Communication / People", "Business / Strategy"]
  },
  {
    id: 2,
    title: "Subject Preference",
    subtitle: "Which subjects do you like or are comfortable with?",
    icon: <Compass className="w-6 h-6" />,
    multi: true,
    options: ["Maths", "Programming", "Design", "Business", "Writing"]
  },
  {
    id: 3,
    title: "Current Skills",
    subtitle: "Which skills have you already tried?",
    icon: <Zap className="w-6 h-6" />,
    options: ["C / C++", "Python", "Web Development", "None"]
  },
  {
    id: 4,
    title: "Skill Level",
    subtitle: "What’s your current level?",
    icon: <Target className="w-6 h-6" />,
    options: ["Beginner", "Intermediate", "Advanced"]
  },
  {
    id: 5,
    title: "Career Goal",
    subtitle: "What is your main goal?",
    icon: <Target className="w-6 h-6" />,
    options: ["High salary", "Work abroad", "Passion-based career", "Job stability"]
  },
  {
    id: 6,
    title: "Work Style Preference",
    subtitle: "How do you prefer to work?",
    icon: <Briefcase className="w-6 h-6" />,
    options: ["Job (company)", "Freelancing", "Startup"]
  },
  {
    id: 7,
    title: "Time Commitment",
    subtitle: "How much time can you invest daily?",
    icon: <Clock className="w-6 h-6" />,
    options: ["<1 hour", "1–2 hours", "3–5 hours"]
  },
  {
    id: 8,
    title: "Timeline Expectation",
    subtitle: "In how many months do you want results?",
    icon: <Calendar className="w-6 h-6" />,
    options: ["3 months", "6 months", "12 months"]
  },
  {
    id: 9,
    title: "Location / Target",
    subtitle: "Where do you want to work?",
    icon: <Globe className="w-6 h-6" />,
    options: ["India", "Abroad", "Remote"]
  }
];

export default function ProfileSetup({ onNavigate }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, any>>({});

  const handleSelect = (option: string) => {
    const step = steps[currentStep];
    if (step.multi) {
      const current = answers[step.id] || [];
      const updated = current.includes(option)
        ? current.filter((i: string) => i !== option)
        : [...current, option];
      setAnswers({ ...answers, [step.id]: updated });
    } else {
      setAnswers({ ...answers, [step.id]: option });
      if (currentStep < steps.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNavigate('career_chat', 'push');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('landing', 'push_back');
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-bg text-brand-text font-sans selection:bg-brand-accent/20 selection:text-brand-accent overflow-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-xl flex items-center justify-between px-6 h-16 border-b border-brand-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="text-brand-muted hover:text-brand-accent active:scale-95 transition-all p-1"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-brand-accent font-bold tracking-[0.2em] text-[10px] uppercase">Analysis Engine</h1>
            <span className="text-xs font-bold text-brand-text">Step {currentStep + 1} of {steps.length}</span>
          </div>
        </div>
        <div className="w-32 bg-brand-border h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-6 text-brand-accent shadow-lg shadow-brand-accent/5">
                  {step.icon}
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-brand-text">{step.title}</h2>
                <p className="text-brand-muted font-medium text-lg leading-relaxed">{step.subtitle}</p>
                {step.multi && <p className="text-[10px] font-bold text-brand-accent uppercase mt-2 tracking-widest italic">Multi-select enabled</p>}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {step.options.map((option) => {
                  const isSelected = step.multi 
                    ? (answers[step.id] || []).includes(option)
                    : answers[step.id] === option;
                  
                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleSelect(option)}
                      whileHover={{ scale: 0.95, x: 0 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all relative group overflow-hidden ${
                        isSelected 
                          ? 'bg-brand-accent/5 border-brand-accent shadow-lg shadow-brand-accent/5' 
                          : 'bg-brand-bg border-brand-border hover:border-brand-muted/40 hover:bg-brand-hover shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span className={`font-bold transition-colors ${isSelected ? 'text-brand-accent' : 'text-brand-text'}`}>
                          {option}
                        </span>
                        {isSelected && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center"
                          >
                            <Check className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-accent/5 opacity-40 blur-xl" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {step.multi && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  disabled={!answers[step.id] || answers[step.id].length === 0}
                  onClick={handleNext}
                  className="w-full py-4 bg-brand-accent text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-accent/20 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="p-6 border-t border-brand-border bg-bg/80 backdrop-blur-xl">
        <div className="max-w-lg mx-auto flex gap-4">
          <button 
            disabled={!answers[step.id] || (step.multi && answers[step.id].length === 0)}
            onClick={handleNext}
            className="flex-1 py-4 bg-brand-accent text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-accent/20 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Get Results' : 'Continue'}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
