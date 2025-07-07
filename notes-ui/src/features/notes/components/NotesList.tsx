import { Box, List } from "@mui/material";
import type { Note } from "../types";
import NoteListItem from "./NoteListItem";
import AnimatedList from "./AnimatedList";

interface NotesListProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelect: (id: number) => Promise<void>;
}

export default function NotesList({
  notes,
  selectedNoteId,
  onSelect,
}: NotesListProps) {
  return (
    <Box
      sx={{
        width: 320,
        bgcolor: "#FBFBFB",
        borderRight: "1px solid #E0E0E0",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <List disablePadding>
        <AnimatedList
          items={notes}
          getKey={(note) => note.id}
        >
          {(note) => (
            <NoteListItem
              note={note}
              selected={note.id === selectedNoteId}
              onClick={async () => {
                await onSelect(note.id);
              }}
            />
          )}
        </AnimatedList>
      </List>
    </Box>
  );
}
