import { useState } from "react";
import { login } from "../../service/auth";
import styles from './Login.module.css';

export const Login = ({ onLogin, onRegister }: { onLogin: () => void, onRegister: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      onLogin();
    } catch (err : any) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.containerLogin}>
          <h2>Login</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
          <p className={styles.registerText}>
            Não tem uma conta? <span onClick={onRegister} className={styles.registerLink}>Cadastre-se</span>
          </p>
        </div>
      </div>
    </>
  );
};
