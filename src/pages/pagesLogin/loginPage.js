import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Asegúrate de tener un archivo de estilos

function LoginPage({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
    
        axios.post('http://localhost:8000/login' , {nombre_usuario: username, clave: password})
            .then((response) => {
                // Cuando me logeo si no me equivoco me devolvia el token generado
                const token = response.data;
                localStorage.setItem('token', token);
                // let tokenS = localStorage.getItem('token');
                console.log(response);
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