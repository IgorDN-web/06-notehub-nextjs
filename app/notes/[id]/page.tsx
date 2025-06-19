import fetchNoteId from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsClientProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsClientProps) {
  const { id } = await params;
  const noteId = +id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", noteId],
    queryFn: () => fetchNoteId(noteId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
