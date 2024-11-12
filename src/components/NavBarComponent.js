import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../pages/pagesLogin/userContext'; // Importo el contexto
import { useNavigate } from 'react-router-dom';
import '../assets/styles/NavBarComponent.css';

function NavBarComponent() {

  const navigate = useNavigate();
  const { user, logout , isAdmin} = useUser(); // Uso el contexto

  // useEffect para redirigir ¿? 

  const handleLogout = () => {
    logout();
    navigate('/');
  }

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
                  <button onClick={handleLogout} className="">Cerrar Sesión</button>
                </>
          ) : (
              <Link to="/login" className="nav-link">Iniciar Sesion</Link>
        )}
    </nav>
  );

}

export default NavBarComponent;