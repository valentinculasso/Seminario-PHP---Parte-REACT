import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBarComponent.css'; // Importar el archivo de estilos

function NavBarComponent() {
  return (
    <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
    </nav>
  );
}

export default NavBarComponent;