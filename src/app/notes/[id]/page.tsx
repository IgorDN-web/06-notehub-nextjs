import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
  params: {
    id: string
  }
}

export default function NotePage({ params }: PageProps) {
  const noteId = Number(params.id);
  return <NoteDetailsClient noteId={noteId} />;
}
