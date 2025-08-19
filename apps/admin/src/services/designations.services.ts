import { httpClient } from '@fsi/config/http';
import { Designation } from '@fsi/config/typings/companies.types';

export interface DesignationsListResponse {
  designations: (Designation & { id: string })[];
}

export const getDesignations = async (
  companyId: string
): Promise<DesignationsListResponse> => {
  try {
    const response = await httpClient.get(
      `/api/companies/${companyId}/designations`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching designations:', error);
    throw error;
  }
};

export const createDesignation = async (
  companyId: string,
  data: Partial<Designation>
): Promise<{ success: boolean; message: string; designationId: string }> => {
  try {
    const response = await httpClient.post(
      `/api/companies/${companyId}/designations`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating designation:', error);
    throw error;
  }
};

export const getDesignation = async (
  companyId: string,
  designationId: string
): Promise<Designation & { id: string }> => {
  try {
    const response = await httpClient.get(
      `/api/companies/${companyId}/designations/${designationId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching designation:', error);
    throw error;
  }
};

export const updateDesignation = async (
  companyId: string,
  designationId: string,
  data: Partial<Designation>
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await httpClient.put(
      `/api/companies/${companyId}/designations/${designationId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error updating designation:', error);
    throw error;
  }
};

export const deleteDesignation = async (
  companyId: string,
  designationId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await httpClient.delete(
      `/api/companies/${companyId}/designations/${designationId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting designation:', error);
    throw error;
  }
};
