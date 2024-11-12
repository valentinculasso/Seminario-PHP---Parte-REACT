import React, { createContext, useState, useContext, useEffect } from 'react';

// Creo el contexto de usuario
const UserContext = createContext();
// "Hook" para acceder facilmente al conexto
export const useUser = () => useContext(UserContext);

// Proveedor del conexto de usuario
export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null); // Con este estado almaceno al usuario logeado
    const [isAdmin, setIsAdmin] = useState(false);

    // Restaura la sesión al cargar el contexto, basicamente si apreto F5 no se me cierra la sesion (antes se cerraba y tenia q logear de nuevo)
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const savedIsAdmin = localStorage.getItem('es_admin');
        const savedUser = localStorage.getItem('username');
        console.log(savedIsAdmin, savedUser);
        setUser({ username: savedUser });
        // Verifica si el valor de 'es_admin' es '1' (admin) o '0' (no admin) lo compara con el string '1'
        setIsAdmin(savedIsAdmin === '1');
    }
    }, []);

    // Funcion para iniciar sesion, almaceno los datos del usuario
    const login = ({username, isAdmin}) => {
        setUser({username});
        setIsAdmin(isAdmin);
    };

    // Funcion para cerrar sesion, limpio los datos del usuario
    const logout = () => {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('es_admin');
    };

    // Proveo el valor del contexto para que este disponible en los componentes "hijos"
    return (
        <UserContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};