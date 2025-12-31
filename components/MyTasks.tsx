
import React from 'react';
import { Task, Activity } from '../types';

interface MyTasksProps {
  tasks: Task[];
  activities: Activity[];
  onToggle: (id: string) => void;
}

export const MyTasks: React.FC<MyTasksProps> = ({ tasks, activities, onToggle }) => {
  const getActivity = (id: string) => activities.find(a => a.id === id);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Mine oppdrag</h2>
      
      {tasks.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
            <i className="fa-solid fa-mug-hot text-3xl mb-4 block opacity-20"></i>
            Ingen kommende oppdrag for deg akkurat nå.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => {
            const activity = getActivity(task.activity_id);
            return (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <button 
                    onClick={() => onToggle(task.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        task.status === 'DONE' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                >
                    <i className={`fa-solid ${task.status === 'DONE' ? 'fa-check' : 'fa-list-check'}`}></i>
                </button>
                <div className="flex-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                        {activity?.title || 'Ukjent aktivitet'}
                    </p>
                    <p className={`font-semibold ${task.status === 'DONE' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        Vakt: {activity?.location}
                    </p>
                    <p className="text-xs text-slate-400">
                        {activity ? new Date(activity.start_time).toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'long' }) : ''}
                    </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
