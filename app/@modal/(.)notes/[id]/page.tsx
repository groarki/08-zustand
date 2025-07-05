import { getSingleNote } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: number }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const noteId = Number(id);
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNote(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={noteId} />
    </HydrationBoundary>
  );
}
