import fetchNoteId from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetails({ params }: NoteDetailsPageProps) {
  const noteId = Number(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteId(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
