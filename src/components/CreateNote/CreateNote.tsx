import { useState } from "react";
import styles from "./CreateNote.module.css";
import { FaRegStar } from "react-icons/fa";
import { createNote } from "../../service/note";
import Notification from "../Notification/Notification";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleContentChange = (e: any) => {
    setContent(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(saveNote, 5000));
  };

  const saveNote = async () => {
    await createNote({
      title, content, favorite,
    });
    resetFields();
    showSavedMessage();
  };

  const resetFields = () => {
    setContent("");
    setTitle("");
    setFavorite(false);
  };

  const showSavedMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <input
            className={styles.title}
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FaRegStar
            size={20}
            className={`${styles.star} ${favorite ? styles.filledStar : ""}`}
            onClick={() => setFavorite(!favorite)}
          />
        </div>
        <textarea
          className={styles.input}
          placeholder="Criar nota..."
          value={content}
          onChange={handleContentChange}
          style={{ height: "auto", minHeight: "100px" }}
        />
      </div>
      {showMessage && <Notification message="Nota salva!" />}
    </>

  );
};

export default CreateNote;
