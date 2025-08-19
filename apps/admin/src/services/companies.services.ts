import { httpClient } from '@fsi/config/http';
import { Company } from '@fsi/config/typings/companies.types';

export interface CompaniesListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  country?: string;
  status?: string;
  industry?: string;
}

export interface CompaniesListResponse {
  companies: (Company & { id: string })[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const generateCompanyInfo = async (companyName: string) => {
  try {
    const response = await httpClient.post('/api/companies', {
      companyName,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating company info:', error);
    throw error;
  }
};

export const getCompanies = async (
  params: CompaniesListParams = {}
): Promise<CompaniesListResponse> => {
  try {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.pageSize)
      searchParams.append('pageSize', params.pageSize.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.country) searchParams.append('country', params.country);
    if (params.status) searchParams.append('status', params.status);
    if (params.industry) searchParams.append('industry', params.industry);

    const response = await httpClient.get(
      `/api/companies/list?${searchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const getCompany = async (
  id: string
): Promise<Company & { id: string }> => {
  try {
    const response = await httpClient.get(`/api/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};

export const updateCompany = async (
  id: string,
  data: Partial<Company>
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await httpClient.put(`/api/companies/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
};

export const deleteCompany = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await httpClient.delete(`/api/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};
