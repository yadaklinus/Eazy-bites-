
import React, { useState } from 'react';
import { ChevronRight, BookOpen, TrendingUp, GraduationCap } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Master Your Exams",
      desc: "Access thousands of JAMB & WAEC questions with detailed explanations and study notes.",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      bgGradient: "from-blue-400 to-cyan-300"
    },
    {
      id: 2,
      title: "Track Your Growth",
      desc: "Visualize your momentum with smart analytics and identify areas that need focus.",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      bgGradient: "from-green-400 to-teal-300"
    },
    {
      id: 3,
      title: "Unlock Scholarships",
      desc: "Get matched with local and international scholarships to fund your education.",
      icon: GraduationCap,
      color: "bg-orange-100 text-orange-600",
      bgGradient: "from-orange-400 to-yellow-300"
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const CurrentIcon = slides[step].icon;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Dynamic Background */}
      <div className={`absolute top-0 left-0 w-full h-[60%] rounded-b-[40px] transition-colors duration-700 ease-in-out bg-gradient-to-br ${slides[step].bgGradient}`}>
        {/* Abstract Shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-12 px-6">
        
        {/* Floating Icon Card */}
        <div className="mb-10 p-6 bg-white rounded-[32px] shadow-xl shadow-gray-200/50 flex items-center justify-center animate-in fade-in zoom-in duration-500 key-{step}">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${slides[step].color} transition-colors duration-500`}>
             <CurrentIcon size={40} />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mb-12 max-w-xs animate-in slide-in-from-bottom-4 duration-500 key-{step}">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">{slides[step].title}</h2>
          <p className="text-gray-500 text-base leading-relaxed">{slides[step].desc}</p>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center justify-between">
          {/* Progress Dots */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === step ? 'w-8 bg-[#1B5E20]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="group flex items-center gap-2 bg-[#1B5E20] text-white pl-6 pr-4 py-3 rounded-full font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-all hover:bg-[#2E7D32]"
          >
            {step === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Skip Button (Top Right) */}
      <button 
        onClick={onComplete}
        className="absolute top-12 right-6 text-white/80 font-bold text-sm hover:text-white z-20"
      >
        Skip
      </button>
    </div>
  );
};
