import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NotesPageProps = {
    params: Promise<{ slug: string[] }>
};

const NotesPage = async ({ params }: NotesPageProps) => {
const {slug} = await params;
const category = slug[0] || "all";
const tag = category === "all" ? "" : category;

  const notes = await fetchNotes("", 1, tag);

    return <NotesClient notes={notes} currentTag={category} />;
};

export default NotesPage;
