import type { ApiResponse } from "@/types";

export interface Note {
  id: number;
  title: string;
  content: string;
  folderId?: number;
  createdAt: string;
  updatedAt: string;
}

export type NoteListResponse = ApiResponse<Note[]>;
export type NoteResponse = ApiResponse<Note>;
export type NoteUpdatePayload = { id: number } & Partial<Omit<Note, "id">>;

export interface Folder {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type FolderResponse = ApiResponse<Folder>;
export type FolderListResponse = ApiResponse<Folder[]>;

export interface FolderCreate {
  name: string;
}

export interface FolderUpdate {
  name?: string;
}
