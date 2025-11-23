import React from 'react';
import { TrendingUp } from 'lucide-react';

export const HeroCard: React.FC = () => {
  return (
    <div className="relative w-full h-[180px] bg-[#81C784] rounded-[24px] overflow-hidden shadow-[0_8px_20px_rgba(27,94,32,0.15)] group transition-transform active:scale-[0.98]">
      
      {/* Abstract Background Animation */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M0,100 C100,160 200,40 400,100 L400,180 L0,180 Z" 
            fill="#4DB6AC" 
            className="animate-[pulse_4s_ease-in-out_infinite]"
          />
          <path 
            d="M0,120 C150,180 250,80 400,140 L400,180 L0,180 Z" 
            fill="#2E7D32" 
            className="animate-[pulse_5s_ease-in-out_infinite_reverse]" 
            fillOpacity="0.5"
          />
        </svg>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute top-20 -left-10 w-32 h-32 bg-[#1B5E20]/10 rounded-full blur-2xl"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full z-10">
        <div className="flex items-center gap-2 mb-3 opacity-90">
          <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
            <TrendingUp size={18} className="text-white" />
          </div>
          <span className="text-white text-sm font-medium tracking-wide uppercase">Weekly Insight</span>
        </div>
        
        <h2 className="text-white text-[22px] font-bold leading-tight drop-shadow-sm">
          Your Study Momentum is <span className="text-[#FFF176]">up 15%</span> this week! Keep pushing.
        </h2>
      </div>
    </div>
  );
};