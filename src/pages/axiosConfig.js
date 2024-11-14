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
  }
};

// Metodo de verificacion de vencimiento del token
export const checkSesion = () => {
  const token = localStorage.getItem('token');
    if (token) {
      const vencimiento = new Date(localStorage.getItem('vencimiento'));
      const fechaActual = new Date();
      console.log(vencimiento);
      console.log(fechaActual);

      if(fechaActual > vencimiento){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('vencimiento');
        localStorage.removeItem('es_admin');
        return false;
      }
      return true;
    }
    return false;
  }

export default api;