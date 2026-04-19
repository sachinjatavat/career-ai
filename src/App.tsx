/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LandingPage from './components/LandingPage';
import CareerChat from './components/CareerChat';
import ProfileSetup from './components/ProfileSetup';
import TrendAnalysis from './components/TrendAnalysis';
import AuthPage from './components/AuthPage';

type Screen = 'landing' | 'career_chat' | 'profile_setup' | 'trend_analysis' | 'auth';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [transitionType, setTransitionType] = useState<string>('push');
  const [initialTab, setInitialTab] = useState('dashboard');

  const handleNavigate = (screen: string, type: string = 'push', tab: string = 'dashboard') => {
    setTransitionType(type);
    setInitialTab(tab);
    setCurrentScreen(screen as Screen);
  };

  const getVariants = () => {
    switch (transitionType) {
      case 'push':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 },
        };
      case 'push_back':
        return {
          initial: { x: '-100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0 },
        };
      case 'slide_up':
        return {
          initial: { y: '100%', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '-100%', opacity: 0 },
        };
      case 'none':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const variants = getVariants();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentScreen}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {currentScreen === 'landing' && (
            <LandingPage onNavigate={handleNavigate} />
          )}
          {currentScreen === 'career_chat' && (
            <CareerChat onNavigate={handleNavigate} initialTab={initialTab} />
          )}
          {currentScreen === 'profile_setup' && (
            <ProfileSetup onNavigate={handleNavigate} />
          )}
          {currentScreen === 'trend_analysis' && (
            <TrendAnalysis onNavigate={handleNavigate} />
          )}
          {currentScreen === 'auth' && (
            <AuthPage onNavigate={handleNavigate} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
