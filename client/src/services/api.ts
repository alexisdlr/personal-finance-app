import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Define la URL base en variables de entorno
  withCredentials: true, // Si usas cookies para autenticación
});

export default api;