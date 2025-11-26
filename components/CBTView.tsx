
import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Home, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Question } from '../types';

export const CBTView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes for 20 questions
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showNote, setShowNote] = useState(false);

  // 20 Mixed JAMB Questions
  const questions: Question[] = [
    {
      id: 1,
      text: "Which of the following elements is a Transition Metal?",
      options: ["Calcium", "Iron", "Sodium", "Potassium"],
      correctOption: 1,
      subject: "Chemistry",
      note: "Iron (Fe) is a transition metal found in Group 8. Calcium, Sodium, and Potassium are s-block metals."
    },
    {
      id: 2,
      text: "In Economics, 'Demand' is best defined as...",
      options: ["Wants of the consumer", "Needs backed by ability to pay", "Market supply curve", "Cost of production"],
      correctOption: 1,
      subject: "Economics",
      note: "Effective demand requires three things: desire, ability to pay, and willingness to pay."
    },
    {
      id: 3,
      text: "Solve for x: 3(x - 2) = 2(x + 4)",
      options: ["10", "12", "14", "8"],
      correctOption: 2,
      subject: "Mathematics",
      note: "3x - 6 = 2x + 8 \n3x - 2x = 8 + 6 \nx = 14"
    },
    {
      id: 4,
      text: "The synonym of the word 'CANDID' is...",
      options: ["Secretive", "Frank", "Dishonest", "Shy"],
      correctOption: 1,
      subject: "English",
      note: "Candid means truthful and straightforward; frank."
    },
    {
      id: 5,
      text: "Which organelle is responsible for protein synthesis?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"],
      correctOption: 1,
      subject: "Biology",
      note: "Ribosomes are the sites of protein synthesis in a cell."
    },
    {
      id: 6,
      text: "The SI unit of electric charge is...",
      options: ["Ampere", "Coulomb", "Volt", "Ohm"],
      correctOption: 1,
      subject: "Physics",
      note: "The Coulomb (C) is the standard unit of electric charge."
    },
    {
      id: 7,
      text: "Who was the first Prime Minister of Nigeria?",
      options: ["Nnamdi Azikiwe", "Obafemi Awolowo", "Tafawa Balewa", "Ahmadu Bello"],
      correctOption: 2,
      subject: "Government",
      note: "Sir Abubakar Tafawa Balewa was the first Prime Minister of Nigeria upon independence in 1960."
    },
    {
      id: 8,
      text: "Which of these is a scalar quantity?",
      options: ["Velocity", "Force", "Displacement", "Speed"],
      correctOption: 3,
      subject: "Physics",
      note: "Speed has magnitude but no direction, making it a scalar quantity. The others are vectors."
    },
    {
      id: 9,
      text: "The phrase 'To let the cat out of the bag' means...",
      options: ["To release a pet", "To reveal a secret", "To be careless", "To solve a problem"],
      correctOption: 1,
      subject: "English",
      note: "This idiom means to inadvertently reveal a secret or a surprise."
    },
    {
      id: 10,
      text: "Calculate the simple interest on ₦5000 for 3 years at 4% per annum.",
      options: ["₦500", "₦600", "₦700", "₦450"],
      correctOption: 1,
      subject: "Mathematics",
      note: "I = (P × R × T) / 100 \nI = (5000 × 4 × 3) / 100 \nI = 60000 / 100 = ₦600"
    },
    {
      id: 11,
      text: "Which gas is evolved when sodium reacts with water?",
      options: ["Oxygen", "Chlorine", "Hydrogen", "Carbon Dioxide"],
      correctOption: 2,
      subject: "Chemistry",
      note: "2Na + 2H₂O → 2NaOH + H₂. Hydrogen gas is released."
    },
    {
      id: 12,
      text: "The study of the relationship between organisms and their environment is...",
      options: ["Genetics", "Ecology", "Morphology", "Anatomy"],
      correctOption: 1,
      subject: "Biology",
      note: "Ecology is the branch of biology that deals with the relations of organisms to one another and to their physical surroundings."
    },
    {
      id: 13,
      text: "Convert 1011₂ to base 10.",
      options: ["10", "11", "12", "13"],
      correctOption: 1,
      subject: "Mathematics",
      note: "1(2³) + 0(2²) + 1(2¹) + 1(2⁰) = 8 + 0 + 2 + 1 = 11"
    },
    {
      id: 14,
      text: "Choose the option opposite in meaning to: EXTRAVAGANT",
      options: ["Rich", "Wasteful", "Frugal", "Generous"],
      correctOption: 2,
      subject: "English",
      note: "Extravagant means spending money freely; Frugal means sparing or economical with money."
    },
    {
      id: 15,
      text: "Under a constitution, the ultimate power resides with...",
      options: ["The President", "The Military", "The People", "The Judiciary"],
      correctOption: 2,
      subject: "Government",
      note: "In a democracy, sovereignty ultimately resides with the people (The Electorate)."
    },
    {
      id: 16,
      text: "A body of mass 5kg moves with a velocity of 10m/s. Calculate its Kinetic Energy.",
      options: ["50J", "100J", "250J", "500J"],
      correctOption: 2,
      subject: "Physics",
      note: "KE = ½mv² \nKE = 0.5 × 5 × (10)² \nKE = 2.5 × 100 = 250J"
    },
    {
      id: 17,
      text: "What is the general formula for Alkanes?",
      options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2n+1"],
      correctOption: 1,
      subject: "Chemistry",
      note: "Alkanes are saturated hydrocarbons with the general formula CnH2n+2."
    },
    {
      id: 18,
      text: "Opportunity cost is defined as...",
      options: ["Money spent on goods", "Alternative forgone", "Cost of production", "Market price"],
      correctOption: 1,
      subject: "Economics",
      note: "Opportunity cost is the next best alternative forgone when a choice is made."
    },
    {
      id: 19,
      text: "Which blood group is the universal donor?",
      options: ["Type A", "Type B", "Type AB", "Type O"],
      correctOption: 3,
      subject: "Biology",
      note: "Type O Negative blood cells have no antigens, so they can be safely given to any other blood type."
    },
    {
      id: 20,
      text: "In the sentence 'He runs fast', the word 'fast' functions as...",
      options: ["Adjective", "Noun", "Adverb", "Verb"],
      correctOption: 2,
      subject: "English",
      note: "It modifies the verb 'runs', telling us how he runs. Thus, it is an adverb."
    }
  ];

  // Reset note visibility when changing questions
  useEffect(() => {
    setShowNote(false);
  }, [currentQIndex]);

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

  // Helper to determine subject badge color
  const getSubjectColor = (subject: string = 'General') => {
      const map: Record<string, string> = {
          'Mathematics': 'bg-blue-50 text-blue-600',
          'English': 'bg-purple-50 text-purple-600',
          'Physics': 'bg-orange-50 text-orange-600',
          'Chemistry': 'bg-red-50 text-red-600',
          'Biology': 'bg-green-50 text-green-600',
          'Economics': 'bg-yellow-50 text-yellow-700',
          'Government': 'bg-gray-100 text-gray-700'
      };
      return map[subject] || 'bg-teal-50 text-[#4DB6AC]';
  };

  return (
    <div className="fixed inset-0 bg-[#F1F8E9] z-[100] flex flex-col safe-area-inset animate-in fade-in duration-300">
      {/* Header */}
      <div className="px-4 py-3 bg-white shadow-sm flex justify-between items-center z-20">
        <button onClick={onExit} className="text-[#1B5E20] font-semibold text-sm hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">
          {isSubmitted ? 'Close' : 'Exit'}
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
      <div className="w-full bg-gray-200 h-1.5 relative z-10">
        <div 
          className="bg-[#4DB6AC] h-1.5 transition-all duration-300 ease-out" 
          style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Navigation Bar (Above Question) */}
      <div className="flex justify-between items-center px-4 py-4 bg-[#F1F8E9] border-b border-green-100 z-10 sticky top-0">
         <button 
          disabled={currentQIndex === 0}
          onClick={() => setCurrentQIndex(p => p - 1)}
          className="flex items-center gap-1 bg-white border border-gray-200 text-gray-700 disabled:opacity-40 disabled:bg-gray-50 font-medium hover:bg-green-50 px-4 py-2 rounded-xl transition-all shadow-sm text-sm"
        >
          <ChevronLeft size={18} /> Prev
        </button>

        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
          {currentQIndex + 1} / {questions.length}
        </span>

        <button 
          disabled={currentQIndex === questions.length - 1}
          onClick={() => setCurrentQIndex(p => p + 1)}
          className="flex items-center gap-1 bg-[#1B5E20] text-white disabled:opacity-40 disabled:bg-gray-400 font-bold hover:bg-[#2E7D32] px-4 py-2 rounded-xl transition-all shadow-md active:translate-y-0.5 text-sm"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Scrollable Question Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="animate-in slide-in-from-right-4 duration-300 key-{currentQIndex}">
            {/* Subject Tag */}
            <div className="mb-4">
                <span className={`${getSubjectColor(questions[currentQIndex].subject)} px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide`}>
                    {questions[currentQIndex].subject || 'General'}
                </span>
            </div>

            <h2 className="text-lg font-bold text-[#1B5E20] leading-relaxed mb-6">
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

            {/* Notes Section */}
            {questions[currentQIndex].note && (
              <div className="mt-8">
                 <button 
                    onClick={() => setShowNote(!showNote)}
                    className="flex items-center gap-2 text-[#F9A825] font-bold text-sm hover:underline mb-2 transition-colors"
                 >
                    <Lightbulb size={18} />
                    {showNote ? 'Hide Study Note' : 'View Study Note'}
                    {showNote ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </button>
                 
                 {showNote && (
                   <div className="bg-[#FFFDE7] p-4 rounded-xl border border-[#FFF59D] text-[#F57F17] text-sm leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                      <p className="font-bold mb-1">Explanation:</p>
                      {questions[currentQIndex].note}
                   </div>
                 )}
              </div>
            )}
        </div>
      </div>

      {/* Result Modal Overlay */}
      {showScoreModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
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
