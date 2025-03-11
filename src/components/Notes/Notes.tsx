import { FaRegStar } from "react-icons/fa";
import styles from "./Notes.module.css";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { RiPaintFill } from "react-icons/ri";
import { deleteNote } from "../../service/note";

interface NotesProps {
  id: number;
  title: string;
  content: string;
  favorite: boolean;
  updateNote: (id: number, title: string, content: string, favorite: boolean) => void;
  removeNote: (id: number) => void;
}

const Notes = ({ id, title, content, favorite, updateNote, removeNote  }: NotesProps) => {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);
  const [noteIsFavorite, setNoteIsFavorite] = useState(favorite);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !noteIsFavorite;
    setNoteIsFavorite(newFavoriteStatus);
    updateNote(id, noteTitle, noteContent, newFavoriteStatus);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
    updateNote(id, e.target.value, noteContent, noteIsFavorite);
  };

  const handleDeleteNote = async () => {
    await deleteNote(id);
    removeNote(id);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <input
          className={styles.title}
          placeholder="Título"
          value={noteTitle}
          onChange={handleTitleChange}
        />
        <FaRegStar
          size={20}
          className={`${styles.star} ${noteIsFavorite ? styles.filledStar : ""}`}
          onClick={handleFavoriteClick}
        />
      </div>
      <textarea
        className={styles.input}
        placeholder="Criar nota..."
        value={noteContent}
        onChange={handleContentChange}
        style={{ height: "auto", minHeight: "100px" }}
      />
      <div className={styles.footer}>
        <div>
          <BsPencilFill size={25} />
          <RiPaintFill size={25} />
        </div>
        <BsX size={35} onClick={handleDeleteNote} />
      </div>
    </div>
  );
};

export default Notes;
