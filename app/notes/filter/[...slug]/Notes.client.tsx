'use client';

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./notes.module.css";
import { fetchNotesResponse } from "@/types/note";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";

interface NotesClientProps {
  notes: fetchNotesResponse,
  currentTag: string,
}

const NotesClient = ({notes, currentTag}: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const apiTag = currentTag === "all" ? undefined : currentTag;

  const { data } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage, currentTag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, apiTag),
    initialData: currentPage === 1 && debouncedQuery === "" ? notes : undefined,
    placeholderData: keepPreviousData,
  });
  
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, currentTag]);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)}/>
      </Modal>}
      {data && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
