import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/loginPage.css'; // Asegúrate de tener un archivo de estilos

function LoginPage({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/login', { username, password });
            const { token, nombreUsuario } = response.data;

            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', token);
            setUser(nombreUsuario); // Actualizar el estado del usuario en la app
        } catch (err) {
            setError("Credenciales incorrectas. Intenta de nuevo.");
        }
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