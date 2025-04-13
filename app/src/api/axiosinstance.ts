import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from '@/app/src/config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): any => {
    return response.data;
  },
  (error: AxiosError<{ message: string }>): Promise<AxiosError> => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      console.error(
        `Error: ${
          error.response.data?.message || "An error occurred"
        }`,
      );
    } else {
      console.error("Network error or server is unreachable.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;