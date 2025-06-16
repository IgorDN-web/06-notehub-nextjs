import React from 'react';
import NoteDetailsClient from './NoteDetails.client';

type Params = {
  id: string;
};

type PageProps = {
  params: Params;
};

export default function NotePage({ params }: PageProps): React.ReactElement {
  const noteId = Number(params.id);
  return <NoteDetailsClient noteId={noteId} />;
}
