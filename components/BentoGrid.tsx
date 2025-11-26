
import React from 'react';
import { Brain, FlaskConical } from 'lucide-react';
import { ViewState } from '../types';

interface BentoGridProps {
  onNavigate?: (view: ViewState) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-3">
       <h3 className="text-[#1B5E20] text-lg font-semibold px-1">Smart Study Grid</h3>
       
       <div className="grid grid-cols-2 gap-3">
          {/* Slot 1: Daily Workout */}
          <div className="bg-[#4DB6AC] rounded-[24px] p-4 flex flex-col justify-between h-[180px] text-white shadow-md relative overflow-hidden">
             <Brain size={24} className="mb-2" />
             <div>
               <h4 className="font-bold text-lg leading-tight">Daily Workout</h4>
               <p className="text-xs opacity-90 mb-3">20 Mix Questions</p>
               <button 
                 onClick={() => onNavigate?.('cbt')}
                 className="text-xs bg-white/25 hover:bg-white/35 px-3 py-2 rounded-lg font-semibold w-full transition-colors"
               >
                 Start Quiz
               </button>
             </div>
          </div>

          {/* Slot 2: Focus Area */}
          <div className="bg-white rounded-[24px] p-4 flex flex-col justify-center shadow-sm h-[180px]">
             <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
               <FlaskConical size={20} className="text-[#1B5E20]" />
             </div>
             <h4 className="font-bold text-[#1B5E20] leading-tight">Chemistry Focus</h4>
             <p className="text-xs text-[#388E3C] mt-1">Organic Compounds needs work.</p>
          </div>

          {/* Slot 3: Mock Exam */}
          <div className="bg-white rounded-[24px] p-4 shadow-sm flex flex-col justify-center h-[140px]">
             <h4 className="font-bold text-[#1B5E20]">Mock Exam</h4>
             <p className="text-xs text-[#388E3C] mt-1">Next WAEC Sim:<br/>Sat, 10am</p>
          </div>

          {/* Slot 4: Challenge */}
          <div className="bg-[#E8F5E9] rounded-[24px] p-4 shadow-sm flex flex-col justify-center items-center gap-2 h-[140px] text-center border border-[#C8E6C9]">
             <div className="flex -space-x-2">
               <img src="https://picsum.photos/30/30?random=2" className="w-8 h-8 rounded-full border-2 border-white" alt="User 1" />
               <img src="https://picsum.photos/30/30?random=3" className="w-8 h-8 rounded-full border-2 border-white" alt="User 2" />
             </div>
             <h4 className="font-semibold text-[#1B5E20] text-sm leading-tight">Challenge a Friend</h4>
          </div>
       </div>
    </div>
  );
};
