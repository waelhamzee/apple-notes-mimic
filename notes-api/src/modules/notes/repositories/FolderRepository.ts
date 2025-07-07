import Folder from '../models/Folder';
import { FolderCreateDto, FolderUpdateDto, FolderResponseDto } from '../dtos';
import { sequelize } from '@/config/db';
import { Op } from 'sequelize';

export class FolderRepository {
  async create(data: FolderCreateDto): Promise<Folder> {
    return await Folder.create(data);
  }

  async findById(id: number): Promise<Folder | null> {
    return await Folder.findByPk(id);
  }

  async findAll(): Promise<Folder[]> {
    return await Folder.findAll({ order: [['createdAt', 'DESC']] });
  }

  async update(id: number, data: FolderUpdateDto): Promise<Folder | null> {
    const folder = await Folder.findByPk(id);
    if (!folder) return null;
    return await folder.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const folder = await Folder.findByPk(id);
    if (!folder) return false;
    await folder.destroy();
    return true;
  }

  toResponseDto(folder: Folder): FolderResponseDto {
    return {
      id: folder.id,
      name: folder.name,
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt,
    };
  }
}

export default new FolderRepository(); 