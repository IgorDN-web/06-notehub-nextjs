export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NotePayload {
  title: string;
  content: string;
}

// ✅ Добавляем экспорт NoteResponse:
export interface NoteResponse {
  data: Note[];
  total: number;
}
