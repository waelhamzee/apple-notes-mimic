import { HTTP_STATUS } from "@/shared/constants";
import { ApiResponse } from "@/shared/types";
import { Request, Response } from "express";
import { NoteCreateDto, NoteUpdateDto } from "../dtos";
import noteService from "../services/NoteService";

export class NoteController {
  async createNote(req: Request, res: Response): Promise<void> {
    try {
      const data: NoteCreateDto = req.body;
      const note = await noteService.createNote(data);
      const response: ApiResponse = {
        success: true,
        data: note,
        message: "Note created successfully",
      };
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, error: error.message });
    }
  }

  async getNote(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const note = await noteService.getNote(id);
      if (!note) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ success: false, error: "Note not found" });
        return;
      }
      res.status(HTTP_STATUS.OK).json({ success: true, data: note });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, error: error.message });
    }
  }

  async getAllNotes(req: Request, res: Response): Promise<void> {
    try {
      const notes = await noteService.getAllNotes();
      res.status(HTTP_STATUS.OK).json({ success: true, data: notes });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, error: error.message });
    }
  }

  async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data: NoteUpdateDto = req.body;
      const note = await noteService.updateNote(id, data);
      if (!note) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ success: false, error: "Note not found" });
        return;
      }
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: note,
        message: "Note updated successfully",
      });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, error: error.message });
    }
  }

  async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await noteService.deleteNote(id);
      if (!deleted) {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ success: false, error: "Note not found" });
        return;
      }
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: "Note deleted successfully" });
    } catch (error: any) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, error: error.message });
    }
  }
}

export default new NoteController();
