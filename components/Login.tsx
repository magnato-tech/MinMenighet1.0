
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                <i className="fa-solid fa-church text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-black text-slate-800">MinMenighet</h1>
            <p className="text-slate-500 text-sm mt-1">Planlegging for din menighet</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">E-post</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="navn@menighet.no"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Få Magic Link
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-[11px] text-slate-400 font-medium">DEMO KONTOER:</p>
            <div className="flex justify-center gap-4 mt-2">
                <button onClick={() => setEmail('kari@kirken.no')} className="text-indigo-600 text-xs font-bold hover:underline">Kari (Admin)</button>
                <button onClick={() => setEmail('ola@kirken.no')} className="text-indigo-600 text-xs font-bold hover:underline">Ola (Bruker)</button>
            </div>
        </div>
      </div>
      <p className="mt-8 text-slate-400 text-xs">Versjon 1.0 MVP &bull; Driftet av Menighetsnett</p>
    </div>
  );
};
