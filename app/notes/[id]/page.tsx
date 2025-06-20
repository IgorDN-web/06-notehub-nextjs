import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNoteId } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const noteId = Number(params.id);

  if (isNaN(noteId)) {
    notFound(); // або return <p>Invalid note ID</p>;
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteId(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
