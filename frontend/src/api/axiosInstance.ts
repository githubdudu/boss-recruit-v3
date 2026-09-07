import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { store } from 'app/store';
import { setIsLoggedIn } from 'reducer/isLoggedInSlice';

interface ApiErrorResponse {
  message: string;
  status: number;
  data?: unknown;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized access
          // Dispatch logout action
          store.dispatch(setIsLoggedIn(false));
          break;
        case 403:
          // Handle forbidden access
          console.error('Access forbidden');
          break;
        case 500:
          // Handle server error
          console.error('Server error occurred');
          break;
        default:
          console.error(`API Error: ${status}`);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error occurred');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
