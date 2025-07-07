import { Box, TextField } from "@mui/material";
import type { Note } from "../types";

interface NoteEditorProps {
  note: Note | null;
  onChange: (field: keyof Note, value: string) => void;
  readOnly?: boolean;
}

export default function NoteEditor({
  note,
  onChange,
  readOnly,
}: NoteEditorProps) {
  if (!note) {
    return (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <span style={{ color: "#aaa" }}>Select a note to view or edit</span>
      </Box>
    );
  }
  return (
    <Box
      flex={1}
      p={4}
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor="#FFF"
    >
      <TextField
        variant="standard"
        value={note.title}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Title"
        InputProps={{
          disableUnderline: true,
          style: { fontSize: 28, fontWeight: 700, marginBottom: 16 },
          readOnly,
        }}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        variant="outlined"
        value={note.content}
        onChange={(e) => onChange("content", e.target.value)}
        placeholder="Start typing..."
        multiline
        minRows={20}
        maxRows={40}
        InputProps={{
          style: { fontSize: 18, fontWeight: 400 },
          readOnly,
        }}
        fullWidth
        sx={{ flex: 1, bgcolor: "#FFF" }}
      />
    </Box>
  );
}
