import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';

interface AuthPageProps {
  onNavigate: (screen: string, transition?: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-accent/30 mb-6"
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.div>
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-text mb-2">
            {isLogin ? 'Welcome back' : 'Join Animi X'}
          </h2>
          <p className="text-brand-muted text-sm font-medium">
            {isLogin 
              ? 'Enter your credentials to access your career cockpit.' 
              : 'Start your journey with a human-centric AI counselor.'}
          </p>
        </div>

        <motion.div 
          layout
          className="bg-brand-bg border border-brand-border rounded-[2.5rem] p-10 shadow-2xl shadow-brand-accent/5"
        >
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate('career_chat'); }}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted block ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <input 
                      type="text" 
                      placeholder="Marcus Chen" 
                      className="w-full bg-bg border border-brand-border rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted block ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-bg border border-brand-border rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-black text-brand-accent uppercase tracking-widest hover:underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-bg border border-brand-border rounded-xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-brand-accent text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-brand-accent/20 hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-border"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-brand-bg px-4 text-brand-muted">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-bg border border-brand-border rounded-xl text-xs font-bold hover:bg-brand-hover transition-colors">
                <Github className="w-4 h-4" /> Github
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-bg border border-brand-border rounded-xl text-xs font-bold hover:bg-brand-hover transition-colors">
                <Chrome className="w-4 h-4" /> Google
              </button>
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm font-medium text-brand-muted">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-brand-accent font-bold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        <p className="mt-12 text-center text-[10px] font-bold text-brand-muted/40 uppercase tracking-widest">
          By continuing, you agree to our <br />
          <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
