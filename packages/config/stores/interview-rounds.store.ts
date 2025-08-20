import { create } from 'zustand';
import { InterviewRound } from '../types/companies';
import {
  getInterviewRounds,
  getInterviewRound,
  updateInterviewRound,
  deleteInterviewRound,
  createInterviewRound,
  InterviewRoundsListResponse,
} from '../../../apps/admin/src/services/interview-rounds.services';

interface InterviewRoundsState {
  // State
  rounds: (InterviewRound & { id: string })[];
  currentRound: (InterviewRound & { id: string }) | null;
  loading: boolean;
  error: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // CRUD Operations
  fetchInterviewRounds: (
    companyId: string,
    designationId: string
  ) => Promise<void>;
  fetchInterviewRound: (
    companyId: string,
    designationId: string,
    roundId: string
  ) => Promise<void>;
  createInterviewRoundData: (
    companyId: string,
    designationId: string,
    data: Partial<InterviewRound>
  ) => Promise<void>;
  updateInterviewRoundData: (
    companyId: string,
    designationId: string,
    roundId: string,
    data: Partial<InterviewRound>
  ) => Promise<void>;
  deleteInterviewRoundData: (
    companyId: string,
    designationId: string,
    roundId: string
  ) => Promise<void>;

  // Utility
  clearCurrentRound: () => void;
  clearError: () => void;
}

export const useInterviewRoundsStore = create<InterviewRoundsState>(
  (set, get) => ({
    // Initial state
    rounds: [],
    currentRound: null,
    loading: false,
    error: null,

    // Actions
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),

    // CRUD Operations
    fetchInterviewRounds: async (companyId: string, designationId: string) => {
      try {
        set({ loading: true, error: null });
        const response: InterviewRoundsListResponse = await getInterviewRounds(
          companyId,
          designationId
        );
        set({
          rounds: response.rounds,
          loading: false,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : 'Failed to fetch interview rounds',
          loading: false,
        });
      }
    },

    fetchInterviewRound: async (
      companyId: string,
      designationId: string,
      roundId: string
    ) => {
      try {
        set({ loading: true, error: null });
        const round = await getInterviewRound(
          companyId,
          designationId,
          roundId
        );
        set({ currentRound: round, loading: false });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : 'Failed to fetch interview round',
          loading: false,
        });
      }
    },

    createInterviewRoundData: async (
      companyId: string,
      designationId: string,
      data: Partial<InterviewRound>
    ) => {
      try {
        set({ loading: true, error: null });
        await createInterviewRound(companyId, designationId, data);

        // Refresh the rounds list after creation
        await get().fetchInterviewRounds(companyId, designationId);
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : 'Failed to create interview round',
          loading: false,
        });
      }
    },

    updateInterviewRoundData: async (
      companyId: string,
      designationId: string,
      roundId: string,
      data: Partial<InterviewRound>
    ) => {
      try {
        set({ loading: true, error: null });
        await updateInterviewRound(companyId, designationId, roundId, data);

        // Update the round in the list if it exists
        set(state => ({
          rounds: state.rounds.map(round =>
            round.id === roundId ? { ...round, ...data } : round
          ),
          loading: false,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : 'Failed to update interview round',
          loading: false,
        });
      }
    },

    deleteInterviewRoundData: async (
      companyId: string,
      designationId: string,
      roundId: string
    ) => {
      try {
        set({ loading: true, error: null });
        await deleteInterviewRound(companyId, designationId, roundId);

        // Remove the round from the list
        set(state => ({
          rounds: state.rounds.filter(round => round.id !== roundId),
          loading: false,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : 'Failed to delete interview round',
          loading: false,
        });
      }
    },

    // Utility
    clearCurrentRound: () => set({ currentRound: null }),
    clearError: () => set({ error: null }),
  })
);
