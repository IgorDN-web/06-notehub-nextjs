import axios from "axios";
import { Note } from "@/types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://next-docs-api.onrender.com",
});

// Додаємо токен у заголовки
API.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_TOKEN; // або інша змінна
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Отримати список нотаток
export const fetchNotes = async (query: string, page: number): Promise<NoteResponse> => {
  const res = await API.get<NoteResponse>(`/notes?query=${query}&page=${page}`);
  return res.data;
};

// Отримати одну нотатку по ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await API.get<Note>(`/notes/${id}`);
  return res.data;
};

// Створити нову нотатку
export const createNote = async (note: { title: string; content: string; tag?: string }): Promise<Note> => {
  const res = await API.post<Note>("/notes", note);
  return res.data;
};

// Видалити нотатку
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await API.delete<Note>(`/notes/${id}`);
  return res.data;
};
