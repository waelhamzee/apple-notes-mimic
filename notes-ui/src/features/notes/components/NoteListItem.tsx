import { ListItem, ListItemText, Typography, ListItemButton } from "@mui/material";
import type { Note } from "../types";

interface NoteListItemProps {
  note: Note;
  selected: boolean;
  onClick: () => void;
}

export default function NoteListItem({
  note,
  selected,
  onClick,
}: NoteListItemProps) {
  return (
    <ListItem
      disablePadding
      sx={{
        bgcolor: selected ? "#E9E9E9" : undefined,
        borderLeft: selected ? "4px solid #FFD600" : "4px solid transparent",
        transition: "background 0.2s",
      }}
    >
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          py: 2,
          px: 3,
          alignItems: "flex-start",
        }}
      >
        <ListItemText
          primary={<Typography fontWeight={600}>{note.title || "Untitled"}</Typography>}
          secondary={
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {note.content.replace(/\n/g, " ").slice(0, 60)}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
