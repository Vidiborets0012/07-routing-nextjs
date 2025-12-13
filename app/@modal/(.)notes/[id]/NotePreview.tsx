import NotePreviewClient from "./NotePreview.client";

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  return <NotePreviewClient id={id} />;
}
