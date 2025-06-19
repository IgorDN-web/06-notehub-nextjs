'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/api';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

export default function NoteList({ notes }: { notes: Note[] }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.text}>{note.content}</p>
          <div className={css.info}>
            <span className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => mutate(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
