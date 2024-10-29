import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBarComponent.css'; // Importar el archivo de estilos

function NavBarComponent() {
  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/juegos"className="nav-link">Juegos</Link>
        <Link to="/registro" className="nav-link">Registro</Link>
        <Link to="/login" className="nav-link">Login</Link>
    </nav>
  );
}

export default NavBarComponent;