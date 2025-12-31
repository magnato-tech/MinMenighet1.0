
import React from 'react';
import { RevisionLog, Person } from '../types';

interface HistoryLogProps {
  logs: RevisionLog[];
  people: Person[];
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ logs, people }) => {
  const getUserName = (id: string) => people.find(p => p.id === id)?.name || id;

  const getActionIcon = (action: RevisionLog['action']) => {
    switch (action) {
      case 'CREATE': return 'fa-plus text-emerald-500';
      case 'UPDATE': return 'fa-pen text-indigo-500';
      case 'DELETE': return 'fa-trash-can text-red-500';
      case 'RESTORE': return 'fa-rotate-left text-sky-500';
      default: return 'fa-circle-info text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Siste endringer</h2>
      
      {logs.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            Ingen historikk logget ennå.
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0`}>
                    <i className={`fa-solid ${getActionIcon(log.action)}`}></i>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-slate-800">
                            {log.action} på {log.entity_type}
                        </p>
                        <span className="text-[10px] text-slate-400">
                            {new Date(log.timestamp).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Utført av <span className="font-semibold text-slate-600">{getUserName(log.user_id)}</span>
                    </p>
                    {Object.keys(log.changes).length > 0 && (
                        <div className="mt-2 bg-slate-50 p-2 rounded text-[10px] font-mono text-slate-400 overflow-x-auto">
                            {JSON.stringify(log.changes)}
                        </div>
                    )}
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
