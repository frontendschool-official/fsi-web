import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { ensureUserDocument } from './db';
import { useCompaniesStore } from './stores/companies.store';
import { useDesignationsStore } from './stores/designations.store';
import { useInterviewRoundsStore } from './stores/interview-rounds.store';
import { RoundType } from './types/companies';

// User store for authentication state
interface UserState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: true,
        isInitialized: false,
        setUser: async user => {
          if (user) {
            // Ensure user document exists in Firestore
            await ensureUserDocument(user);
          }
          set({ user, isLoading: false });
        },
        setLoading: loading => set({ isLoading: loading }),
        setInitialized: initialized => set({ isInitialized: initialized }),
        signOut: () => set({ user: null, isLoading: false }),
      }),
      {
        name: 'user-storage',
        partialize: state => ({ user: state.user }),
      }
    ),
    {
      name: 'user-store',
    }
  )
);

// UI store for global UI state
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (
    notification: Omit<UIState['notifications'][0], 'id'>
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        sidebarOpen: false,
        theme: 'system',
        notifications: [],
        toggleSidebar: () =>
          set(state => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: open => set({ sidebarOpen: open }),
        setTheme: theme => set({ theme }),
        addNotification: notification => {
          const id = Math.random().toString(36).substr(2, 9);
          const newNotification = { ...notification, id };
          set(state => ({
            notifications: [...state.notifications, newNotification],
          }));

          // Auto-remove notification after duration (default: 5000ms)
          if (notification.duration !== 0) {
            setTimeout(() => {
              get().removeNotification(id);
            }, notification.duration || 5000);
          }
        },
        removeNotification: id =>
          set(state => ({
            notifications: state.notifications.filter(n => n.id !== id),
          })),
        clearNotifications: () => set({ notifications: [] }),
      }),
      {
        name: 'ui-storage',
        partialize: state => ({ theme: state.theme }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
);

// Problem store for managing coding problems
interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: RoundType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProblemState {
  problems: Problem[];
  currentProblem: Problem | null;
  isLoading: boolean;
  error: string | null;
  setProblems: (problems: Problem[]) => void;
  setCurrentProblem: (problem: Problem | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addProblem: (problem: Problem) => void;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
  removeProblem: (id: string) => void;
}

export const useProblemStore = create<ProblemState>()(
  devtools(
    (set, get) => ({
      problems: [],
      currentProblem: null,
      isLoading: false,
      error: null,
      setProblems: problems => set({ problems }),
      setCurrentProblem: problem => set({ currentProblem: problem }),
      setLoading: loading => set({ isLoading: loading }),
      setError: error => set({ error }),
      addProblem: problem =>
        set(state => ({ problems: [...state.problems, problem] })),
      updateProblem: (id, updates) =>
        set(state => ({
          problems: state.problems.map(p =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
        })),
      removeProblem: id =>
        set(state => ({
          problems: state.problems.filter(p => p.id !== id),
        })),
    }),
    {
      name: 'problem-store',
    }
  )
);

// Progress store for user progress tracking
interface UserProgress {
  userId: string;
  problemId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  attempts: number;
  bestScore?: number;
  lastAttempted?: Date;
  completedAt?: Date;
}

interface ProgressState {
  userProgress: Record<string, UserProgress>;
  isLoading: boolean;
  error: string | null;
  setUserProgress: (progress: Record<string, UserProgress>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProgress: (problemId: string, progress: Partial<UserProgress>) => void;
  getProgress: (problemId: string) => UserProgress | null;
  getCompletedProblems: () => string[];
  getInProgressProblems: () => string[];
}

export const useProgressStore = create<ProgressState>()(
  devtools(
    persist(
      (set, get) => ({
        userProgress: {},
        isLoading: false,
        error: null,
        setUserProgress: progress => set({ userProgress: progress }),
        setLoading: loading => set({ isLoading: loading }),
        setError: error => set({ error }),
        updateProgress: (problemId, progress) =>
          set(state => ({
            userProgress: {
              ...state.userProgress,
              [problemId]: {
                ...state.userProgress[problemId],
                ...progress,
              },
            },
          })),
        getProgress: problemId => get().userProgress[problemId] || null,
        getCompletedProblems: () =>
          Object.entries(get().userProgress)
            .filter(([, progress]) => progress.status === 'completed')
            .map(([problemId]) => problemId),
        getInProgressProblems: () =>
          Object.entries(get().userProgress)
            .filter(([, progress]) => progress.status === 'in_progress')
            .map(([problemId]) => problemId),
      }),
      {
        name: 'progress-storage',
        partialize: state => ({ userProgress: state.userProgress }),
      }
    ),
    {
      name: 'progress-store',
    }
  )
);

// Export store types for use in components
export type {
  UserState,
  UIState,
  ProblemState,
  ProgressState,
  Problem,
  UserProgress,
};

// Export stores
export { useCompaniesStore, useDesignationsStore, useInterviewRoundsStore };
