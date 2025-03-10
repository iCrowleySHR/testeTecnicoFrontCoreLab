import { api } from "./api";

interface LoginResponse {
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}
interface RegisterData {
  email: string;
  password: string;
  name: string;
  telephone: string;
  birth_date: string;
}

interface MessageResponse {
  message: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post<LoginResponse>("/users/validate", data);
  const token = response.data.token;

  localStorage.setItem("token", token);

  return token;
};

export const register = async (data: RegisterData) => {
  const response = await api.post<MessageResponse>("/users", data);
  return response.data;
}

export const logout = async () => {
  try {
    await api.get("/users/logout");
    localStorage.removeItem("token");
  } catch (error) {
    localStorage.removeItem("token");
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
