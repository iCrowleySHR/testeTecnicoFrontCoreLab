import { Login } from "./components/Login/Login"
import { Logout } from "./components/Logout";
import Navbar from "./components/Navbar/Navbar";
import { isAuthenticated } from "./service/auth";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  return (
    <div>
      <Navbar />
      {loggedIn ? (
        <>
          <h1>Logado</h1>
          <Logout onLogout={() => setLoggedIn(false)} />
        </>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App
