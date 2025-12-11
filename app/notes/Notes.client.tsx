"use client";

import { useState } from "react";
// import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
// import NoteList from "../NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
// import Pagination from "../Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
// import SearchBox from "../SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
// import Modal from "../Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
// import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
// import { fetchNotes } from "../../services/noteService";
import { useDebounce } from "use-debounce";
// import { useDebounce } from "use-debounce";

import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <NoteList
        notes={data?.notes ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
