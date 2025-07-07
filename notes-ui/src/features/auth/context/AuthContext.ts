import type { AuthData, User } from "@/features/auth/types";
import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  login: (authData: AuthData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
