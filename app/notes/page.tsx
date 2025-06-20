import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function Notes() {
  const data = await fetchNotes("", 1); // initial fetch

  return <NotesClient initialData={data} />;
}
