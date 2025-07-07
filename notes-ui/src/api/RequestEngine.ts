import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { triggerLogout } from "@/features/auth/context/authEvents";

interface RequestEngineOptions {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
  getAuthToken?: () => string | null;
}

class RequestEngine {
  private axiosInstance: AxiosInstance;
  private getAuthToken?: () => string | null;

  constructor(options: RequestEngineOptions = {}) {
    this.getAuthToken = options.getAuthToken;

    this.axiosInstance = axios.create({
      baseURL: options.baseURL || "",
      headers: options.defaultHeaders || {},
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.getAuthToken) {
          const token = this.getAuthToken();
          if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          triggerLogout();
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export const api = new RequestEngine({
  baseURL: "http://localhost:4000/api",
  getAuthToken: () => localStorage.getItem("token"),
  defaultHeaders: {
    "Content-Type": "application/json",
  },
});

export default RequestEngine;
