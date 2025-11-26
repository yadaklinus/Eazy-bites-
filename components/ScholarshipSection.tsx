
import React, { useState } from 'react';
import { GraduationCap, Globe, ChevronRight, MapPin, ExternalLink, Filter } from 'lucide-react';
import { THEME, Scholarship } from '../types';

// Mock data representing listings from FindAMasters.com
const allScholarships: Scholarship[] = [
  { 
    id: '1', 
    title: 'Chevening Scholarship', 
    subtitle: 'Full Funding + Stipend', 
    country: 'UK', 
    amount: '£18,000', 
    deadline: 'Nov 2024',
    iconType: 'grad',
    url: 'https://www.findamasters.com/scholarships/chevening-scholarships/?i272' 
  },
  { 
    id: '2', 
    title: 'DAAD Scholarship', 
    subtitle: 'Postgraduate Courses', 
    country: 'Germany', 
    amount: '€850/mo', 
    deadline: 'Oct 2024',
    iconType: 'globe',
    url: 'https://www.findamasters.com/scholarships/daad-scholarships/?i268'
  },
  { 
    id: '3', 
    title: 'Fulbright Program', 
    subtitle: 'USA Cultural Exchange', 
    country: 'USA', 
    amount: '$25,000', 
    deadline: 'Varies',
    iconType: 'grad',
    url: 'https://www.findamasters.com/scholarships/'
  },
  { 
    id: '4', 
    title: 'Vanier CGS', 
    subtitle: 'Doctoral Studies', 
    country: 'Canada', 
    amount: '$50,000', 
    deadline: 'Nov 2024',
    iconType: 'globe',
    url: 'https://www.findamasters.com/'
  },
  { 
    id: '5', 
    title: 'MTN Foundation', 
    subtitle: 'Science & Tech', 
    country: 'Nigeria', 
    amount: '₦200k', 
    deadline: 'Aug 2024',
    iconType: 'grad',
    url: '#'
  },
];

const countries = ['All', 'UK', 'USA', 'Canada', 'Germany', 'Nigeria'];

export const ScholarshipSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('All');

  const filteredScholarships = selectedCountry === 'All' 
    ? allScholarships 
    : allScholarships.filter(s => s.country === selectedCountry);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end px-1">
        <div>
          <h3 className="text-[#1B5E20] text-lg font-semibold">Scholarships & Grants</h3>
          <p className="text-xs text-[#388E3C] flex items-center gap-1 opacity-80">
            Powered by <span className="font-bold underline decoration-green-400">FindAMasters.com</span>
          </p>
        </div>
        <button className="text-[#388E3C] text-xs font-semibold flex items-center mb-1 bg-white px-2 py-1 rounded-lg border border-green-100 shadow-sm">
          More <ChevronRight size={14} />
        </button>
      </div>

      {/* Country Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-1 pb-2">
        {countries.map(country => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
              selectedCountry === country
                ? 'bg-[#4DB6AC] text-white border-[#4DB6AC] shadow-md shadow-teal-500/20'
                : 'bg-white text-[#388E3C] border-green-100 hover:border-green-300'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Scholarship Cards */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4 -mx-4 px-4">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((item) => (
            <div 
              key={item.id}
              className="snap-center min-w-[260px] max-w-[260px] bg-white rounded-[24px] p-5 border border-[#FDD835]/50 shadow-[0_4px_12px_rgba(27,94,32,0.06)] active:scale-95 transition-transform flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.country === 'Nigeria' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    {item.iconType === 'grad' ? (
                      <GraduationCap size={24} className={item.country === 'Nigeria' ? 'text-green-600' : 'text-blue-500'} />
                    ) : (
                      <Globe size={24} className={item.country === 'Nigeria' ? 'text-green-600' : 'text-blue-500'} />
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-[#1B5E20] bg-[#F1F8E9] px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-100">
                      <MapPin size={8} /> {item.country}
                    </span>
                    {item.deadline && (
                      <span className="text-[10px] text-red-400 font-medium">
                        Due: {item.deadline}
                      </span>
                    )}
                  </div>
                </div>
                
                <h4 className="font-bold text-[#1B5E20] text-lg leading-tight mb-1 truncate">{item.title}</h4>
                <p className="text-[#388E3C] text-xs font-medium mb-3">{item.subtitle}</p>
                
                {item.amount && (
                  <div className="inline-block bg-[#FFF9C4] text-[#F9A825] px-2 py-1 rounded-md text-xs font-bold mb-4">
                    Value: {item.amount}
                  </div>
                )}
              </div>

              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#1B5E20] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2E7D32] transition-colors"
              >
                Apply Now <ExternalLink size={12} />
              </a>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-8 text-center bg-white/50 rounded-2xl border border-dashed border-green-200 mx-4">
            <Filter size={24} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-500 font-medium">No scholarships found for {selectedCountry}.</p>
          </div>
        )}
      </div>
    </div>
  );
};
