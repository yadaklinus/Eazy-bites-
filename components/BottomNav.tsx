
import React from 'react';
import { Home, BookOpen, GraduationCap, LineChart, User } from 'lucide-react';
import { NavItem, ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems: NavItem[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'subjects', icon: BookOpen, label: 'Subjects' },
    { id: 'scholarships', icon: GraduationCap, label: 'Grants', isSpecial: true },
    { id: 'performance', icon: LineChart, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 h-[72px] rounded-[36px] bg-white/80 backdrop-blur-xl border-t border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex justify-around items-center px-2 z-50">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              item.isSpecial ? '-translate-y-4' : ''
            }`}
          >
            <div className={`
              flex items-center justify-center rounded-full transition-all duration-300
              ${item.isSpecial 
                ? 'w-14 h-14 bg-[#4DB6AC] shadow-lg shadow-teal-500/30 border-4 border-[#F1F8E9]' 
                : 'w-10 h-10'
              }
              ${!item.isSpecial && isActive ? 'bg-green-100' : ''}
            `}>
              <Icon 
                size={item.isSpecial ? 24 : 22} 
                className={`transition-colors duration-300 ${
                  item.isSpecial 
                    ? 'text-white' 
                    : isActive 
                      ? 'text-[#1B5E20] fill-[#1B5E20]' 
                      : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            {!item.isSpecial && isActive && (
              <span className="absolute -bottom-2 w-1 h-1 bg-[#1B5E20] rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
