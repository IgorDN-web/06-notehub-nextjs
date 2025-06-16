import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: { id: string };
}

export default function NotePage({ params }: Props) {
  const noteId = Number(params.id);
  return <NoteDetailsClient noteId={noteId} />;
}
