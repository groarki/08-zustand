import { create } from "zustand"
import { persist } from 'zustand/middleware';

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo',
};
  
type DraftNote = typeof initialDraft

type DraftStore  = {
    draft: DraftNote;
    setDraft: (note: Partial<DraftNote>) => void
    clearDraft: () => void
}

export const useNoteStore = create<DraftStore>()(
    persist(
      (set) => ({
        draft: initialDraft,
  
        setDraft: (note) =>
          set((state) => ({
            draft: {
              ...state.draft,
              ...note,
            },
          })),
  
        clearDraft: () => set({ draft: initialDraft }),
      }),
      {
        name: 'note-draft',
        partialize: (state) => ({ draft: state.draft }),
      }
    )
  );
      