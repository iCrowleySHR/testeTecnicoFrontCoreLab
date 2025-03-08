import { logout } from "../service/auth";

export const Logout = ({ onLogout }: { onLogout: () => void }) => {
  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return <button onClick={handleLogout}>Sair</button>;
};