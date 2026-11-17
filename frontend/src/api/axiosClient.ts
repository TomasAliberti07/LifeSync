import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta el puerto si tu backend corre en otro
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional para inyectar el token JWT automáticamente cuando esté disponible
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);