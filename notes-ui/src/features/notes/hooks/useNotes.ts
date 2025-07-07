import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../services/notesService";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
} 