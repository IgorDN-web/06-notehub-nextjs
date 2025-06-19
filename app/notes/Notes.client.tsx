'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/api';
import NoteList from '../components/NoteList/NoteList';
import NoteForm from '../components/NoteForm/NoteForm';
import NoteModal from '../components/NoteModal/NoteModal';
import SearchBox from '../components/SearchBox/SearchBox';
import Pagination from '../components/Pagination/Pagination';
import css from './Notes.client.module.css';

export default function NotesClient() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: notes = [], isLoading, isError, error } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(),
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const currentNotes = filteredNotes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <SearchBox onSearch={setQuery} />
        <button className={css.addBtn} onClick={() => setIsModalOpen(true)}>
          + Add Note
        </button>
      </div>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not load notes: {(error as Error).message}</p>}
      {!isLoading && !isError && <NoteList notes={currentNotes} />}

      <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />

      <NoteForm />
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
