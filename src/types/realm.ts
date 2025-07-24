export interface RealmZone {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  route: string;
  unlocked: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

export interface FocusSession {
  id: string;
  duration: number; // in minutes
  type: 'work' | 'break';
  completedAt: Date;
}

export interface RealmState {
  currentZone: string | null;
  tasks: Task[];
  notes: Note[];
  events: CalendarEvent[];
  focusSessions: FocusSession[];
  achievements: string[];
  xp: number;
}