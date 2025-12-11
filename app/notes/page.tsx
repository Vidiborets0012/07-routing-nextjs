// import { useState } from "react";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import NoteList from "../NoteList/NoteList";
// import Pagination from "../Pagination/Pagination";
// import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
// import NoteForm from "../NoteForm/NoteForm";
// import { fetchNotes } from "../../services/noteService";
// import { useDebounce } from "use-debounce";

// import css from "./App.module.css";

// export default function App() {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [debouncedSearch] = useDebounce(search, 500);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["notes", page, debouncedSearch],
//     queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
//     placeholderData: keepPreviousData,
//   });

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setPage(1);
//   };

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={search} onChange={handleSearchChange} />
//         {data && data.totalPages > 1 && (
//           <Pagination
//             page={page}
//             totalPages={data.totalPages}
//             onPageChange={setPage}
//           />
//         )}

//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>
//       <NoteList
//         notes={data?.notes ?? []}
//         isLoading={isLoading}
//         isError={isError}
//         error={error}
//       />
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onClose={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
