import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const revalidate = 5;

export default async function Notes() {
  try {
    const res = await fetchNotes('', 1);
    return <NotesClient initialData={res} />;
  } catch (_error /* eslint-disable-line @typescript-eslint/no-unused-vars */) {
    return <NotesClient initialData={{ notes: [], totalPages: 1 }} />;
  }
}

