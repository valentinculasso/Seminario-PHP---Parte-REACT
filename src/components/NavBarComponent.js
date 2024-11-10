import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBarComponent.css'; // Importar el archivo de estilos

function NavBarComponent({ user, onLogout}) {
  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>
        {!user && (
        <Link to="/register" className="nav-link">Register</Link>
        )}
        {user ? (
                <>
                    <Link to="/calificacion" className="nav-link">Calificar juego</Link>
                    <span className="username">Bienvenido, {user.username}</span>
                    <button onClick={onLogout} className="">Cerrar Sesión</button>
                </>
            ) : (
                <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            )}
    </nav>
  );

  // Falta: hacerle estilos al boton de cerrar sesion, y falta usar user como estado global
}

export default NavBarComponent;