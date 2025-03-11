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
  color: string;  // Adicionando o campo `color` na nota para armazenar a cor atual
  updateNote: (id: number, title: string, content: string, favorite: boolean, color: string) => void; // Atualizando a função `updateNote`
  removeNote: (id: number) => void;
}

const Notes = ({ id, title, content, favorite, color, updateNote, removeNote }: NotesProps) => {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);
  const [noteIsFavorite, setNoteIsFavorite] = useState(favorite);
  const [noteColor, setNoteColor] = useState(color);  // Estado para armazenar a cor da nota
  const [editMode, setEditMode] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const colorList = [
    "#A99A7C", "#9DD6FF", "#FFA285", "#FFE8AC", "#979797", "#F99494",
    "#DAFF8B", "#B9FFDD", "#CDCDCD", "#FFCAB9", "#ECA1FF", "#BAE2FF"
  ];

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    updateNote(id, noteTitle, e.target.value, noteIsFavorite, noteColor);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !noteIsFavorite;
    setNoteIsFavorite(newFavoriteStatus);
    updateNote(id, noteTitle, noteContent, newFavoriteStatus, noteColor);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
    updateNote(id, e.target.value, noteContent, noteIsFavorite, noteColor);
  };

  const handleDeleteNote = async () => {
    await deleteNote(id);
    removeNote(id);
  }

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const toggleColors = () => {
    setShowColors((prevShowColors) => !prevShowColors);
  };

  const handleColorSelect = (selectedColor: string) => {
    setNoteColor(selectedColor); 
    updateNote(id, noteTitle, noteContent, noteIsFavorite, selectedColor);  
    setShowColors(false); 
  };

  return (
    <div className={styles.card} style={{ backgroundColor: noteColor }}>
      <div className={styles.header}>
        <input
          className={styles.title}
          placeholder="Título"
          value={noteTitle}
          readOnly={!editMode}
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
        readOnly={!editMode}
        style={{ height: "auto", minHeight: "100px", backgroundColor: noteColor }}
      />
      <div className={styles.footer}>
        <div>
          <BsPencilFill
            size={25}
            onClick={toggleEditMode}
            className={`${styles.pencil} ${editMode ? styles.editModePencil : ""}`}
          />
          <RiPaintFill
            size={25}
            className={`${styles.paint} ${showColors ? styles.editModePaint : ""}`}
            onClick={toggleColors}
          />
        </div>
        <BsX size={35} onClick={handleDeleteNote} />
      </div>

      {showColors && (
        <div className={styles.colors}>
          {colorList.map((color, index) => (
            <div
              key={index}
              className={styles.circle}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}  
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
