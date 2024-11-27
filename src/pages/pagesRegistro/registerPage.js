import React, { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import api from '../axiosConfig';
import '../styles/RegisterPage.css';

function RegistroPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const location = useLocation();

    useEffect(() => {
        setUsername('');
        setPassword('');
        setError(null);
        setSuccess(null);
    }, [location]);

    const handleRegistro = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        if (username.length < 6 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setError("El nombre de usuario debe tener entre 6 y 20 caracteres alfanuméricos.");
            return;
        }
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g.test(password)) {
            setError("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.");
            return;
        }

        api.post('/register',{ nombre_usuario: username, clave: password }).then(function (response){
                setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
                setUsername('');
                setPassword('');
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setError("El nombre de usuario ya existe!")
                } else{
                    setError("Hubo un problema con el registro. Intenta nuevamente.");
                }
            });
    };

    return (
        <div className="registro-page">
            <h2>Registro de Usuario</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleRegistro} className="registro-form">
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default RegistroPage;