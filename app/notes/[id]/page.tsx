import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type NoteDetailsProps = {
  params: Promise<{ id: number }>;
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  const noteId = Number(id)

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNote(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
