import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/NavBarComponent.css';
import { checkSesion } from '../pages/axiosConfig';

function NavBarComponent() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('vencimiento');
    localStorage.removeItem('es_admin');
    navigate('/');
  }

  return (
    <nav className="navbar">
      {!checkSesion() ? (
        <>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/register" className="nav-link">Registrarse</Link>
          <Link to="/login" className="nav-link">Iniciar Sesión</Link>
        </>
      ) : (
        <>
          <Link to="/" className="nav-link">Inicio</Link>
          
          {/* Muestra "Dar de alta juego" solo si es admin */}
          {localStorage.getItem('es_admin') === '1' && (
            <Link to="/juego" className="nav-link">Dar de alta juego</Link>
          )}
          
          <span className="username">Bienvenido, {localStorage.getItem('username')}</span>
          <button onClick={handleLogout} className="nav-link">Cerrar Sesión</button>
        </>
      )}
    </nav>
  );

}

export default NavBarComponent;