'use client';

import css from "./NotePreview.client.module.css"
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";

export default function NotesPreviewClient({ noteId }: { noteId: number }) {
  const router = useRouter();
  const onClose = () => { router.back(); };

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNote(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error loading note...</p>;

  return (
    <Modal onClose={onClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{note.createdAt}</p>
      <button className={css.button} onClick={onClose}>Close</button>
    </Modal>
  );
}
