
import { Person, Role, Team, Activity, Task } from './types';

export const MOCK_ROLES: Role[] = [
  { id: 'r1', name: 'Lydtekniker', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
  { id: 'r2', name: 'Lovsangsleder', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
  { id: 'r3', name: 'Møteleder', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
  { id: 'r4', name: 'Kirkevert', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
];

export const MOCK_TEAMS: Team[] = [
  { id: 't1', name: 'Teknikk-team', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
  { id: 't2', name: 'Lovsang-team', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
];

export const MOCK_PEOPLE: Person[] = [
  { id: 'p1', name: 'Ola Nordmann', email: 'ola@kirken.no', roles: ['r1'], teams: ['t1'], created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
  { id: 'p2', name: 'Kari Nordmann', email: 'kari@kirken.no', roles: ['r2', 'r3'], teams: ['t2'], created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Gudstjeneste',
    start_time: '2025-05-25T11:00:00Z',
    end_time: '2025-05-25T12:30:00Z',
    location: 'Hovedsal',
    external_source: 'ical',
    external_id: 'ical-123',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    deleted_at: null,
    updated_by_id: null,
  },
  {
    id: 'a2',
    title: 'Bønnesamling',
    start_time: '2025-05-26T19:00:00Z',
    end_time: '2025-05-26T20:00:00Z',
    location: 'Krypten',
    external_source: 'manual',
    external_id: null,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    deleted_at: null,
    updated_by_id: null,
  }
];

export const MOCK_TASKS: Task[] = [
  { id: 'tk1', activity_id: 'a1', role_id: 'r1', assignee_type: 'PERSON', assignee_id: 'p1', status: 'TODO', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
  { id: 'tk2', activity_id: 'a1', role_id: 'r3', assignee_type: 'PERSON', assignee_id: 'p2', status: 'TODO', created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null, updated_by_id: null },
];
