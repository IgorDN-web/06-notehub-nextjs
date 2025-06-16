import NoteDetailsClient from './NoteDetails.client';

export default function NotePage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);
  return <NoteDetailsClient noteId={noteId} />;
}
