import { useState } from "react";
import styles from './Register.module.css';
import { register } from "../../service/auth";

export const Register = ({ onRegister }: { onRegister: () => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [telephone, setTelephone] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ email, password, name, telephone, birth_date: birthDate });
            alert("Cadastro realizado com sucesso!");
            onRegister();
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.containerCadastrar}>
                <h2>Cadastrar</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <input
                        type="number"
                        placeholder="Telefone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Data de nascimento"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                    <button type="submit">Cadastrar</button>
                </form>
                <p className={styles.registerText}>
                    Deseja voltar para o <span onClick={onRegister} className={styles.registerLink}>Login</span>?
                </p>
            </div>
        </div>
    );
};
