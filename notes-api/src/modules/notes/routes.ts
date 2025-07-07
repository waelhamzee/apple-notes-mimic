import { Router } from "express";
import folderController from "./controllers/FolderController";
import noteController from "./controllers/NoteController";

const router = Router();

// Folder routes
router.post("/folders", folderController.createFolder);
router.get("/folders", folderController.getAllFolders);
router.get("/folders/:id", folderController.getFolder);
router.put("/folders/:id", folderController.updateFolder);
router.delete("/folders/:id", folderController.deleteFolder);

// Note routes
router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

export default router;
