
import React from 'react';
import { User, Book, Award, Clock } from 'lucide-react';
import { UserProfile } from '../types';

export const ProfileView: React.FC = () => {
  const user: UserProfile = {
    name: "Dayo Ibrahim",
    age: 17,
    classLevel: "SS3 Senior",
    jambCombination: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    waecSubjects: ["Mathematics", "English", "Civic Education", "Biology", "Physics", "Chemistry", "Geography", "Further Maths", "Data Processing"]
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Card */}
      <div className="bg-white rounded-[30px] p-6 shadow-sm border border-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#4DB6AC] to-[#81C784]"></div>
        <div className="relative flex flex-col items-center mt-8">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
            <img src="https://picsum.photos/200/200?random=1" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-[#1B5E20] mt-3">{user.name}</h2>
          <p className="text-[#388E3C] text-sm font-medium">{user.classLevel} • {user.age} Yrs</p>
          
          <div className="flex gap-4 mt-6 w-full justify-center">
            <div className="flex flex-col items-center p-3 bg-green-50 rounded-2xl min-w-[80px]">
              <span className="text-xs text-gray-500 font-medium">JAMB Score</span>
              <span className="text-lg font-bold text-[#4DB6AC]">285</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-green-50 rounded-2xl min-w-[80px]">
              <span className="text-xs text-gray-500 font-medium">Rank</span>
              <span className="text-lg font-bold text-[#4DB6AC]">Top 5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* JAMB Combination */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-green-50">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-[#E8F5E9] p-2 rounded-xl">
            <Book size={20} className="text-[#1B5E20]" />
          </div>
          <h3 className="font-bold text-[#1B5E20]">JAMB Combination</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.jambCombination.map((subject, index) => (
            <span key={index} className="px-3 py-1.5 bg-[#F1F8E9] text-[#2E7D32] text-sm font-semibold rounded-full border border-green-100">
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* WAEC Subjects */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-green-50 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-[#FFF9C4] p-2 rounded-xl">
            <Award size={20} className="text-[#F9A825]" />
          </div>
          <h3 className="font-bold text-[#1B5E20]">WAEC Registered</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {user.waecSubjects.map((subject, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#81C784]"></div>
              {subject}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
