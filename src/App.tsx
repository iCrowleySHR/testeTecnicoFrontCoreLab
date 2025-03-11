import { useState } from "react";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import { isAuthenticated } from "./service/auth";
import CreateNote from "./components/CreateNote/CreateNote";
import ReadNotes, { Note } from "./components/ReadNotes/ReadNotes";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [createNewNote, setCreateNewNote] = useState<Note[]>([]);

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} setLoggedIn={setLoggedIn}/>
      {loggedIn ? (
        <>
          <div style={{ backgroundColor: '#F0F2F5', padding: '40px 0 80px 0', minHeight: '93vh' }}>
            <CreateNote setCreateNewNote={setCreateNewNote} />
            <ReadNotes searchQuery={searchQuery} createNewNote={createNewNote} /> 
          </div>
        </>
      ) : isRegistering ? (
        <Register onRegister={() => setIsRegistering(false)} />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} onRegister={() => setIsRegistering(true)} />
      )}
    </div>
  );
}

export default App;
