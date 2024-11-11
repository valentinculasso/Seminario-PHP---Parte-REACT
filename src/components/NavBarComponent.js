import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../pages/pagesLogin/userContext'; // Importo el contexto
import '../assets/styles/NavBarComponent.css';

function NavBarComponent() {

  const { user, logout , isAdmin} = useUser(); // Uso el contexto

  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>

        {!user && (
        <Link to="/register" className="nav-link">Registrarse</Link>
        )}

        {user ? (
                <>
                  <Link to="/calificacion" className="nav-link">Calificar juego</Link>
                  {isAdmin && (
                    <Link to="/juego" className="nav-link">Dar de alta juego</Link> // Solo si es admin
                  )}
                  <span className="username">Bienvenido, {user.username}</span>
                  <button onClick={logout} className="">Cerrar Sesión</button>
                </>
          ) : (
              <Link to="/login" className="nav-link">Iniciar Sesion</Link>
        )}
    </nav>
  );

}

export default NavBarComponent;