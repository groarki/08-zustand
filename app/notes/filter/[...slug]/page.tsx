import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type NotesPageProps = {
    params: Promise<{ slug: string[] }>
};

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const {slug} = await params;
const category = slug[0] || "all";
  const tag = category === "all" ? "" : category;
  
  const title = tag ? `${tag} Notes` : "All Notes"
  const description = tag ? `Notes for the category ${tag}` : "All available notes"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-eight-cyan.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        }
      ]
    }
  }
}


const NotesPage = async ({ params }: NotesPageProps) => {
const {slug} = await params;
const category = slug[0] || "all";
const tag = category === "all" ? "" : category;

  const notes = await fetchNotes("", 1, tag);

    return <NotesClient notes={notes} currentTag={category} />;
};

export default NotesPage;
