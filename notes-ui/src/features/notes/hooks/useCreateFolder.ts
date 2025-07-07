import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "../services/folderService";

export function useCreateFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
} 