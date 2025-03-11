import { api } from "./api";

export interface Note {
  id?: number|undefined;
  title: string;
  content: string;
  category?: string;
  favorite?: boolean;
  color?: string;
}

export const createNote = async (note: Note) => {
  const response = await api.post("/notes", note);
  return response.data;
};

export const deleteNote = async (id: number) => {
  await api.delete(`/notes/delete/${id}`);
};

export const updateNote = async (id: number, note: Note) => {
  const response = await api.put(`/notes/update/${id}`, note);
  return response.data;
};

export const getNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const getNoteById = async (id: number) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const searchNotes = async (query: string) => {
  const response = await api.get(`/notes/search/${query}`);
  return response.data;
};
