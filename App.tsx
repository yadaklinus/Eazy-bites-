
import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { HeroCard } from './components/HeroCard';
import { ScholarshipSection } from './components/ScholarshipSection';
import { BentoGrid } from './components/BentoGrid';
import { BottomNav } from './components/BottomNav';
import { ProfileView } from './components/ProfileView';
import { PerformanceView } from './components/PerformanceView';
import { CBTView } from './components/CBTView';
import { SubjectsView } from './components/SubjectsView';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Helper to render main content based on state
  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return <ProfileView />;
      case 'performance':
        return <PerformanceView />;
      case 'subjects':
        return <SubjectsView />;
      case 'home':
      default:
        return (
          <>
            <HeroCard />
            <ScholarshipSection />
            <BentoGrid onNavigate={setCurrentView} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen w-full relative pb-28 selection:bg-green-200">
      {/* CBT Mode Overlay (Full Screen) */}
      {currentView === 'cbt' && <CBTView onExit={() => setCurrentView('home')} />}

      {/* Safe Area Top Spacer for iPhone */}
      <div className="h-12 w-full"></div>

      <TopAppBar />

      <main className="flex flex-col gap-6 px-4 pt-2 pb-24">
        {renderContent()}
      </main>

      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      
      {/* Floating Action Button for CBT if on Home */}
      {currentView === 'home' && (
        <button 
          onClick={() => setCurrentView('cbt')}
          className="fixed bottom-28 right-4 bg-[#1B5E20] text-white p-4 rounded-full shadow-lg z-30 flex items-center justify-center animate-bounce hover:bg-[#2E7D32] transition-colors"
        >
          <span className="font-bold text-xs">GO</span>
        </button>
      )}
    </div>
  );
};

export default App;