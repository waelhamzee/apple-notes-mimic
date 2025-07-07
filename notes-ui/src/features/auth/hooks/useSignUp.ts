import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "../services/authService";
import type { AuthResponse } from "../types";

export const useSignUp = (onSuccess?: (response: AuthResponse) => void) => {
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (response) => {
      onSuccess?.(response);
    },
  });
};
