import axiosInstance from '@/utils/axiosInstance';
import { Customer } from '@/features/customers/types/CustomerTypes';
import { handleApiResponse, handleError } from '@/utils/api';

const API_URL = 'http://localhost:5000/customers';

export const fetchCustomers = async (filters: Record<string, any> = {}): Promise<Customer[]> => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(`${API_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error('Fetch customers error:', error); // Log error for fetch
    throw error;
  }
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await axiosInstance.post(API_URL, customer);
    return await handleApiResponse(response);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateCustomer = async (id: string, customer: Customer): Promise<Customer> => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, customer);
    return await handleApiResponse(response);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    await handleApiResponse(response);
  } catch (error) {

    handleError(error);
    throw error;
  }
};
