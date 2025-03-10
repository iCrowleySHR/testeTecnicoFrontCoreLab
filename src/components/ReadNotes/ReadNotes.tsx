import { useEffect, useState } from "react";
import { getNotes, updateNote } from "../../service/note"; 
import Notes from "../Notes/Notes";
import styles from "./ReadNotes.module.css";

interface Note {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
}

interface ReadNotesProps {
  searchQuery: string; 
}

const ReadNotes: React.FC<ReadNotesProps> = ({ searchQuery }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const response = await getNotes();
    setNotes(response.data);
  };

  const EditNote = async (id: number, title: string, content: string, favorite: boolean) => {
    const updatedNote: Note = { id, title, content, favorite };
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(updatedNotes);
    await updateNote(id, updatedNote);
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteNotes = filteredNotes.filter(note => note.favorite);
  const nonFavoriteNotes = filteredNotes.filter(note => !note.favorite);

  return (
    <div className={styles.container}>
      <h1>Favoritas</h1>
      {favoriteNotes.length === 0 ? (
        <p>Nenhuma nota favorita encontrada.</p>
      ) : (
        <div className={styles.notes}>
          {favoriteNotes.map((note) => (
            <Notes
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              favorite={note.favorite}
              updateNote={EditNote}
            />
          ))}
        </div>
      )}

      <h1>Outras Notas</h1>
      {nonFavoriteNotes.length === 0 ? (
        <p>Nenhuma nota encontrada.</p>
      ) : (
        <div className={styles.notes}>
          {nonFavoriteNotes.map((note) => (
            <Notes
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              favorite={note.favorite}
              updateNote={EditNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadNotes;
