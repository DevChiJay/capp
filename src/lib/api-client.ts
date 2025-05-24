import axios, { type AxiosError, type AxiosInstance } from "axios";
import { getAuthTokens, setAuthTokens, clearAuthTokens } from "./auth";
import type { ApiResponse, AuthTokens } from "./types";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const tokens = getAuthTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // If error is 401 and we have a refresh token, try to refresh
    if (error.response?.status === 401 && !originalRequest?.headers?.["X-Retry"]) {
      const tokens = getAuthTokens();

      if (tokens?.refreshToken) {
        try {
          // Set retry flag to prevent infinite loops
          if (originalRequest) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["X-Retry"] = "true";
          }

          // Call refresh token endpoint
          const response = await axios.post<ApiResponse<AuthTokens>>(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/refresh-token`,
            { refreshToken: tokens.refreshToken }
          );

          if (response.data.success && response.data.data) {
            // Update tokens in storage (both cookies and localStorage)
            setAuthTokens(response.data.data);

            // Retry original request with new token
            if (originalRequest) {
              originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
              return axios(originalRequest);
            }
          }
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          clearAuthTokens();
          if (typeof window !== 'undefined') {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
