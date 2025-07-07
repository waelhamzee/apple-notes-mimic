import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface FolderDialogProps {
  open: boolean;
  mode: "add" | "edit";
  initialName: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  loading?: boolean;
}

export default function FolderDialog({
  open,
  mode,
  initialName,
  onClose,
  onSubmit,
  loading,
}: FolderDialogProps) {
  const [folderName, setFolderName] = useState(initialName);

  useEffect(() => {
    setFolderName(initialName);
  }, [open, initialName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = () => {
    if (!folderName.trim()) return;
    onSubmit(folderName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && folderName.trim()) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === "add" ? "Add Folder" : "Rename Folder"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          fullWidth
          value={folderName}
          onChange={handleNameChange}
          disabled={loading}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!folderName.trim() || loading}>
          {mode === "add" ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
