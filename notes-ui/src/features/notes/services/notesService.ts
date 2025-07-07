import { api } from "@/api/RequestEngine";
import type { Note, NoteListResponse, NoteResponse } from "../types";

export const fetchNotes = async (): Promise<NoteListResponse> => {
  const response = await api.get<NoteListResponse>("/notes");
  return response.data;
};

export const fetchNote = async (id: number): Promise<NoteResponse> => {
  const response = await api.get<NoteResponse>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: Partial<Note>): Promise<NoteResponse> => {
  const response = await api.post<NoteResponse>("/notes", note);
  return response.data;
};

export const updateNote = async (id: number, note: Partial<Note>): Promise<NoteResponse> => {
  const response = await api.put<NoteResponse>(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
}; 