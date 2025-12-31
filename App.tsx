
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ActivityPlanner } from './components/ActivityPlanner';
import { AdminPanel } from './components/AdminPanel';
import { SpecDocument } from './components/SpecDocument';
import { MyTasks } from './components/MyTasks';
import { HistoryLog } from './components/HistoryLog';
import { Login } from './components/Login';
import { Activity, Task, Person, Role, Team, RevisionLog, ID } from './types';
import { MOCK_ACTIVITIES, MOCK_TASKS, MOCK_PEOPLE, MOCK_ROLES, MOCK_TEAMS } from './constants';

type Tab = 'plan' | 'tasks' | 'admin' | 'history' | 'spec';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [people] = useState<Person[]>(MOCK_PEOPLE);
  const [roles] = useState<Role[]>(MOCK_ROLES);
  const [teams] = useState<Team[]>(MOCK_TEAMS);
  const [logs, setLogs] = useState<RevisionLog[]>([]);

  // Current logged in user (simulated)
  const [currentUser, setCurrentUser] = useState<Person | null>(null);

  const addLog = (entityType: RevisionLog['entity_type'], entityId: ID, action: RevisionLog['action'], changes: any) => {
    const newLog: RevisionLog = {
      id: `log-${Date.now()}`,
      entity_type: entityType,
      entity_id: entityId,
      action,
      changes,
      user_id: currentUser?.id || 'system',
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleLogin = (email: string) => {
    const user = people.find(p => p.email === email);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      alert("Bruker ikke funnet. Prøv 'kari@kirken.no' eller 'ola@kirken.no'");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newStatus = t.status === 'TODO' ? 'DONE' : 'TODO';
        addLog('TASK', taskId, 'UPDATE', { status: newStatus });
        return {
          ...t,
          status: newStatus,
          updated_at: new Date().toISOString(),
          updated_by_id: currentUser?.id || null
        };
      }
      return t;
    }));
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'updated_by_id'>) => {
    const taskId = `tk-${Math.random().toString(36).substr(2, 9)}`;
    const newTask: Task = {
      ...task,
      id: taskId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      updated_by_id: currentUser?.id || null
    };
    setTasks(prev => [...prev, newTask]);
    addLog('TASK', taskId, 'CREATE', newTask);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        addLog('TASK', taskId, 'DELETE', {});
        return { ...t, deleted_at: new Date().toISOString() };
      }
      return t;
    }));
  };

  const handleRestoreTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        addLog('TASK', taskId, 'RESTORE', {});
        return { ...t, deleted_at: null };
      }
      return t;
    }));
  };

  const handleSync = () => {
    const activityId = `a-${Date.now()}`;
    const syncedActivity: Activity = {
      id: activityId,
      title: 'Høyestegudstjeneste (iCal)',
      start_time: '2025-06-01T11:00:00Z',
      end_time: '2025-06-01T12:30:00Z',
      location: 'Hovedkirken',
      external_source: 'ical',
      external_id: `ical-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      updated_by_id: null,
    };
    setActivities(prev => [...prev, syncedActivity]);
    addLog('ACTIVITY', activityId, 'CREATE', { source: 'ical' });
    alert("Synkronisering fullført!");
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'plan':
        return (
          <ActivityPlanner 
            activities={activities} 
            tasks={tasks} 
            people={people} 
            roles={roles}
            teams={teams}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onSync={handleSync}
          />
        );
      case 'tasks':
        return (
          <MyTasks 
            tasks={tasks.filter(t => t.assignee_id === currentUser?.id && t.assignee_type === 'PERSON' && !t.deleted_at)} 
            activities={activities}
            onToggle={handleToggleTask}
          />
        );
      case 'admin':
        return (
          <AdminPanel 
            people={people} 
            roles={roles} 
            teams={teams} 
            deletedTasks={tasks.filter(t => t.deleted_at)}
            onRestoreTask={handleRestoreTask}
          />
        );
      case 'history':
        return <HistoryLog logs={logs} people={people} />;
      case 'spec':
        return <SpecDocument />;
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
