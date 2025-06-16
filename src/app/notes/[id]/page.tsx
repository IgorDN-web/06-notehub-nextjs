import NoteDetailsClient from './NoteDetails.client';

type PageProps = {
  params: { id: string } | Promise<{ id: string }>
}

export default async function NotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const noteId = Number(resolvedParams.id);
  return <NoteDetailsClient noteId={noteId} />;
}
