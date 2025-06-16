'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import styles from './NoteDetails.client.module.css';

interface Props {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const { data: note, error, isLoading } = useQuery(['note', noteId], () => fetchNoteById(noteId));

  if (isLoading) return <p>Loading note details...</p>;
  if (error) return <p>Error loading note: {(error as Error).message}</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <article className={styles.container}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><em>Created: {new Date(note.createdAt).toLocaleDateString()}</em></p>
    </article>
  );
}
