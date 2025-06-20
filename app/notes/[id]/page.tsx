// app/notes/[id]/page.tsx

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNoteId } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export default async function Page(
  props: Promise<{ params: { id: string } }>
) {
  const { params } = await props;
  const noteId = Number(params.id);

  if (isNaN(noteId)) {
    return <p>Invalid note ID</p>;
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
