"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import styles from './Notes.client.module.css';

// остальной код...


export default function NotesClient() {
  const [search, setSearch] = useState('');

  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  const filteredNotes = notes?.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.search}
      />
      <ul className={styles.list}>
        {filteredNotes?.map(note => (
          <li key={note.id} className={styles.item}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
