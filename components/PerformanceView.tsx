
import React from 'react';

// Reusable Line Chart SVG component
const SimpleLineChart = ({ data, color, filled = false }: { data: number[], color: string, filled?: boolean }) => {
  const max = Math.max(...data) * 1.2; // Add 20% headroom
  const min = 0;
  
  // Create points string
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (val / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  // Create area path for filled effect
  const areaPath = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible preserve-3d">
      <defs>
        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f0f0f0" strokeWidth="0.5" strokeDasharray="2 2" />
      ))}

      {/* Filled Area */}
      {filled && (
        <polygon points={areaPath} fill="url(#chartGradient)" />
      )}

      {/* The Line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
      />

      {/* Data Points */}
      {data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 100;
        return (
          <g key={i} className="group">
             <circle 
              cx={x} 
              cy={y} 
              r="3" 
              fill="white" 
              stroke={color} 
              strokeWidth="2" 
              className="transition-all duration-300 group-hover:r-5"
            />
            {/* Tooltip on hover (simple svg text) */}
            <rect x={x - 10} y={y - 15} width="20" height="10" rx="4" fill={color} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <text x={x} y={y - 8} fontSize="5" textAnchor="middle" fill="white" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity">
              {val}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// Reusable Bar Chart Component
const SubjectBarChart = () => {
  const subjects = [
    { name: 'Math', score: 65, color: '#4DB6AC' },
    { name: 'Phys', score: 78, color: '#81C784' },
    { name: 'Chem', score: 45, color: '#E57373' },
    { name: 'Eng', score: 88, color: '#FFD54F' },
  ];

  return (
    <div className="flex items-end justify-between h-40 gap-4 mt-2 px-2">
      {subjects.map((sub) => (
        <div key={sub.name} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
          <div className="relative w-full flex justify-center h-full items-end bg-gray-50 rounded-t-xl overflow-hidden">
            {/* Bar */}
            <div 
              className="w-full mx-2 rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-90 relative"
              style={{ 
                height: `${sub.score}%`, 
                backgroundColor: sub.color 
              }}
            >
              {/* Shine effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
            </div>

            {/* Float Label */}
             <span className="absolute bottom-2 text-[10px] font-bold text-white drop-shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {sub.score}%
            </span>
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide group-hover:text-gray-800 transition-colors">
            {sub.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export const PerformanceView: React.FC = () => {
  // Mock data for momentum (e.g., hours studied or questions answered)
  const momentumData = [15, 25, 20, 45, 30, 60, 55];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1B5E20]">Performance</h2>
        <p className="text-sm text-[#388E3C] opacity-80">Track your study progress</p>
      </div>

      {/* 1. Study Momentum Chart (Line Chart) */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-green-50/50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-[#1B5E20] text-lg">Study Momentum</h3>
            <p className="text-xs text-gray-400">Activity based on questions solved</p>
          </div>
          <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-3 py-1.5 rounded-full">
            <span>🚀</span>
            <span>High</span>
          </div>
        </div>
        
        <div className="h-48 w-full">
          <SimpleLineChart data={momentumData} color="#4DB6AC" filled={true} />
        </div>
        
        <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* 2. Key Subject Performance (Bar Chart) */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-green-50/50 mb-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#1B5E20] text-lg">Subject Mastery</h3>
          <button className="text-[#4DB6AC] text-xs font-bold bg-teal-50 px-3 py-1 rounded-lg">View All</button>
        </div>
        
        <SubjectBarChart />
        
        <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-3 rounded-xl flex items-center gap-3 border border-red-100">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">!</div>
                <div>
                    <p className="text-xs text-red-400 font-bold uppercase">Focus Needed</p>
                    <p className="text-sm font-bold text-red-700">Chemistry</p>
                </div>
            </div>
             <div className="bg-yellow-50 p-3 rounded-xl flex items-center gap-3 border border-yellow-100">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs">★</div>
                <div>
                    <p className="text-xs text-yellow-600 font-bold uppercase">Best Subject</p>
                    <p className="text-sm font-bold text-yellow-800">English</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};
