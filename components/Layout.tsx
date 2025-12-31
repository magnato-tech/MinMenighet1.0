
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: any) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onLogout }) => {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-xl relative overflow-hidden border-x border-slate-200">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-church text-xl text-indigo-200"></i>
          <h1 className="text-xl font-bold tracking-tight">MinMenighet</h1>
        </div>
        <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[10px] bg-indigo-600 px-2 py-1 rounded-full border border-indigo-400">MVP v1.0</span>
            <button onClick={onLogout} className="text-white/80 hover:text-white transition-colors">
                <i className="fa-solid fa-right-from-bracket text-lg"></i>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 pb-28">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 flex justify-around p-3 pb-8 shrink-0 z-50">
        <NavButton 
            icon="fa-calendar-week" 
            label="Plan" 
            active={activeTab === 'plan'} 
            onClick={() => onTabChange('plan')} 
        />
        <NavButton 
            icon="fa-list-check" 
            label="Mine" 
            active={activeTab === 'tasks'} 
            onClick={() => onTabChange('tasks')} 
        />
        <NavButton 
            icon="fa-clock-rotate-left" 
            label="Logg" 
            active={activeTab === 'history'} 
            onClick={() => onTabChange('history')} 
        />
        <NavButton 
            icon="fa-gears" 
            label="Admin" 
            active={activeTab === 'admin'} 
            onClick={() => onTabChange('admin')} 
        />
        <NavButton 
            icon="fa-file-lines" 
            label="Spec" 
            active={activeTab === 'spec'} 
            onClick={() => onTabChange('spec')} 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ icon: string, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-200 ${active ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <i className={`fa-solid ${icon} text-lg`}></i>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);
