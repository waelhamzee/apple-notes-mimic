import noteRepository from '../repositories/NoteRepository';
import { NoteCreateDto, NoteUpdateDto, NoteResponseDto } from '../dtos';

export class NoteService {
  async createNote(data: NoteCreateDto): Promise<NoteResponseDto> {
    const note = await noteRepository.create(data);
    return noteRepository.toResponseDto(note);
  }

  async getNote(id: number): Promise<NoteResponseDto | null> {
    const note = await noteRepository.findById(id);
    return note ? noteRepository.toResponseDto(note) : null;
  }

  async getAllNotes(): Promise<NoteResponseDto[]> {
    const notes = await noteRepository.findAll();
    return notes.map(noteRepository.toResponseDto);
  }

  async updateNote(id: number, data: NoteUpdateDto): Promise<NoteResponseDto | null> {
    const note = await noteRepository.update(id, data);
    return note ? noteRepository.toResponseDto(note) : null;
  }

  async deleteNote(id: number): Promise<boolean> {
    return await noteRepository.delete(id);
  }
}

export default new NoteService(); 