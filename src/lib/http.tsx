import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Helper to set Authorization header
function setAuth(token?: string) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

const http = {
  async get<T>(url: string, token?: string) {
    setAuth(token);
    const response = await api.get<T>(url);
    return response.data;
  },
  async post<T>(url: string, data: unknown, token?: string) {
    setAuth(token);
    const response = await api.post<T>(url, data);
    return response.data;
  },
  async put<T>(url: string, data: unknown, token?: string) {
    setAuth(token);
    const response = await api.put<T>(url, data);
    return response.data;
  },
  async delete<T>(url: string, token?: string) {
    setAuth(token);
    const response = await api.delete<T>(url);
    return response.data;
  },
};

export default http;
