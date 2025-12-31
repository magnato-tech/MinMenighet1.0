
import React, { useState } from 'react';
import { Activity, Task, Person, Role, Team } from '../types';

interface ActivityPlannerProps {
  activities: Activity[];
  tasks: Task[];
  people: Person[];
  roles: Role[];
  teams: Team[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: any) => void;
  onDeleteTask: (id: string) => void;
  onSync: () => void;
}

export const ActivityPlanner: React.FC<ActivityPlannerProps> = ({ 
    activities, tasks, people, roles, teams, onToggleTask, onAddTask, onDeleteTask, onSync 
}) => {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<string | null>(null);

  const filteredActivities = activities.filter(a => a.deleted_at === null);

  const getTasksForActivity = (activityId: string) => {
    return tasks.filter(t => t.activity_id === activityId && t.deleted_at === null);
  };

  const getRoleName = (id: string) => roles.find(r => r.id === id)?.name || 'Ukjent rolle';
  const getAssigneeName = (type: string | null, id: string | null) => {
    if (!id) return 'Ikke tildelt';
    if (type === 'PERSON') return people.find(p => p.id === id)?.name || 'Ukjent';
    if (type === 'TEAM') return teams.find(t => t.id === id)?.name || 'Ukjent';
    return 'Ukjent';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-800">Ukeoversikt</h2>
        <button 
            onClick={onSync}
            className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-2 rounded-xl flex items-center gap-2 transition-all border border-indigo-100"
        >
            <i className="fa-solid fa-rotate"></i>
            Hent iCal
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        <FilterChip 
            label="Alle Roller" 
            active={filterRole === 'all'} 
            onClick={() => setFilterRole('all')} 
        />
        {roles.map(r => (
            <FilterChip 
                key={r.id} 
                label={r.name} 
                active={filterRole === r.id} 
                onClick={() => setFilterRole(r.id)} 
            />
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-5">
        {filteredActivities.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
             <i className="fa-solid fa-calendar-xmark text-4xl mb-4 opacity-20"></i>
             <p className="font-medium">Ingen aktiviteter funnet</p>
          </div>
        ) : (
          filteredActivities.map(activity => {
            const activityTasks = getTasksForActivity(activity.id);
            const completedCount = activityTasks.filter(t => t.status === 'DONE').length;
            const progress = activityTasks.length > 0 ? (completedCount / activityTasks.length) * 100 : 0;

            return (
              <div key={activity.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                <div className="bg-slate-50/50 p-5 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-black text-slate-900 leading-tight text-lg">{activity.title}</h3>
                            {activity.external_source === 'ical' && (
                                <span className="text-[9px] uppercase font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">iCal</span>
                            )}
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 mt-1.5 flex items-center gap-3 uppercase tracking-wider">
                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> {new Date(activity.start_time).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {activity.location}</span>
                        </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        Status: {completedCount}/{activityTasks.length} vakter klare
                    </span>
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  {activityTasks
                    .filter(t => filterRole === 'all' || t.role_id === filterRole)
                    .map(task => (
                      <div key={task.id} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                              <button 
                                  onClick={() => onToggleTask(task.id)}
                                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                      task.status === 'DONE' 
                                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' 
                                      : 'border-slate-200 hover:border-indigo-400 bg-white'
                                  }`}
                              >
                                  {task.status === 'DONE' && <i className="fa-solid fa-check text-xs"></i>}
                              </button>
                              <div>
                                  <p className={`text-sm font-bold ${task.status === 'DONE' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                      {getRoleName(task.role_id)}
                                  </p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                      <i className="fa-solid fa-user text-[9px] text-slate-300"></i>
                                      <p className="text-[11px] text-slate-500 font-medium">
                                          {getAssigneeName(task.assignee_type, task.assignee_id)}
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <button 
                              onClick={() => onDeleteTask(task.id)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                              <i className="fa-regular fa-trash-can text-sm"></i>
                          </button>
                      </div>
                  ))}
                  
                  <button 
                      onClick={() => setShowAddModal(activity.id)}
                      className="w-full py-3 mt-2 border-2 border-dashed border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                  >
                      <i className="fa-solid fa-plus"></i>
                      Legg til behov
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal - Same as before, just styled even better */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:zoom-in duration-300">
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900">Ny vakt</h3>
                    <button onClick={() => setShowAddModal(null)} className="text-slate-400 hover:text-slate-600">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <div className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rolle</label>
                        <select id="role-select" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tildel til</label>
                        <select id="assignee-select" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                            <option value="">Ingen (Ubesatt)</option>
                            <optgroup label="Personer">
                                {people.map(p => <option key={p.id} value={`PERSON:${p.id}`}>{p.name}</option>)}
                            </optgroup>
                            <optgroup label="Teams">
                                {teams.map(t => <option key={t.id} value={`TEAM:${t.id}`}>{t.name}</option>)}
                            </optgroup>
                        </select>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        const roleSelect = document.getElementById('role-select') as HTMLSelectElement;
                        const assigneeValue = (document.getElementById('assignee-select') as HTMLSelectElement).value;
                        const [type, id] = assigneeValue ? assigneeValue.split(':') : [null, null];
                        
                        onAddTask({
                            activity_id: showAddModal,
                            role_id: roleSelect.value,
                            assignee_type: type as any,
                            assignee_id: id,
                            status: 'TODO'
                        });
                        setShowAddModal(null);
                    }}
                    className="w-full mt-10 py-4 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-95"
                >
                    Opprett vakt
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterChip: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${
        active 
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
        : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
    }`}
  >
    {label}
  </button>
);
