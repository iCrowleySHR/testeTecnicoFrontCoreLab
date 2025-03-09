import { useState } from "react";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Logout } from "./components/Logout";
import Navbar from "./components/Navbar/Navbar";
import { isAuthenticated } from "./service/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [isRegistering, setIsRegistering] = useState(false); 

  return (
    <div>
      <Navbar />
      {loggedIn ? (
        <>
          <h1>Logado</h1>
          <Logout onLogout={() => setLoggedIn(false)} />
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
