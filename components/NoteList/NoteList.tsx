import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "@/lib/api";
import toast from "react-hot-toast";
import EmptyState from "../common/EmptyState/EmptyState";
import Link from "next/link";

import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function NoteList({ notes, isLoading }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      toast.success("Note deleted");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes.length && !isLoading)
    return (
      <EmptyState
        title="No notes found"
        subtitle="Try creating your first note."
      />
    );

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
