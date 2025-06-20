import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import ErrorMessage from "./error";

export default async function Notes() {
  try {
    const data = await fetchNotes("", 1);
    return <NotesClient initialData={data} />;
  } catch (e) {
    // Используем глобальный Error, чтобы избежать конфликта с React-компонентом
    const errorObj = e instanceof globalThis.Error ? e : new globalThis.Error("Unknown error");
    return <ErrorMessage error={errorObj} />;
  }
}
