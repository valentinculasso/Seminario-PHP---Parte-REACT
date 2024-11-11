import axios from 'axios';

// Creo una instancia de axios sin agregar el token automáticamente
const api = axios.create({
  baseURL: 'http://localhost:8000', // La URL base de tu API
});

// Con esta función puedo agregar el token al header si es necesario
export const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization']; // Elimina el token si no hay ... Pregunta... Si no hay token no deberia haber nada en header por lo tanto que eliminaria ?
  }
};

export default api;