import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { RealmState, Task, Note, CalendarEvent, FocusSession } from '@/types/realm';

const STORAGE_KEY = 'bolt-realm-state';

const initialState: RealmState = {
  currentZone: null,
  tasks: [],
  notes: [],
  events: [],
  focusSessions: [],
  achievements: [],
  xp: 0,
};

type RealmAction =
  | { type: 'SET_ZONE'; payload: string | null }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'ADD_EVENT'; payload: CalendarEvent }
  | { type: 'ADD_FOCUS_SESSION'; payload: FocusSession }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'LOAD_STATE'; payload: RealmState };

function realmReducer(state: RealmState, action: RealmAction): RealmState {
  switch (action.type) {
    case 'SET_ZONE':
      return { ...state, currentZone: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => 
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'ADD_FOCUS_SESSION':
      return { ...state, focusSessions: [...state.focusSessions, action.payload] };
    case 'ADD_XP':
      return { ...state, xp: state.xp + action.payload };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface RealmContextType {
  state: RealmState;
  dispatch: React.Dispatch<RealmAction>;
  setCurrentZone: (zone: string | null) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  addFocusSession: (session: Omit<FocusSession, 'id'>) => void;
  addXP: (amount: number) => void;
}

const RealmContext = createContext<RealmContextType | null>(null);

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(realmReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (error) {
        console.error('Failed to load realm state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const contextValue: RealmContextType = {
    state,
    dispatch,
    setCurrentZone: (zone) => dispatch({ type: 'SET_ZONE', payload: zone }),
    addTask: (taskData) => {
      const task: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch({ type: 'ADD_TASK', payload: task });
    },
    updateTask: (task) => {
      const updatedTask = { ...task, updatedAt: new Date() };
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    },
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    addNote: (noteData) => {
      const note: Note = {
        ...noteData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch({ type: 'ADD_NOTE', payload: note });
    },
    updateNote: (note) => {
      const updatedNote = { ...note, updatedAt: new Date() };
      dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
    },
    deleteNote: (id) => dispatch({ type: 'DELETE_NOTE', payload: id }),
    addEvent: (eventData) => {
      const event: CalendarEvent = {
        ...eventData,
        id: crypto.randomUUID(),
      };
      dispatch({ type: 'ADD_EVENT', payload: event });
    },
    addFocusSession: (sessionData) => {
      const session: FocusSession = {
        ...sessionData,
        id: crypto.randomUUID(),
      };
      dispatch({ type: 'ADD_FOCUS_SESSION', payload: session });
    },
    addXP: (amount) => dispatch({ type: 'ADD_XP', payload: amount }),
  };

  return (
    <RealmContext.Provider value={contextValue}>
      {children}
    </RealmContext.Provider>
  );
}

export function useRealm() {
  const context = useContext(RealmContext);
  if (!context) {
    throw new Error('useRealm must be used within a RealmProvider');
  }
  return context;
}