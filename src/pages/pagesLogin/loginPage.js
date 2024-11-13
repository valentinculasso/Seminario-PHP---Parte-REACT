import React, { useState } from 'react';
import api from '../axiosConfig';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
    
        api.post('/login' , {nombre_usuario: username, clave: password})
            .then((response) => {
                const token = response.data.result;
                const vencimiento = response.data.vencimiento_token;
                const admin = response.data.es_admin;
                localStorage.setItem('token', token);
                localStorage.setItem('vencimiento', vencimiento);
                localStorage.setItem('es_admin', admin);
                localStorage.setItem('username', username);
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