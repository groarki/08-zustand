'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note"
import css from "./NoteList.module.css"
import { deleteNote } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

interface NoteListProps {
    notes: Note[],
}


export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient()
    
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["notes"] })
        },
        onError: () => {
            toast.error("Unknown problem with deleting note");
        }
      });

      const handleDeleteNote = (id: number) => {
        deleteMutation.mutate(id)
    };
    
    return (<ul className={css.list}>
        {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <span className={css.tag}>{note.tag}</span>
                    <button className={css.button} onClick={() => handleDeleteNote(note.id)} 
                    disabled={deleteMutation.isPending}>Delete</button>
                    <Link className={css.details} href={`/notes/${note.id}`}>View details</Link>
                </div>
            </li>
        ))}
    </ul>)
};