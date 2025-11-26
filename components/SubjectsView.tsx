
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calculator, BookOpen, Atom, FlaskConical, ArrowLeft, RefreshCw } from 'lucide-react';
import { Flashcard } from '../types';

// Mock Data for Flashcards
const SUBJECT_DATA: Record<string, { name: string; color: string; icon: any; cards: Flashcard[] }> = {
  Mathematics: {
    name: 'Mathematics',
    color: 'from-blue-400 to-blue-600',
    icon: Calculator,
    cards: [
      { id: 1, question: "What is the formula for the area of a circle?", answer: "A = πr²" },
      { id: 2, question: "What is the value of Sin(30°)?", answer: "0.5 or 1/2" },
      { id: 3, question: "Differentiate y = x²", answer: "dy/dx = 2x" },
      { id: 4, question: "What is the sum of angles in a triangle?", answer: "180 degrees" },
      { id: 5, question: "Solve for x: 2x = 10", answer: "x = 5" },
    ]
  },
  English: {
    name: 'English',
    color: 'from-purple-400 to-purple-600',
    icon: BookOpen,
    cards: [
      { id: 1, question: "What is a synonym for 'Happy'?", answer: "Joyful, Elated, Cheerful" },
      { id: 2, question: "Identify the verb: 'He runs fast'.", answer: "Runs" },
      { id: 3, question: "What figure of speech is 'Time flies'?", answer: "Metaphor" },
      { id: 4, question: "What is the past tense of 'Go'?", answer: "Went" },
      { id: 5, question: "Define 'Oxymoron'.", answer: "A figure of speech where contradictory terms appear in conjunction (e.g., falsely true)." },
    ]
  },
  Physics: {
    name: 'Physics',
    color: 'from-orange-400 to-orange-600',
    icon: Atom,
    cards: [
      { id: 1, question: "What is Newton's First Law?", answer: "An object remains at rest or in uniform motion unless acted upon by a force." },
      { id: 2, question: "What is the unit of Force?", answer: "Newton (N)" },
      { id: 3, question: "Formula for Kinetic Energy?", answer: "K.E. = ½mv²" },
      { id: 4, question: "What is the speed of light?", answer: "3 × 10⁸ m/s" },
      { id: 5, question: "Define Velocity.", answer: "Rate of change of displacement with time." },
    ]
  },
  Chemistry: {
    name: 'Chemistry',
    color: 'from-red-400 to-red-600',
    icon: FlaskConical,
    cards: [
      { id: 1, question: "What is the chemical symbol for Gold?", answer: "Au" },
      { id: 2, question: "What is the pH of pure water?", answer: "7 (Neutral)" },
      { id: 3, question: "Define Isomers.", answer: "Compounds with the same molecular formula but different structural formulas." },
      { id: 4, question: "What gas is produced when acid reacts with metal?", answer: "Hydrogen gas" },
      { id: 5, question: "Atomic number of Carbon?", answer: "6" },
    ]
  }
};

export const SubjectsView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubjectClick = (subjectKey: string) => {
    setSelectedSubject(subjectKey);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSubject && currentCardIndex < SUBJECT_DATA[selectedSubject].cards.length - 1) {
      setIsFlipped(false); // Reset flip
      setTimeout(() => setCurrentCardIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentCardIndex > 0) {
      setIsFlipped(false); // Reset flip
      setTimeout(() => setCurrentCardIndex(prev => prev - 1), 150);
    }
  };

  // Main Subject Selection View
  if (!selectedSubject) {
    return (
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-2xl font-bold text-[#1B5E20]">Study Flashcards</h2>
          <p className="text-sm text-[#388E3C] opacity-80">Select a subject to start revising</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(SUBJECT_DATA).map(([key, data]) => {
            const Icon = data.icon;
            return (
              <button
                key={key}
                onClick={() => handleSubjectClick(key)}
                className="relative h-40 rounded-[24px] overflow-hidden shadow-sm group active:scale-95 transition-all duration-200"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-90 transition-opacity group-hover:opacity-100`}></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                
                {/* Decorative Circles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4 gap-3">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md shadow-inner">
                    <Icon size={32} />
                  </div>
                  <span className="font-bold text-lg tracking-wide">{data.name}</span>
                  <span className="text-xs bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {data.cards.length} Cards
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const currentSubject = SUBJECT_DATA[selectedSubject];
  const currentCard = currentSubject.cards[currentCardIndex];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setSelectedSubject(null)}
          className="p-2 rounded-full bg-white text-[#1B5E20] hover:bg-green-50 shadow-sm transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
           <h2 className="text-xl font-bold text-[#1B5E20]">{currentSubject.name}</h2>
           <p className="text-xs text-[#388E3C]">Flashcard Review</p>
        </div>
      </div>

      {/* Navigation Controls (ABOVE CARD) */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-green-50 mb-6 mx-2">
        <button
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
          className="flex items-center gap-1 text-gray-600 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} /> Prev
        </button>

        <span className="font-bold text-[#1B5E20] bg-green-50 px-4 py-1.5 rounded-full text-sm">
          {currentCardIndex + 1} / {currentSubject.cards.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentCardIndex === currentSubject.cards.length - 1}
          className="flex items-center gap-1 text-[#1B5E20] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>

      {/* The Flip Card */}
      <div className="flex-1 flex justify-center items-start pt-4 perspective-[1000px] px-2 min-h-[400px]">
        <div 
          className="relative w-full max-w-sm h-80 transition-transform duration-700 transform-style-3d cursor-pointer"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Face (Question) */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 flex flex-col items-center justify-between backface-hidden border-2 border-green-50"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentSubject.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
              <currentSubject.icon size={24} />
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-xl font-bold text-[#1B5E20] leading-relaxed">
                {currentCard.question}
              </h3>
            </div>

            <p className="text-xs text-gray-400 font-medium flex items-center gap-2 mt-4 animate-pulse">
              <RefreshCw size={12} /> Tap to flip
            </p>
          </div>

          {/* Back Face (Answer) */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-[32px] shadow-[0_10px_30px_rgba(27,94,32,0.2)] p-8 flex flex-col items-center justify-center text-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)' 
            }}
          >
            <div className="bg-white/20 p-3 rounded-full mb-4 backdrop-blur-md">
              <CheckCircle size={32} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white leading-relaxed">
              {currentCard.answer}
            </h3>

             <p className="text-xs text-white/60 font-medium flex items-center gap-2 mt-8">
              Tap to see question
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper component for back face
const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);
