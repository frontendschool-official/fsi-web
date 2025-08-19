import { create } from 'zustand';
import { Designation } from '../typings/companies.types';
import {
  getDesignations,
  getDesignation,
  updateDesignation,
  deleteDesignation,
  createDesignation,
  DesignationsListResponse,
} from '../../../apps/admin/src/services/designations.services';

interface DesignationsState {
  // State
  designations: (Designation & { id: string })[];
  currentDesignation: (Designation & { id: string }) | null;
  loading: boolean;
  error: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // CRUD Operations
  fetchDesignations: (companyId: string) => Promise<void>;
  fetchDesignation: (companyId: string, designationId: string) => Promise<void>;
  createDesignationData: (
    companyId: string,
    data: Partial<Designation>
  ) => Promise<void>;
  updateDesignationData: (
    companyId: string,
    designationId: string,
    data: Partial<Designation>
  ) => Promise<void>;
  deleteDesignationData: (
    companyId: string,
    designationId: string
  ) => Promise<void>;

  // Utility
  clearCurrentDesignation: () => void;
  clearError: () => void;
}

export const useDesignationsStore = create<DesignationsState>((set, get) => ({
  // Initial state
  designations: [],
  currentDesignation: null,
  loading: false,
  error: null,

  // Actions
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),

  // CRUD Operations
  fetchDesignations: async (companyId: string) => {
    try {
      set({ loading: true, error: null });
      const response: DesignationsListResponse = await getDesignations(
        companyId
      );
      set({
        designations: response.designations,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch designations',
        loading: false,
      });
    }
  },

  fetchDesignation: async (companyId: string, designationId: string) => {
    try {
      set({ loading: true, error: null });
      const designation = await getDesignation(companyId, designationId);
      set({ currentDesignation: designation, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch designation',
        loading: false,
      });
    }
  },

  createDesignationData: async (
    companyId: string,
    data: Partial<Designation>
  ) => {
    try {
      set({ loading: true, error: null });
      await createDesignation(companyId, data);

      // Refresh the designations list after creation
      await get().fetchDesignations(companyId);
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create designation',
        loading: false,
      });
    }
  },

  updateDesignationData: async (
    companyId: string,
    designationId: string,
    data: Partial<Designation>
  ) => {
    try {
      set({ loading: true, error: null });
      await updateDesignation(companyId, designationId, data);

      // Update the designation in the list if it exists
      set(state => ({
        designations: state.designations.map(designation =>
          designation.id === designationId
            ? { ...designation, ...data }
            : designation
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update designation',
        loading: false,
      });
    }
  },

  deleteDesignationData: async (companyId: string, designationId: string) => {
    try {
      set({ loading: true, error: null });
      await deleteDesignation(companyId, designationId);

      // Remove the designation from the list
      set(state => ({
        designations: state.designations.filter(
          designation => designation.id !== designationId
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to delete designation',
        loading: false,
      });
    }
  },

  // Utility
  clearCurrentDesignation: () => set({ currentDesignation: null }),
  clearError: () => set({ error: null }),
}));
