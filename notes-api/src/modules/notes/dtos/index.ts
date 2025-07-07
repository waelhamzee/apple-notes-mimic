export interface NoteCreateDto {
  title: string;
  content: string;
  folderId?: number;
}

export interface NoteUpdateDto {
  title?: string;
  content?: string;
  folderId?: number;
}

export interface NoteResponseDto {
  id: number;
  title: string;
  content: string;
  folderId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteListResponseDto {
  notes: NoteResponseDto[];
}

export interface FolderCreateDto {
  name: string;
}

export interface FolderUpdateDto {
  name?: string;
}

export interface FolderResponseDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderListResponseDto {
  folders: FolderResponseDto[];
} 