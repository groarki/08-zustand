import axios from "axios";
import type { Note, NewNote, fetchNotesResponse} from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api"
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN



export async function fetchNotes(searchText: string, page: number, tag?: string) {
    const res = await axios.get<fetchNotesResponse>("/notes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            perPage: 12,
            ...(searchText && { search: searchText }),
            ...(tag && { tag }),
        }
    });
    return res.data
};

export const getSingleNote = async (id: number) => {
    const res = await axios.get<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return res.data;
  };
  
  
export async function createNote(newNote: NewNote) {
    const res = await axios.post<Note>("/notes", newNote, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      return res.data
};
  
export async function deleteNote(id: number) {
    const res = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
     return res.data
};

// export async function getNotesByTag(tag: string) {
    
//     const res = await axios.get<fetchNotesResponse>(`/notes/`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         params: tag ? { tag } : undefined,
//     });
//     console.log('API response:', res.data);
//     return res.data.notes
// };