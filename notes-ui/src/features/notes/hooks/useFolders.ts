import { useQuery } from "@tanstack/react-query";
import { fetchFolders } from "../services/folderService";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });
} 