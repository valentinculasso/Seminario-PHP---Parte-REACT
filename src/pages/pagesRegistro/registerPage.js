import React, { useState } from 'react';
import api from '../axiosConfig';
import './RegisterPage.css'; // Asegúrate de tener un archivo de estilos

function RegistroPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);   

    const handleRegistro = (e) => {
        e.preventDefault(); // Previene el envío predeterminado del formulario y recarga de la página
        setError(null);
        setSuccess(null);
        
        if (username.length < 6 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setError("El nombre de usuario debe tener entre 6 y 20 caracteres alfanuméricos.");
            return;
        }
        if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/g.test(password)) {
            setError("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.");
            return;
        }

        api.post('/register',{ nombre_usuario: username, clave: password }).then(function (response){
                setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
                setUsername('');
                setPassword('');
            })
            .catch(() => {
                setError("Hubo un problema con el registro. Intenta nuevamente.");
            });
    };

    return (
        <div className="registro-page">
            <h2>Registro de Usuario</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            {/* onSubmit "captura" el evento de clic o enter en el boton de registrarse y llama a la funcion handleRegistro*/}
            <form onSubmit={handleRegistro} className="registro-form">
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        /* onChange: es un evento de React, se avtica cada vez que cambia el valor de un campo de entrada*/
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