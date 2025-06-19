import axios from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://next-docs-api.onrender.com';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async (query: string = ''): Promise<Note[]> => {
  const { data } = await instance.get(`/notes?q=${query}`);
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
};

export const addNote = async (note: Omit<Note, 'id' | 'createdAt'>) => {
  const { data } = await instance.post('/notes', note);
  return data;
};

export const deleteNote = async (id: number) => {
  await instance.delete(`/notes/${id}`);
};
