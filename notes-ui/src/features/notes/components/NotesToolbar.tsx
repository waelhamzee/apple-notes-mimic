import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";

interface NotesToolbarProps {
  onNew: () => void;
  onDelete: () => void;
  disableDelete?: boolean;
  disableNew?: boolean;
}

export default function NotesToolbar({
  onNew,
  onDelete,
  disableDelete,
  disableNew,
}: NotesToolbarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        borderBottom: "1px solid #E0E0E0",
        bgcolor: "#FBFBFB",
        height: 56,
      }}
      tabIndex={0}
    >
      <Tooltip title="New Note">
        <span>
          <IconButton onClick={onNew} size="large" disabled={disableNew}>
            <AddIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Delete Note">
        <span>
          <IconButton onClick={onDelete} size="large" disabled={disableDelete}>
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
