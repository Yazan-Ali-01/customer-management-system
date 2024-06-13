import axiosInstance from '@/utils/axiosInstance';

const API_URL = 'http://localhost:5000/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error: any) {
    handleAuthError(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/register`, { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error: any) {
    handleAuthError(error);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/auth/login';
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');

  try {
    const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken });
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (error: any) {
    handleAuthError(error);
  }
};

const handleAuthError = (error: any) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/auth/login';
  } else {
    console.log('main error ', error);

    throw new Error(error.response?.data?.message || 'Failed to authenticate');
  }
};
