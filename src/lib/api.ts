import axios from 'axios';
import { Note } from '../types/note';
import { NoteInput } from './NoteInput';

const instance = axios.create({
  baseURL: 'https://notehub-2ab3f-default-rtdb.firebaseio.com',
});

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await instance.get(`/notes.json?auth=${token}`);
  if (!data) return [];
  return Object.entries(data).map(([id, note]) => ({ id, ...(note as Note) }));
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get(`/notes/${id}.json?auth=${token}`);
  return { id, ...data };
};

export const createNote = async (note: NoteInput): Promise<Note> => {
  const { data } = await instance.post(`/notes.json?auth=${token}`, note);
  return { id: data.name, ...note };
};

export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/notes/${id}.json?auth=${token}`);
};
