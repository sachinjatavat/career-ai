import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Compass, Sparkles, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (screen: string, transition?: string, tab?: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-bg text-brand-text font-sans selection:bg-brand-accent/20 selection:text-brand-accent">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-xl border-b border-brand-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center shadow-lg shadow-brand-accent/20">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-text">Animi X</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <a href="#" className="hover:text-brand-text transition-colors">Discover</a>
          <button 
            onClick={() => onNavigate('career_chat', 'push', 'skill-lab')}
            className="hover:text-brand-text transition-colors"
          >
            Library
          </button>
          <button 
            onClick={() => onNavigate('auth')}
            className="hover:text-brand-text transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            Log In
          </button>
        </nav>
        <button 
          onClick={() => onNavigate('auth')}
          className="bg-brand-accent text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-brand-accent/20 active:scale-95 transition-all"
        >
          Sign Up
        </button>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-accent/10 text-brand-accent px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-brand-accent/20"
        >
          Human-Centric AI Coaching
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text leading-[1.1] mb-8"
        >
          Your career journey,<br />
          <span className="text-brand-accent">mapped with precision.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-brand-muted max-w-2xl mb-12 font-medium"
        >
          Move beyond rigid algorithms. Experience Animi X, an AI-powered counselor designed to illuminate your unique professional DNA.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => onNavigate('profile_setup')}
            className="bg-brand-accent text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl shadow-brand-accent/20 hover:scale-105 active:scale-95 transition-all"
          >
            Get Career Insights
          </button>
          <button 
            onClick={() => onNavigate('trend_analysis')}
            className="bg-brand-bg text-brand-text px-8 py-4 rounded-lg text-lg font-bold border border-brand-border hover:bg-brand-hover active:scale-95 transition-all"
          >
            View Sample Path
          </button>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 w-full max-w-5xl relative"
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[16/9] border border-brand-border">
            <img 
              src="https://picsum.photos/seed/workspace/1920/1080" 
              alt="Workspace" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* AI Analysis Overlay */}
            <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[400px] glass-card bg-bg/80 backdrop-blur-xl p-6 rounded-2xl border border-brand-border shadow-2xl">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-brand-accent w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-wider mb-1">AI Counselor Analysis</h4>
                  <p className="text-xs text-brand-muted leading-relaxed font-medium">
                    "Based on your interest in creative strategy and data, a pivot to Product Marketing seems like a natural, high-growth path for your skill set."
                  </p>
                  <div className="flex -space-x-2 mt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-bg bg-brand-bg flex items-center justify-center text-[8px] font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-bg bg-brand-accent text-white flex items-center justify-center text-[8px] font-bold">+4k</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Why Animi X Section */}
      <section className="py-24 px-6 border-t border-brand-border bg-brand-hover/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter">Why Animi X?</h2>
          <p className="text-brand-muted font-medium">We've replaced cold metrics with live insights to help you find a career that truly resonates.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-brand-bg p-10 rounded-2xl border border-brand-border hover:bg-brand-hover transition-colors shadow-lg">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-8">
              <Compass className="text-brand-accent w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Adaptive Career Paths</h3>
            <p className="text-brand-muted mb-8 leading-relaxed text-sm">
              Traditional tests are static. Our AI learns as you explore, refining your path in real-time based on your evolving interests and marketplace shifts.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-bg rounded-lg text-[10px] font-bold uppercase tracking-wider text-brand-muted border border-brand-border">Skill Gap Analysis</span>
              <span className="px-3 py-1.5 bg-bg rounded-lg text-[10px] font-bold uppercase tracking-wider text-brand-muted border border-brand-border">Market Forecasting</span>
            </div>
          </div>

          {/* Card 2 - Featured */}
          <div className="bg-brand-accent p-10 rounded-2xl text-white shadow-xl shadow-brand-accent/20 transform md:-translate-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">The AI Counselor</h3>
            <p className="text-white/80 mb-8 leading-relaxed text-sm">
              Not just a chatbot. A dedicated advisor that understands tone, intent, and soft skills to provide meaningful career dialogue.
            </p>
            <button className="flex items-center gap-2 font-bold group text-sm">
              Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-brand-bg p-10 rounded-2xl border border-brand-border hover:bg-brand-hover transition-colors shadow-lg">
            <div className="w-12 h-12 bg-bg rounded-xl flex items-center justify-center mb-8 border border-brand-border">
              <BookOpen className="text-brand-accent w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-brand-text mb-4">Skill Lab</h3>
            <p className="text-brand-muted mb-8 leading-relaxed text-sm">
              Interactive challenges to validate your hidden talents. Cross-referenced with real-world success data.
            </p>
            <div className="h-2 w-full bg-bg rounded-full overflow-hidden border border-brand-border">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '86%' }}
                className="h-full bg-brand-accent"
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Growth Score</span>
              <span className="text-[10px] font-bold text-brand-accent">86%</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto bg-brand-bg rounded-[2.5rem] p-12 md:p-20 text-center relative z-10 border border-brand-border shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter">Ready to find your focus?</h2>
          <p className="text-brand-muted mb-10 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            Join 10,000+ career shifters who found their clarity and their next big opportunity with Animi X.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full md:w-80 px-8 py-4 rounded-lg bg-bg border border-brand-border focus:ring-2 focus:ring-brand-accent/20 text-lg shadow-sm placeholder:text-brand-muted/50"
            />
            <button 
              onClick={() => onNavigate('profile_setup')}
              className="bg-brand-accent text-white px-10 py-4 rounded-lg text-lg font-bold hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
            >
              Start Now
            </button>
          </div>
          <p className="text-[10px] font-bold text-brand-muted/40 mt-6 uppercase tracking-widest">
            No credit card required. Free basic analysis included.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-border bg-bg/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-brand-accent rounded flex items-center justify-center shadow-lg shadow-brand-accent/20">
                <Sparkles className="text-white w-3 h-3" />
              </div>
              <span className="text-lg font-bold text-brand-accent">Animi X</span>
            </div>
            <p className="text-[10px] font-bold text-brand-muted/40 uppercase tracking-widest">
              © 2026 Animi X. A Human-First Career Platform.
            </p>
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-brand-muted uppercase tracking-widest">
            <a href="#" className="hover:text-brand-text">Privacy Policy</a>
            <a href="#" className="hover:text-brand-text">Terms of Service</a>
            <a href="#" className="hover:text-brand-text">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
