
import React from 'react';
import { Person, Role, Team, Task } from '../types';

interface AdminPanelProps {
  people: Person[];
  roles: Role[];
  teams: Team[];
  deletedTasks: Task[];
  onRestoreTask: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ people, roles, teams, deletedTasks, onRestoreTask }) => {
  return (
    <div className="space-y-8 pb-12">
      <h2 className="text-xl font-bold text-slate-800">Administrasjon</h2>
      
      <section className="space-y-3">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Frivillige ({people.length})</h3>
            <button className="text-indigo-600 text-xs font-bold">+ Ny person</button>
        </div>
        <div className="grid grid-cols-1 gap-2">
            {people.map(p => (
                <div key={p.id} className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                            {p.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.email}</p>
                        </div>
                    </div>
                    <button className="text-slate-300 hover:text-indigo-500"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                </div>
            ))}
        </div>
      </section>

      {deletedTasks.length > 0 && (
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest">Papirkurv (Slettede oppgaver)</h3>
            <div className="space-y-2">
                {deletedTasks.map(task => (
                    <div key={task.id} className="bg-white p-3 rounded-lg border border-rose-100 flex justify-between items-center opacity-60">
                        <span className="text-xs text-slate-600 font-medium italic">ID: {task.id}</span>
                        <button 
                            onClick={() => onRestoreTask(task.id)}
                            className="text-indigo-600 text-[10px] font-bold uppercase flex items-center gap-1"
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                            Gjenopprett
                        </button>
                    </div>
                ))}
            </div>
        </section>
      )}

      <section className="space-y-3">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Team ({teams.length})</h3>
            <button className="text-indigo-600 text-xs font-bold">+ Nytt team</button>
        </div>
        <div className="grid grid-cols-1 gap-2">
            {teams.map(t => (
                <div key={t.id} className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-50 rounded flex items-center justify-center">
                        <i className="fa-solid fa-users text-slate-400 text-xs"></i>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{t.name}</p>
                </div>
            ))}
        </div>
      </section>

      <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
        <h4 className="text-indigo-900 font-bold text-sm mb-1">Eksport & Backup</h4>
        <p className="text-indigo-700 text-xs leading-relaxed mb-4">
            Alle data er lagret med "soft-delete", slik at ingenting fjernes permanent før du ber om det spesifikt.
        </p>
        <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg text-xs border border-indigo-200 hover:bg-indigo-100 transition-colors">
            Last ned full backup (JSON)
        </button>
      </div>
    </div>
  );
};
