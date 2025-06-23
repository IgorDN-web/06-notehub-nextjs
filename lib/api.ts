import axios from "axios";
import type { Note, NotePayload } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://next-docs-api.onrender.com";
const TOKEN = process.env.NOTEHUB_TOKEN;

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
  },
});

// 🔍 Получение всех заметок
export const fetchNotes = async (query: string = "", page: number = 1): Promise<Note[]> => {
  const res = await API.get(`/notes?q=${query}&page=${page}`);
  return res.data;
};

// 🔍 Получение заметки по ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await API.get(`/notes/${id}`);
  return res.data;
};

// ➕ Создание новой заметки
export const createNote = async (payload: NotePayload): Promise<Note> => {
  const res = await API.post("/notes", payload);
  return res.data;
};

// ❌ Удаление заметки по ID
export const deleteNote = async (id: string): Promise<void> => {
  await API.delete(`/notes/${id}`);
};

// 🔧 Лог запросов (удали после отладки!)
if (process.env.NODE_ENV !== "production") {
  API.interceptors.request.use((config) => {
    console.log("➡️ [API Request]", config.method?.toUpperCase(), config.url);
    console.log("🔐 Auth Header:", config.headers.Authorization);
    return config;
  });
}
