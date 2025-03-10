import { useState, useEffect } from "react";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Logout } from "./components/Logout";
import Navbar from "./components/Navbar/Navbar";
import { isAuthenticated } from "./service/auth";
import CreateNote from "./components/CreateNote/CreateNote";
import ReadNotes from "./components/ReadNotes/ReadNotes";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Adiciona o estado para o texto da pesquisa

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} /> {/* Passa a função para atualizar o searchQuery */}
      {loggedIn ? (
        <>
          <div style={{ backgroundColor: '#F0F2F5', padding: '40px 0' }}>
            <CreateNote />
            <ReadNotes searchQuery={searchQuery} /> {/* Passa o searchQuery para o ReadNotes */}
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
