export interface Note {
  id: number,
  title: string,
  content: string,
  createdAt: string,    
  updatedAt: string,
  tag: Tags,
}

export interface NewNote {
  title: string
  content: string
  tag: Tags
}
export interface fetchNotesResponse {
  notes: Note[],
  totalPages: number,
}

export type Tags = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"