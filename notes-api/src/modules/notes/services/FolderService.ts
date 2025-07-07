import folderRepository from "../repositories/FolderRepository";
import { FolderCreateDto, FolderUpdateDto, FolderResponseDto } from "../dtos";

export class FolderService {
  async createFolder(data: FolderCreateDto): Promise<FolderResponseDto> {
    const folder = await folderRepository.create(data);
    return folderRepository.toResponseDto(folder);
  }

  async getFolder(id: number): Promise<FolderResponseDto | null> {
    const folder = await folderRepository.findById(id);
    return folder ? folderRepository.toResponseDto(folder) : null;
  }

  async getAllFolders(): Promise<FolderResponseDto[]> {
    const folders = await folderRepository.findAll();
    return folders.map(folderRepository.toResponseDto);
  }

  async updateFolder(
    id: number,
    data: FolderUpdateDto
  ): Promise<FolderResponseDto | null> {
    const folder = await folderRepository.update(id, data);
    return folder ? folderRepository.toResponseDto(folder) : null;
  }

  async deleteFolder(id: number): Promise<boolean> {
    return await folderRepository.delete(id);
  }
}

export default new FolderService();
