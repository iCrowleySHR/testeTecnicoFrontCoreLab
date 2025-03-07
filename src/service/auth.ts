import { api } from "./api";

interface LoginResponse {
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post<LoginResponse>("/users/validate", data);
  const token = response.data.token;
  
  localStorage.setItem("token", token);
  
  return token;
};

export const logout = async () => {
  await api.get("/users/logout");
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
