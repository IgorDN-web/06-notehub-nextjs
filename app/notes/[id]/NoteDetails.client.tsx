"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteId } from "@/lib/api";
import { Note } from "@/types/note";

interface NoteDetailsClientProps {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteId(noteId),
    refetchOnMount: false, // обов'язково вказати
    staleTime: 1000 * 60 * 5, // 5 хвилин кешування
  });

  if (isLoading) return <p>Loading note details...</p>;

  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  if (!data) return <p>Note not found</p>;

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p><strong>Tag:</strong> {data.tag}</p>
      <p><em>Created at: {new Date(data.createdAt).toLocaleString()}</em></p>
      <p><em>Updated at: {new Date(data.updatedAt).toLocaleString()}</em></p>
    </article>
  );
}
