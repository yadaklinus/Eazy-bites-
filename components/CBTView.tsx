
import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle, Home } from 'lucide-react';
import { Question } from '../types';

export const CBTView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showScoreModal, setShowScoreModal] = useState(false);

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
    },
    {
      id: 4,
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctOption: 1
    },
    {
      id: 5,
      text: "The process by which plants manufacture food is called?",
      options: ["Respiration", "Transpiration", "Photosynthesis", "Digestion"],
      correctOption: 2
    }
  ];

  // Timer Logic
  useEffect(() => {
    if (isSubmitted) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQIndex]: optionIdx
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowScoreModal(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctOption) {
        score++;
      }
    });
    return score;
  };

  const getOptionStyle = (qIndex: number, optIdx: number) => {
    const userSelected = answers[qIndex] === optIdx;
    const isCorrect = questions[qIndex].correctOption === optIdx;

    // Default style (Not submitted)
    if (!isSubmitted) {
      if (userSelected) return 'border-[#4DB6AC] bg-[#E0F2F1] shadow-md ring-1 ring-[#4DB6AC]';
      return 'border-transparent bg-white shadow-sm hover:bg-gray-50';
    }

    // Submitted State Styles
    if (isCorrect) {
      return 'border-green-500 bg-green-50 ring-1 ring-green-500'; // Always highlight correct answer green
    }
    if (userSelected && !isCorrect) {
      return 'border-red-500 bg-red-50 ring-1 ring-red-500'; // Highlight wrong selection red
    }
    return 'border-transparent bg-white opacity-50'; // Dim other options
  };

  const renderOptionIcon = (qIndex: number, optIdx: number) => {
    const userSelected = answers[qIndex] === optIdx;
    const isCorrect = questions[qIndex].correctOption === optIdx;

    if (!isSubmitted) {
      return userSelected ? <CheckCircle2 size={20} className="text-[#4DB6AC]" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-200" />;
    }

    if (isCorrect) return <CheckCircle2 size={20} className="text-green-600" />;
    if (userSelected && !isCorrect) return <XCircle size={20} className="text-red-500" />;
    return <div className="w-5 h-5" />; // Empty placeholder
  };

  return (
    <div className="fixed inset-0 bg-[#F1F8E9] z-50 flex flex-col safe-area-inset animate-in fade-in duration-300">
      {/* Header */}
      <div className="px-4 py-4 bg-white shadow-sm flex justify-between items-center z-10">
        <button onClick={onExit} className="text-[#1B5E20] font-semibold text-sm hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">
          {isSubmitted ? 'Close' : 'Cancel'}
        </button>
        
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${timeLeft < 60 && !isSubmitted ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-green-50 border-green-200'}`}>
          <Clock size={16} className={timeLeft < 60 && !isSubmitted ? 'text-red-500' : 'text-[#2E7D32]'} />
          <span className={`font-mono font-bold ${timeLeft < 60 && !isSubmitted ? 'text-red-600' : 'text-[#2E7D32]'}`}>
            {isSubmitted ? 'Finished' : formatTime(timeLeft)}
          </span>
        </div>
        
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            className="text-white bg-[#4DB6AC] hover:bg-[#26A69A] px-4 py-1.5 rounded-full font-semibold text-sm shadow-sm transition-all active:scale-95"
          >
            Submit
          </button>
        ) : (
          <button onClick={() => setShowScoreModal(true)} className="text-[#4DB6AC] font-semibold text-sm">
            Results
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1.5">
        <div 
          className="bg-[#4DB6AC] h-1.5 transition-all duration-300 ease-out" 
          style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 pb-24">
        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span>Question {currentQIndex + 1} of {questions.length}</span>
          <span className="text-[#4DB6AC]">Chemistry</span>
        </div>

        <div className="animate-in slide-in-from-right-4 duration-300 key-{currentQIndex}">
            <h2 className="text-xl font-bold text-[#1B5E20] leading-relaxed mb-6">
            {questions[currentQIndex].text}
            </h2>

            <div className="flex flex-col gap-3">
            {questions[currentQIndex].options.map((opt, idx) => (
                <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isSubmitted}
                className={`p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center group ${getOptionStyle(currentQIndex, idx)}`}
                >
                <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        answers[currentQIndex] === idx ? 'bg-white/50 text-inherit' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`font-medium ${answers[currentQIndex] === idx ? 'text-gray-900' : 'text-gray-700'}`}>
                        {opt}
                    </span>
                </div>
                {renderOptionIcon(currentQIndex, idx)}
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="bg-white p-4 flex justify-between items-center border-t border-gray-100 safe-area-bottom">
        <button 
          disabled={currentQIndex === 0}
          onClick={() => setCurrentQIndex(p => p - 1)}
          className="flex items-center gap-1 text-gray-500 disabled:opacity-30 font-medium hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} /> Prev
        </button>

        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <button
                key={i}
                onClick={() => setCurrentQIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                    i === currentQIndex ? 'bg-[#4DB6AC] scale-125' : 
                    (answers[i] !== undefined ? 'bg-[#81C784]' : 'bg-gray-300')
                }`}
            />
          ))}
        </div>

        <button 
          disabled={currentQIndex === questions.length - 1}
          onClick={() => setCurrentQIndex(p => p + 1)}
          className="flex items-center gap-1 text-[#1B5E20] disabled:opacity-30 font-bold hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>

      {/* Result Modal Overlay */}
      {showScoreModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[30px] p-6 w-full max-w-sm shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        {calculateScore() / questions.length >= 0.5 ? (
                             <span className="text-4xl">🎉</span>
                        ) : (
                             <span className="text-4xl">💪</span>
                        )}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[#1B5E20] mb-1">
                        {calculateScore() / questions.length >= 0.5 ? 'Great Job!' : 'Keep Practicing!'}
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        You scored <span className="font-bold text-[#2E7D32] text-lg">{calculateScore()}</span> out of <span className="font-bold">{questions.length}</span>
                    </p>

                    <div className="w-full bg-gray-100 rounded-full h-3 mb-6 overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${calculateScore() / questions.length >= 0.5 ? 'bg-[#4DB6AC]' : 'bg-yellow-400'}`} 
                            style={{ width: `${(calculateScore() / questions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mb-6">
                         <div className="bg-green-50 p-3 rounded-2xl">
                             <p className="text-xs text-green-600 font-bold uppercase">Correct</p>
                             <p className="text-xl font-bold text-green-700">{calculateScore()}</p>
                         </div>
                         <div className="bg-red-50 p-3 rounded-2xl">
                             <p className="text-xs text-red-600 font-bold uppercase">Wrong</p>
                             <p className="text-xl font-bold text-red-700">{questions.length - calculateScore()}</p>
                         </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <button 
                            onClick={() => setShowScoreModal(false)}
                            className="w-full py-3 rounded-xl font-bold text-[#1B5E20] border-2 border-[#1B5E20] hover:bg-green-50"
                        >
                            Review Answers
                        </button>
                        <button 
                            onClick={onExit}
                            className="w-full py-3 rounded-xl font-bold text-white bg-[#1B5E20] shadow-lg hover:bg-[#154a19]"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
    