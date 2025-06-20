import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const noteId = Number(id);

  if (isNaN(noteId)) {
    return <p>Invalid note ID</p>;
  }

  return <NoteDetailsClient noteId={noteId} />;
}
