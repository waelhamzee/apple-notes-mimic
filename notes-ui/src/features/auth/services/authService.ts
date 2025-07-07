import { api } from "@/api/RequestEngine";
import type { AuthResponse, LoginCredentials, SignUpCredentials } from "../types";

export const loginRequest = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const signUpRequest = async (
  credentials: SignUpCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signup", credentials);
  return response.data;
};
