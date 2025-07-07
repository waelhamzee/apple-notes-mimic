import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/authService";
import type { AuthResponse } from "../types";

export const useLogin = (onSuccess?: (response: AuthResponse) => void) => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      onSuccess?.(response);
    },
  });
};
