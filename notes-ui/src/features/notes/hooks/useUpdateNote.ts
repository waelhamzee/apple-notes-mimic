import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../services/notesService";
import type { NoteUpdatePayload } from "../types";

export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: NoteUpdatePayload) => {
      if (note.id === undefined) throw new Error("Note id is required for update");
      return updateNote(note.id, note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
