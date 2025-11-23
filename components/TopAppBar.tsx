import React from 'react';
import { Bell, Flame } from 'lucide-react';
import { THEME } from '../types';

export const TopAppBar: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-4 py-3 sticky top-0 z-40 bg-[#F1F8E9]/90 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src="https://picsum.photos/100/100?random=1" 
            alt="Dayo" 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
        </div>
        <div>
          <p className="text-xs text-[#388E3C] font-medium">Good Morning,</p>
          <h1 className="text-lg font-bold text-[#1B5E20]">Dayo!</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Streak Chip */}
        <div className="flex items-center gap-1.5 bg-[#E8F5E9] px-3 py-1.5 rounded-2xl border border-green-100 shadow-sm">
          <Flame size={16} fill={THEME.primaryMint} stroke={THEME.primaryMint} />
          <span className="text-xs font-bold text-[#388E3C]">12 Days</span>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-green-100 transition-colors">
          <Bell size={22} color={THEME.textDarkGreen} strokeWidth={2} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
};