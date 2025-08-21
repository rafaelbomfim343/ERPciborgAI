// src/lib/routes.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL do backend (Railway)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
