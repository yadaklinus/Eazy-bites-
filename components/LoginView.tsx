import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#F1F8E9] z-50 flex flex-col overflow-y-auto">
      {/* Header Visual */}
      <div className="relative h-[35vh] bg-[#1B5E20] rounded-b-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#4DB6AC] rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute top-10 -right-10 w-40 h-40 bg-[#FFF176] rounded-full blur-[60px] opacity-20"></div>

        <div className="relative z-10 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-900/20">
             <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">Easy Bites</h1>
          <p className="text-green-100 text-sm">Your Smart Companion for Exam Success</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-6 -mt-10 pb-6">
        <div className="bg-white rounded-[30px] p-8 shadow-xl shadow-green-900/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl font-bold text-[#1B5E20] mb-6">Welcome Back!</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1 uppercase">Email Address</label>
              <div className="relative flex items-center">
                <Mail size={20} className="absolute left-4 text-gray-400 group-focus-within:text-[#4DB6AC] transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-gray-50 text-gray-800 font-medium py-4 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4DB6AC] focus:ring-4 focus:ring-[#4DB6AC]/10 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1 uppercase">Password</label>
              <div className="relative flex items-center">
                <Lock size={20} className="absolute left-4 text-gray-400 group-focus-within:text-[#4DB6AC] transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 text-gray-800 font-medium py-4 pl-12 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4DB6AC] focus:ring-4 focus:ring-[#4DB6AC]/10 transition-all placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="text-xs font-bold text-[#4DB6AC] hover:text-[#2E7D32] transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 w-full bg-[#1B5E20] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 hover:bg-[#2E7D32] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social / Sign Up */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{' '}
              <button className="text-[#1B5E20] font-bold hover:underline decoration-2 decoration-[#4DB6AC]">
                Create One
              </button>
            </p>
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-6 font-medium">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};