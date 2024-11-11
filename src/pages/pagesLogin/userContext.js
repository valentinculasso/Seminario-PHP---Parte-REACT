import React, { createContext, useState, useContext, useEffect } from 'react';

// Creo el contexto de usuario
const UserContext = createContext();
// "Hook" para acceder facilmente al conexto
export const useUser = () => useContext(UserContext);
// Proveedor del conexto de usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Con este estado almaceno al usuario logeado

  // Restaura la sesión al cargar el contexto, basicamente si apreto F5 no se me cierra la sesion (antes se cerraba y tenia q logear de nuevo)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const savedUser = localStorage.getItem('username');
      setUser({ username: savedUser });
    }
  }, []);

  // Funcion para iniciar sesion, almaceno los datos del usuario
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('username', userData.username);
  };

  // Funcion para cerrar sesion, limpio los datos del usuario
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  // Proveo el valor del contexto para que este disponible en los componentes "hijos"
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};