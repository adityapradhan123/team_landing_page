import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function login(data) {
  const res = await axios.post(`${API}/admin/login`, data);

  return res.data;
}