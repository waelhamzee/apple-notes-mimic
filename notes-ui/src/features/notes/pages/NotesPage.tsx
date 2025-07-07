import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EmptyState from "../components/EmptyState";
import NoteEditor from "../components/NoteEditor";
import NotesList from "../components/NotesList";
import NotesSidebar from "../components/NotesSidebar";
import NotesToolbar from "../components/NotesToolbar";
import { useCreateNote } from "../hooks/useCreateNote";
import { useDeleteNote } from "../hooks/useDeleteNote";
import { useNotes } from "../hooks/useNotes";
import { useUpdateNote } from "../hooks/useUpdateNote";
import type { Note } from "../types";

const DRAFT_PREFIX = "note-draft-";
const DEBOUNCE_DELAY = 500;

export default function NotesPage() {
  const { data, isLoading } = useNotes();

  const createNoteMutation = useCreateNote();
  const deleteNoteMutation = useDeleteNote();
  const updateNoteMutation = useUpdateNote();

  const notes = useMemo(() => data?.data || [], [data]);

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [draftNote, setDraftNote] = useState<Note | null>(null);
  const [localNotes, setLocalNotes] = useState<Note[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    } else if (notes.length === 0) {
      setSelectedNoteId(null);
    }
  }, [notes, selectedNoteId]);

  useEffect(() => {
    if (!selectedNoteId) {
      setDraftNote(null);
      return;
    }
    const localDraft = localStorage.getItem(DRAFT_PREFIX + selectedNoteId);
    if (localDraft) {
      setDraftNote(JSON.parse(localDraft));
    } else {
      const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;
      setDraftNote(selectedNote);
    }
  }, [selectedNoteId, notes]);

  const filteredNotes = useMemo(
    () =>
      selectedFolderId === null
        ? localNotes
        : localNotes.filter((n) => n.folderId === selectedFolderId),
    [localNotes, selectedFolderId]
  );

  // Auto-select the first note in the folder when switching folders
  useEffect(() => {
    if (filteredNotes.length > 0) {
      setSelectedNoteId(filteredNotes[0].id);
    } else {
      setSelectedNoteId(null);
    }
  }, [selectedFolderId, filteredNotes]);

  const handleSelectNote = async (id: number) => {
    if (
      draftNote &&
      !draftNote.title &&
      !draftNote.content &&
      draftNote.id
    ) {
      setLocalNotes((prev) => prev.filter((n) => n.id !== draftNote.id));
      localStorage.removeItem(DRAFT_PREFIX + draftNote.id);
      setTimeout(() => {
        deleteNoteMutation.mutateAsync(draftNote.id);
      }, 200);
    }
    setSelectedNoteId(id);
  };

  const handleNewNote = async () => {
    if (filteredNotes.some((n) => !n.title && !n.content)) return;
    const payload: Partial<Note> = {
      title: "",
      content: "",
    };
    if (selectedFolderId !== null) {
      payload.folderId = selectedFolderId;
    }
    const res = await createNoteMutation.mutateAsync(payload);
    setSelectedNoteId(res.data.id);
    setLocalNotes((prev) => [res.data, ...prev]);
  };

  const handleDeleteNote = async () => {
    if (!selectedNoteId) return;
    setLocalNotes((prev) => prev.filter((n) => n.id !== selectedNoteId));
    localStorage.removeItem(DRAFT_PREFIX + selectedNoteId);
    setTimeout(() => {
      deleteNoteMutation.mutateAsync(selectedNoteId);
    }, 200);
    const idx = notes.findIndex((n) => n.id === selectedNoteId);
    if (notes.length > 1) {
      if (idx === 0) {
        setSelectedNoteId(notes[1].id);
      } else {
        setSelectedNoteId(notes[idx - 1].id);
      }
    } else {
      setSelectedNoteId(null);
    }
  };

  const handleEditNote = useCallback(
    (field: keyof Note, value: string) => {
      if (!draftNote) return;
      const updated = { ...draftNote, [field]: value };
      setDraftNote(updated);

      setLocalNotes((prev) =>
        prev.map((n) => (n.id === updated.id ? { ...n, [field]: value } : n))
      );
      if (updated.id) {
        localStorage.setItem(
          DRAFT_PREFIX + updated.id,
          JSON.stringify(updated)
        );
      }
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        updateNoteMutation.mutate(
          {
            id: updated.id,
            title: updated.title,
            content: updated.content,
          },
          {
            onSuccess: () => {
              localStorage.removeItem(DRAFT_PREFIX + updated.id);
            },
          }
        );
      }, DEBOUNCE_DELAY);
    },
    [draftNote, updateNoteMutation]
  );

  return (
    <Box display="flex" height="100vh" width="100vw" bgcolor="#F6F6F6">
      <NotesSidebar
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        notes={localNotes}
      />
      <NotesList
        notes={filteredNotes}
        selectedNoteId={selectedNoteId}
        onSelect={handleSelectNote}
      />
      <Box flex={1} display="flex" flexDirection="column" minWidth={0}>
        <NotesToolbar
          onNew={handleNewNote}
          onDelete={handleDeleteNote}
          disableDelete={!selectedNoteId}
          disableNew={
            filteredNotes.some(
              (n) => !n.title && !n.content
            )
          }
        />
        {isLoading ? null : filteredNotes.length === 0 ? (
          <EmptyState />
        ) : (
          <NoteEditor note={draftNote} onChange={handleEditNote} />
        )}
      </Box>
    </Box>
  );
}
