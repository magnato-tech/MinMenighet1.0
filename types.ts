
export type ID = string;

export interface AuditFields {
  id: ID;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  updated_by_id: ID | null;
}

export interface Person extends AuditFields {
  name: string;
  email: string;
  roles: ID[]; // Preferred roles
  teams: ID[];
}

export interface Team extends AuditFields {
  name: string;
}

export interface Membership extends AuditFields {
  person_id: ID;
  team_id: ID;
}

export interface Role extends AuditFields {
  name: string;
  description?: string;
}

export interface Activity extends AuditFields {
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  external_source: 'ical' | 'manual';
  external_id: string | null;
}

export type TaskStatus = 'TODO' | 'DONE';

export interface Task extends AuditFields {
  activity_id: ID;
  role_id: ID;
  assignee_type: 'PERSON' | 'TEAM' | null;
  assignee_id: ID | null;
  status: TaskStatus;
}

export interface RevisionLog {
  id: ID;
  entity_type: 'TASK' | 'ACTIVITY' | 'PERSON';
  entity_id: ID;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE';
  changes: Record<string, any>;
  user_id: ID;
  timestamp: string;
}
