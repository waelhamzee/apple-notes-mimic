import Note from '../models/Note';
import { NoteCreateDto, NoteUpdateDto, NoteResponseDto } from '../dtos';

export class NoteRepository {
  async create(data: NoteCreateDto): Promise<Note> {
    return await Note.create(data);
  }

  async findById(id: number): Promise<Note | null> {
    return await Note.findByPk(id);
  }

  async findAll(): Promise<Note[]> {
    return await Note.findAll({ order: [["createdAt", "DESC"]] });
  }

  async update(id: number, data: NoteUpdateDto): Promise<Note | null> {
    const note = await Note.findByPk(id);
    if (!note) return null;
    return await note.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const note = await Note.findByPk(id);
    if (!note) return false;
    await note.destroy();
    return true;
  }

  toResponseDto(note: Note): NoteResponseDto {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      folderId: note.folderId,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}

export default new NoteRepository(); 