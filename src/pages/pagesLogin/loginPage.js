import React, { useState } from 'react';
import api from '../axiosConfig';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const decodificarToken = (tokenBase64) => {
        try {
        const jsonToken = atob(tokenBase64);
        return JSON.parse(jsonToken);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return null;
        }
  };

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        console.log(username, password);
        api.post('/login' , {nombre_usuario: username, clave: password})
            .then((response) => {
                const token = response.data;
                localStorage.setItem('token', token);
                console.log(token);
                const datosToken = decodificarToken(token);
                const userID = datosToken.id;
                const vencimiento = datosToken.date;
                const admin = datosToken.admin;
                // usar los 4 de abajo en "profile"
                //json.stringify
                localStorage.setItem('username', username);
                localStorage.setItem('id', userID);
                localStorage.setItem('vencimiento', vencimiento);
                localStorage.setItem('es_admin', admin);
                navigate('/');
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