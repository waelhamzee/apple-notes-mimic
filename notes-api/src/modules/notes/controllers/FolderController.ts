import { Request, Response } from 'express';
import folderService from '../services/FolderService';
import { FolderCreateDto, FolderUpdateDto } from '../dtos';
import { HTTP_STATUS } from '@/shared/constants';
import { ApiResponse } from '@/shared/types';

export class FolderController {
  async createFolder(req: Request, res: Response): Promise<void> {
    try {
      const data: FolderCreateDto = req.body;
      const folder = await folderService.createFolder(data);
      const response: ApiResponse = {
        success: true,
        data: folder,
        message: 'Folder created successfully',
      };
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }

  async getFolder(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const folder = await folderService.getFolder(id);
      if (!folder) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'Folder not found' });
        return;
      }
      res.status(HTTP_STATUS.OK).json({ success: true, data: folder });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }

  async getAllFolders(req: Request, res: Response): Promise<void> {
    try {
      const folders = await folderService.getAllFolders();
      res.status(HTTP_STATUS.OK).json({ success: true, data: folders });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }

  async updateFolder(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data: FolderUpdateDto = req.body;
      const folder = await folderService.updateFolder(id, data);
      if (!folder) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'Folder not found' });
        return;
      }
      res.status(HTTP_STATUS.OK).json({ success: true, data: folder, message: 'Folder updated successfully' });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }

  async deleteFolder(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await folderService.deleteFolder(id);
      if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, error: 'Folder not found' });
        return;
      }
      res.status(HTTP_STATUS.OK).json({ success: true, message: 'Folder deleted successfully' });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }
}

export default new FolderController(); 