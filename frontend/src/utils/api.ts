import { AxiosResponse } from 'axios';

export const handleApiResponse = async (response: AxiosResponse) => {
  if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
    const errorData = response.data;
    if (response.status === 401) {
      throw new Error('Unauthenticated, redirecting to login.');
    }
    throw errorData;
  }
  return response.data;
};

export const handleError = (error: any) => {
  console.log('your error is ', error);

  const errorMessage = error?.response?.data?.message || error.message || 'An unknown error occurred';
  console.error('handleError', errorMessage);
  if (error.errors) {
    error.errors.forEach((err: { message: string }) => {
      console.error(err.message);
    });
  } else if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('An unknown error occurred.');
  }
};