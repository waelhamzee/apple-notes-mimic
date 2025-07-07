import { api } from "@/api/RequestEngine";
import type { FolderCreate, FolderListResponse, FolderResponse, FolderUpdate } from "../types";

export const fetchFolders = async (): Promise<FolderListResponse> => {
  const response = await api.get<FolderListResponse>("/notes/folders");
  return response.data;
};

export const createFolder = async (data: FolderCreate): Promise<FolderResponse> => {
  const response = await api.post<FolderResponse>("/notes/folders", data);
  return response.data;
};

export const updateFolder = async (id: number, data: FolderUpdate): Promise<FolderResponse> => {
  const response = await api.put<FolderResponse>(`/notes/folders/${id}`, data);
  return response.data;
};

export const deleteFolder = async (id: number): Promise<void> => {
  await api.delete(`/notes/folders/${id}`);
}; 