import { create } from 'zustand';
import { Company } from '../types/companies';
import {
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  generateCompanyInfo,
  CompaniesListParams,
  CompaniesListResponse,
} from '../../../apps/admin/src/services/companies.services';

interface CompaniesState {
  // State
  companies: (Company & { id: string })[];
  currentCompany: (Company & { id: string }) | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  } | null;
  filters: {
    search: string;
    country: string;
    status: string;
    industry: string;
  };

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<CompaniesState['filters']>) => void;

  // CRUD Operations
  fetchCompanies: (params?: CompaniesListParams) => Promise<void>;
  fetchCompany: (id: string) => Promise<void>;
  updateCompanyData: (id: string, data: Partial<Company>) => Promise<void>;
  deleteCompanyData: (id: string) => Promise<void>;
  generateCompany: (companyName: string) => Promise<void>;

  // Utility
  clearCurrentCompany: () => void;
  clearError: () => void;
}

export const useCompaniesStore = create<CompaniesState>((set, get) => ({
  // Initial state
  companies: [],
  currentCompany: null,
  loading: false,
  error: null,
  pagination: null,
  filters: {
    search: '',
    country: '',
    status: '',
    industry: '',
  },

  // Actions
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setFilters: filters =>
    set(state => ({
      filters: { ...state.filters, ...filters },
    })),

  // CRUD Operations
  fetchCompanies: async (params = {}) => {
    try {
      set({ loading: true, error: null });
      const currentFilters = get().filters;

      const response: CompaniesListResponse = await getCompanies({
        ...currentFilters,
        ...params,
      });

      set({
        companies: response.companies,
        pagination: response.pagination,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch companies',
        loading: false,
      });
    }
  },

  fetchCompany: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const company = await getCompany(id);
      set({ currentCompany: company, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch company',
        loading: false,
      });
    }
  },

  updateCompanyData: async (id: string, data: Partial<Company>) => {
    try {
      set({ loading: true, error: null });
      await updateCompany(id, data);

      // Update the company in the list if it exists
      set(state => ({
        companies: state.companies.map(company =>
          company.id === id ? { ...company, ...data } : company
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to update company',
        loading: false,
      });
    }
  },

  deleteCompanyData: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await deleteCompany(id);

      // Remove the company from the list
      set(state => ({
        companies: state.companies.filter(company => company.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to delete company',
        loading: false,
      });
    }
  },

  generateCompany: async (companyName: string) => {
    try {
      set({ loading: true, error: null });
      await generateCompanyInfo(companyName);

      // Refresh the companies list after generation
      await get().fetchCompanies();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to generate company',
        loading: false,
      });
    }
  },

  // Utility
  clearCurrentCompany: () => set({ currentCompany: null }),
  clearError: () => set({ error: null }),
}));
