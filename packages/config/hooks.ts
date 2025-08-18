import {
  useUserStore,
  useUIStore,
  useProblemStore,
  useProgressStore,
} from './stores';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from './firebase';
import { ensureUserDocument } from './db';
import { useEffect } from 'react';

// Hook to sync Firebase auth state with Zustand user store
export function useAuthSync() {
  const [user, loading, error] = useAuthState(getAuth());
  const { setUser, setLoading, setInitialized } = useUserStore();

  useEffect(() => {
    setLoading(loading);
    if (!loading) {
      setUser(user || null);
      setInitialized(true);
    }
  }, [user, loading, setUser, setLoading, setInitialized]);

  return { user, loading, error };
}

// Hook to get current user with loading state
export function useCurrentUser() {
  const { user, isLoading, isInitialized } = useUserStore();
  return { user, isLoading, isInitialized };
}

// Hook to get theme and theme controls
export function useTheme() {
  const { theme, setTheme } = useUIStore();
  return { theme, setTheme };
}

// Hook to get sidebar state and controls
export function useSidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  return { sidebarOpen, toggleSidebar, setSidebarOpen };
}

// Hook to get notifications and notification controls
export function useNotifications() {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useUIStore();
  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
}

// Hook to get problem-related state and actions
export function useProblems() {
  const {
    problems,
    currentProblem,
    isLoading,
    error,
    setProblems,
    setCurrentProblem,
    addProblem,
  } = useProblemStore();
  return {
    problems,
    currentProblem,
    isLoading,
    error,
    setProblems,
    setCurrentProblem,
    addProblem,
  };
}

// Hook to get user progress with current user context
export function useUserProgress() {
  const { user } = useCurrentUser();
  const {
    userProgress,
    updateProgress,
    getProgress,
    getCompletedProblems,
    getInProgressProblems,
  } = useProgressStore();

  const updateUserProgress = (problemId: string, progress: any) => {
    if (user) {
      updateProgress(problemId, { ...progress, userId: user.uid });
    }
  };

  return {
    userProgress,
    updateProgress: updateUserProgress,
    getProgress,
    getCompletedProblems,
    getInProgressProblems,
  };
}

// Hook to get problem with progress for current user
export function useProblemWithProgress(problemId: string) {
  const { problems } = useProblems();
  const { getProgress } = useUserProgress();

  const problem = problems.find(p => p.id === problemId);
  const progress = getProgress(problemId);

  return { problem, progress };
}

// Hook to get all problems with progress for current user
export function useProblemsWithProgress() {
  const { problems } = useProblems();
  const { userProgress } = useUserProgress();

  const problemsWithProgress = problems.map(problem => ({
    ...problem,
    progress: userProgress[problem.id] || null,
  }));

  return problemsWithProgress;
}
