"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "@/app/notes/[id]/NoteDetails.module.css";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  const onClose = () => router.back();

  if (isLoading)
    return (
      <Modal onClose={onClose}>
        <p>Loading, please wait…</p>
      </Modal>
    );

  if (error || !note)
    return (
      <Modal onClose={onClose}>
        <p>Something went wrong...</p>
      </Modal>
    );

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={onClose}>
          ← Back
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}
