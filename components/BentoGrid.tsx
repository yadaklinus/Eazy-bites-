import React from 'react';
import { Brain, FlaskConical, CalendarClock, Swords } from 'lucide-react';
import { THEME } from '../types';

export const BentoGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
       <h3 className="text-[#1B5E20] text-lg font-semibold px-1">Smart Study Grid</h3>
       
       <div className="grid grid-cols-2 gap-3 auto-rows-fr">
          
          {/* Item 1: Daily Workout (Large Action Card) */}
          <div className="col-span-1 row-span-2 bg-[#4DB6AC] rounded-[24px] p-5 flex flex-col justify-between min-h-[220px] shadow-sm text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain size={80} />
            </div>
            
            <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Brain size={20} className="text-white" />
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-bold leading-none mb-2">Daily Workout</h4>
              <p className="text-sm text-green-50 mb-4 opacity-90">20 Mix JAMB Questions</p>
              
              <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-semibold transition-colors border border-white/10">
                Start Quiz
              </button>
            </div>
          </div>

          {/* Item 2: Focus Area */}
          <div className="col-span-1 bg-white rounded-[24px] p-4 shadow-[0_4px_12px_rgba(27,94,32,0.05)] border border-green-50 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical size={18} className="text-[#4DB6AC]" />
              <span className="text-[10px] uppercase font-bold text-[#81C784]">Weak Point</span>
            </div>
            <h4 className="text-[#1B5E20] font-bold text-base leading-tight">Chemistry</h4>
            <p className="text-[#388E3C] text-[11px] mt-1 leading-snug">Organic Compounds needs attention.</p>
          </div>

          {/* Item 3: Mock Exam */}
          <div className="col-span-1 bg-white rounded-[24px] p-4 shadow-[0_4px_12px_rgba(27,94,32,0.05)] border border-green-50 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-2">
              <CalendarClock size={18} className="text-[#FDD835]" />
              <span className="text-[10px] uppercase font-bold text-[#FDD835]">Upcoming</span>
            </div>
            <h4 className="text-[#1B5E20] font-bold text-base leading-tight">WAEC Sim</h4>
            <p className="text-[#388E3C] text-[11px] mt-1 leading-snug">Saturday, 10:00 AM</p>
          </div>

          {/* Item 4: Challenge (Full Width at bottom if we wanted, but sticking to grid for now) */}
          {/* Actually the JSON implies a 2x2. Let's make the Challenge Card span 2 cols to fill space or keep it symmetrical?
              JSON said: 2 / 2 / 3 / 3 for Challenge. So it's bottom right.
              My layout: Col 1 Row 1+2 (Daily Workout). Col 2 Row 1 (Focus). Col 2 Row 2 (Mock).
              Wait, that's 3 items. The JSON has 4 items.
              Item 1: 1/1/2/2 (Top Left)
              Item 2: 1/2/2/3 (Top Right)
              Item 3: 2/1/3/2 (Bottom Left)
              Item 4: 2/2/3/3 (Bottom Right)
              
              Ah, okay. So it is a standard 4-cell grid. My "Daily Workout" row-span-2 was an artistic liberty.
              I will revert to standard 2x2 to match JSON strictly, but style "Daily Workout" to look dominant.
          */}
       </div>
       
       {/* Let's redo the grid structure to strictly match the visual description of "LargeActionCard" usually implying prominence, but fitting the 2x2 slots. */}
       <div className="grid grid-cols-2 gap-3">
          {/* Slot 1: Daily Workout */}
          <div className="bg-[#4DB6AC] rounded-[24px] p-4 flex flex-col justify-between h-[180px] text-white shadow-md relative overflow-hidden">
             <Brain size={24} className="mb-2" />
             <div>
               <h4 className="font-bold text-lg leading-tight">Daily Workout</h4>
               <p className="text-xs opacity-90 mb-3">20 Mix Questions</p>
               <button className="text-xs bg-white/25 px-3 py-2 rounded-lg font-semibold w-full">Start</button>
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
               <img src="https://picsum.photos/30/30?random=2" className="w-8 h-8 rounded-full border-2 border-white" />
               <img src="https://picsum.photos/30/30?random=3" className="w-8 h-8 rounded-full border-2 border-white" />
             </div>
             <h4 className="font-semibold text-[#1B5E20] text-sm leading-tight">Challenge a Friend</h4>
          </div>
       </div>
    </div>
  );
};