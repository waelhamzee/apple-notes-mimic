import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFolder } from "../services/folderService";

export function useUpdateFolder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; name: string }) => updateFolder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
} 