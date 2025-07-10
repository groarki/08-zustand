'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, } from '@/lib/api';
import { useNoteStore } from "@/lib/store/noteStore"
import css from "./NoteForm.module.css"

import { useRouter } from 'next/navigation';
import { Tags } from '@/types/note';
import { useId } from 'react';

const NoteForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter();
  const id = useId()

  const { draft, setDraft, clearDraft } = useNoteStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']})
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleCancel = () => router.push('/notes/filter/all');

  
  const handleSubmit = (formData: FormData) => {
    const rawTag = formData.get("tag")?.toString() || "Todo";
  
    const values = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: rawTag as Tags,
    };
  
    mutate(values);
  };

  const categories: Tags[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Category</label>
       <select id={`${id}-tag`} name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>Create note</button>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>Cancel</button>
      </div>
    </form>
  );
};

export default NoteForm;
