import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCreateFolder } from "../hooks/useCreateFolder";
import { useDeleteFolder } from "../hooks/useDeleteFolder";
import { useFolders } from "../hooks/useFolders";
import { useUpdateFolder } from "../hooks/useUpdateFolder";
import type { Folder } from "../types";
import AnimatedList from "./AnimatedList";
import FolderDialog from "./FolderDialog";
import UserMenu from "./UserMenu";

interface NotesSidebarProps {
  selectedFolderId: number | null;
  onSelectFolder: (id: number | null) => void;
  notes: { folderId?: number }[];
}

export default function NotesSidebar({
  selectedFolderId,
  onSelectFolder,
  notes,
}: NotesSidebarProps) {
  const { data } = useFolders();
  const createFolderMutation = useCreateFolder();
  const updateFolderMutation = useUpdateFolder();
  const deleteFolderMutation = useDeleteFolder();
  const folders = data?.data || [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dialogInitialName, setDialogInitialName] = useState("");

  const allNotesCount = notes.length;
  const folderNoteCounts = folders.reduce((acc, folder) => {
    acc[folder.id] = notes.filter((n) => n.folderId === folder.id).length;
    return acc;
  }, {} as Record<number, number>);

  const handleAddFolder = () => {
    setDialogMode("add");
    setDialogInitialName("");
    setEditingFolder(null);
    setDialogOpen(true);
  };

  const handleEditFolder = (folder: Folder) => {
    setDialogMode("edit");
    setEditingFolder(folder);
    setDialogInitialName(folder.name);
    setDialogOpen(true);
  };

  const handleDeleteFolder = (folder: Folder) => {
    if (
      window.confirm(`Delete folder "${folder.name}"? This cannot be undone.`)
    ) {
      deleteFolderMutation.mutate(folder.id);
      if (selectedFolderId === folder.id) onSelectFolder(null);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingFolder(null);
    setDialogInitialName("");
    setDialogLoading(false);
  };

  const handleDialogSubmit = (name: string) => {
    setDialogLoading(true);
    if (dialogMode === "add") {
      createFolderMutation.mutate(
        { name },
        {
          onSettled: () => {
            handleDialogClose();
          },
        }
      );
    } else if (editingFolder) {
      updateFolderMutation.mutate(
        { id: editingFolder.id, name },
        {
          onSettled: () => {
            handleDialogClose();
          },
        }
      );
    }
  };

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#F6F6F6",
        borderRight: "1px solid #E0E0E0",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <Box display="flex" alignItems="center" mb={2} p={2}>
        <UserMenu />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        mb={2}
      >
        <Typography variant="h5" fontWeight={700}>
          Folders
        </Typography>
        <Tooltip title="Add Folder">
          <IconButton onClick={handleAddFolder} size="small">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedFolderId === null}
            onClick={() => onSelectFolder(null)}
          >
            <ListItemText
              primary={<Typography fontWeight={600}>All Notes</Typography>}
              secondary={
                allNotesCount > 0
                  ? `${allNotesCount} note${allNotesCount > 1 ? "s" : ""}`
                  : undefined
              }
            />
          </ListItemButton>
        </ListItem>
        <AnimatedList
          items={folders}
          getKey={(folder) => folder.id}
          exitDelay={200}
        >
          {(folder) => (
            <ListItem
              disablePadding
              secondaryAction={
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleEditFolder(folder)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteFolder(folder)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemButton
                selected={selectedFolderId === folder.id}
                onClick={() => onSelectFolder(folder.id)}
              >
                <ListItemText
                  primary={folder.name}
                  secondary={
                    folderNoteCounts[folder.id] > 0
                      ? `${folderNoteCounts[folder.id]} note${
                          folderNoteCounts[folder.id] > 1 ? "s" : ""
                        }`
                      : undefined
                  }
                />
              </ListItemButton>
            </ListItem>
          )}
        </AnimatedList>
      </List>
      <FolderDialog
        open={dialogOpen}
        mode={dialogMode}
        initialName={dialogInitialName}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        loading={dialogLoading}
      />
    </Box>
  );
}
