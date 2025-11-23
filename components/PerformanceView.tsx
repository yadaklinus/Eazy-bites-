
import React from 'react';

// A simple reusable Line Chart SVG component
const SimpleLineChart = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (val / max) * 80; // keep some padding top
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(y => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f0f0f0" strokeWidth="0.5" />
      ))}
      {/* The Line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-md"
      />
      {/* Points */}
      {data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 80;
        return (
          <circle key={i} cx={x} cy={y} r="4" fill="white" stroke={color} strokeWidth="2" />
        );
      })}
    </svg>
  );
};

// A simple Bar Chart
const SimpleBarChart = () => {
  const subjects = [
    { name: 'Eng', score: 85 },
    { name: 'Math', score: 62 },
    { name: 'Phy', score: 78 },
    { name: 'Che', score: 45 },
  ];

  return (
    <div className="flex items-end justify-between h-32 gap-2 mt-4">
      {subjects.map((sub) => (
        <div key={sub.name} className="flex flex-col items-center gap-2 w-full group">
          <div className="relative w-full flex justify-center h-full items-end">
            <div 
              className={`w-full max-w-[24px] rounded-t-lg transition-all duration-500 ${sub.score < 50 ? 'bg-red-400' : 'bg-[#4DB6AC]'}`}
              style={{ height: `${sub.score}%` }}
            ></div>
             <span className="absolute -top-6 text-[10px] font-bold bg-gray-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {sub.score}%
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-500">{sub.name}</span>
        </div>
      ))}
    </div>
  );
};

export const PerformanceView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-[#1B5E20]">Performance Analysis</h2>
        <p className="text-sm text-[#388E3C]">Weekly mock test insights</p>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-green-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-[#1B5E20]">Average Score Trend</h3>
          <span className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-2 py-1 rounded-lg">+12%</span>
        </div>
        <div className="h-40 w-full">
          <SimpleLineChart data={[45, 52, 49, 62, 68, 75, 72]} color="#4DB6AC" />
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium px-1">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Subject Weakness Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Strength Card */}
        <div className="bg-[#F1F8E9] p-5 rounded-[24px] border border-green-100">
          <h4 className="text-[#1B5E20] font-bold text-sm mb-1">Strongest</h4>
          <p className="text-2xl font-bold text-[#2E7D32]">English</p>
          <p className="text-xs text-[#388E3C] mt-1">92% Average</p>
        </div>

        {/* Weakness Card */}
        <div className="bg-red-50 p-5 rounded-[24px] border border-red-100">
          <h4 className="text-red-900 font-bold text-sm mb-1">Weakest</h4>
          <p className="text-2xl font-bold text-red-500">Chem</p>
          <p className="text-xs text-red-400 mt-1">45% Average</p>
        </div>
      </div>

      {/* Subject Breakdown Bar Chart */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-green-50 mb-6">
        <h3 className="font-bold text-[#1B5E20]">Subject Mastery</h3>
        <SimpleBarChart />
      </div>

    </div>
  );
};
