import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getEmployees = async () => {
  const res = await axios.get(`${API}/employees`);
  return res.data;
};

export const createEmployee = async (formData) => {
  const res = await axios.post(`${API}/employees`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateEmployee = async (id, formData) => {
  const res = await axios.put(`${API}/employees/${id}`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await axios.delete(`${API}/employees/${id}`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};