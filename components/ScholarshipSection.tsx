import React from 'react';
import { GraduationCap, Globe, ChevronRight } from 'lucide-react';
import { THEME, Scholarship } from '../types';

const scholarships: Scholarship[] = [
  { id: '1', title: 'MTN Foundation', subtitle: 'Deadline: 2 Weeks', iconType: 'grad' },
  { id: '2', title: 'NNPC/Chevron', subtitle: 'Open to Science', iconType: 'globe' },
  { id: '3', title: 'PTDF Scheme', subtitle: 'Undergraduates', iconType: 'grad' },
];

export const ScholarshipSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end px-1">
        <h3 className="text-[#1B5E20] text-lg font-semibold">Scholarships & Grants</h3>
        <button className="text-[#388E3C] text-xs font-semibold flex items-center mb-1">
          See All <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4 -mx-4 px-4">
        {scholarships.map((item) => (
          <div 
            key={item.id}
            className="snap-center min-w-[240px] bg-white rounded-[20px] p-4 border border-[#FDD835] shadow-[0_4px_12px_rgba(27,94,32,0.06)] active:scale-95 transition-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F1F8E9] flex items-center justify-center">
                {item.iconType === 'grad' ? (
                  <GraduationCap size={24} className="text-[#4DB6AC]" />
                ) : (
                  <Globe size={24} className="text-[#81C784]" />
                )}
              </div>
              <span className="text-[10px] font-bold text-[#F9A825] bg-[#FFF9C4] px-2 py-1 rounded-full uppercase tracking-wider">
                Active
              </span>
            </div>
            
            <h4 className="font-bold text-[#1B5E20] text-lg leading-tight mb-1">{item.title}</h4>
            <p className="text-[#388E3C] text-xs font-medium">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};