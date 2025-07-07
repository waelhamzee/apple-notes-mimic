import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "../services/folderService";

export function useDeleteFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
} 