
import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Question } from '../types';

export const CBTView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  // Mock Questions
  const questions: Question[] = [
    {
      id: 1,
      text: "Which of the following elements is a Transition Metal?",
      options: ["Calcium", "Iron", "Sodium", "Potassium"],
      correctOption: 1
    },
    {
      id: 2,
      text: "In Economics, 'Demand' refers to...",
      options: ["Wants", "Needs backed by ability to pay", "Market supply", "Production cost"],
      correctOption: 1
    },
    {
      id: 3,
      text: "Solve for x: 2x + 5 = 15",
      options: ["2", "5", "10", "4"],
      correctOption: 1
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 bg-[#F1F8E9] z-50 flex flex-col safe-area-inset">
      {/* Header */}
      <div className="px-4 py-4 bg-white shadow-sm flex justify-between items-center">
        <button onClick={onExit} className="text-[#1B5E20] font-semibold text-sm">Cancel</button>
        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
          <Clock size={16} className="text-red-500" />
          <span className="text-red-600 font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
        <button className="text-[#4DB6AC] font-semibold text-sm">Submit</button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1.5">
        <div 
          className="bg-[#4DB6AC] h-1.5 transition-all duration-300" 
          style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span>Question {currentQIndex + 1} of {questions.length}</span>
          <span>Chemistry</span>
        </div>

        <h2 className="text-xl font-bold text-[#1B5E20] leading-relaxed">
          {questions[currentQIndex].text}
        </h2>

        <div className="flex flex-col gap-3 mt-2">
          {questions[currentQIndex].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center ${
                selectedOption === idx 
                  ? 'border-[#4DB6AC] bg-[#E0F2F1]' 
                  : 'border-transparent bg-white shadow-sm hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${selectedOption === idx ? 'text-[#00695C]' : 'text-gray-700'}`}>
                {String.fromCharCode(65 + idx)}. {opt}
              </span>
              {selectedOption === idx && <CheckCircle2 size={20} className="text-[#4DB6AC]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="bg-white p-4 flex justify-between items-center border-t border-gray-100">
        <button 
          disabled={currentQIndex === 0}
          onClick={() => setCurrentQIndex(p => p - 1)}
          className="flex items-center gap-1 text-gray-500 disabled:opacity-30 font-medium"
        >
          <ChevronLeft size={20} /> Prev
        </button>

        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${i === currentQIndex ? 'bg-[#4DB6AC]' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>

        <button 
          disabled={currentQIndex === questions.length - 1}
          onClick={() => setCurrentQIndex(p => p + 1)}
          className="flex items-center gap-1 text-[#1B5E20] disabled:opacity-30 font-bold"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
