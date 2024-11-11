import React, { useState } from 'react';
import { useUser } from './userContext';
import api from '../axiosConfig';
import './LoginPage.css'; // Asegúrate de tener un archivo de estilos
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

function LoginPage({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // nuevo
    const { login } = useUser(); // Uso el contexto para el login

    const navigate = useNavigate(); // Hook de navegación

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
    
        api.post('/login' , {nombre_usuario: username, clave: password})
            .then((response) => {
                // Cuando le doy a "iniciar sesion" me devuelve el token generado
                const token = response.data;
                localStorage.setItem('token', token);
                login({ username });

                navigate('/'); // Al darle a iniciar sesion me lleva a la pagina de inicio
            })
            .catch(() => {
                setError("Credenciales incorrectas. Intenta de nuevo.");
            });
    };
    
    return (
        <div className="login-page">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default LoginPage;