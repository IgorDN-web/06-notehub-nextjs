import axios from "axios";
import { Note } from "@/types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://next-docs-api.onrender.com",
});

// Отримати список нотаток
export const fetchNotes = async (query: string, page: number): Promise<NoteResponse> => {
  const res = await API.get(`/notes?query=${query}&page=${page}`);
  return res.data;
};

// Отримати одну нотатку по ID
export const fetchNoteId = async (id: string): Promise<Note> => {
  const res = await API.get(`/notes/${id}`);
  return res.data;
};

// Створити нову нотатку
export const createNote = async (note: { title: string; content: string }): Promise<Note> => {
  const res = await API.post("/notes", note);
  return res.data;
};

// Видалити нотатку
export const deleteNote = async (id: string): Promise<void> => {
  await API.delete(`/notes/${id}`);
};
