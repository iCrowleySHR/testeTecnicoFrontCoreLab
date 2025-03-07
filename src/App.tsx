import { Login } from "./components/Login"
import { isAuthenticated } from "./service/auth";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  return (
    <div>
      <h1>Bloco de Notas</h1>
      {loggedIn ? (
        <>
          <h1>Logado</h1>
        </>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App
