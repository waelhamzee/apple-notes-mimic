import axios from "axios";

export function extractAxiosError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.error || err.message || "Login failed";
  }
  return "An unexpected error occurred";
} 