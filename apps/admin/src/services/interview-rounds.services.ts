import { httpClient } from '@fsi/config/http';
import { InterviewRound } from '@fsi/config/typings/companies.types';

export interface InterviewRoundsListResponse {
  rounds: (InterviewRound & { id: string })[];
}

export const getInterviewRounds = async (
  companyId: string,
  designationId: string
): Promise<InterviewRoundsListResponse> => {
  try {
    const response = await httpClient.get(
      `/api/companies/${companyId}/designations/${designationId}/rounds`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching interview rounds:', error);
    throw error;
  }
};

export const createInterviewRound = async (
  companyId: string,
  designationId: string,
  data: Partial<InterviewRound>
): Promise<{ success: boolean; message: string; roundId: string }> => {
  try {
    const response = await httpClient.post(
      `/api/companies/${companyId}/designations/${designationId}/rounds`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating interview round:', error);
    throw error;
  }
};

export const getInterviewRound = async (
  companyId: string,
  designationId: string,
  roundId: string
): Promise<InterviewRound & { id: string }> => {
  try {
    const response = await httpClient.get(
      `/api/companies/${companyId}/designations/${designationId}/rounds/${roundId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching interview round:', error);
    throw error;
  }
};

export const updateInterviewRound = async (
  companyId: string,
  designationId: string,
  roundId: string,
  data: Partial<InterviewRound>
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await httpClient.put(
      `/api/companies/${companyId}/designations/${designationId}/rounds/${roundId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error updating interview round:', error);
    throw error;
  }
};

export const deleteInterviewRound = async (
  companyId: string,
  designationId: string,
  roundId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await httpClient.delete(
      `/api/companies/${companyId}/designations/${designationId}/rounds/${roundId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting interview round:', error);
    throw error;
  }
};
