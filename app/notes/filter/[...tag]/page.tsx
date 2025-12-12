import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const { tag } = await params;

  const notesTag = tag[0] === "all" ? "" : tag[0];

  const queryKey = notesTag
    ? ["notes", { page: 1, search: "", tag: notesTag }]
    : ["notes", { page: 1, search: "" }];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(1, "", notesTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient notesTag={notesTag} />
    </HydrationBoundary>
  );
}
