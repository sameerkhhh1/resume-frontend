import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3200",
  withCredentials: true,
});

export async function register(data) {
  const response = await api.post("/api/auth/register", data);
  return response.data;
}

export async function login(data) {
  const response = await api.post("/api/auth/login", data);
  return response.data;
}

export async function logout() {
  const response = await api.get("/api/auth/logout");
  return response.data;
}

export async function getme() {
  const response = await api.get("/api/auth/getme");
  return response.data;
}
