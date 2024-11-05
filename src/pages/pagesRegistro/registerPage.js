import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Asegúrate de tener un archivo de estilos

function RegistroPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    /* 
    const handleRegistro = 
    axios.post('/user', { firstName: 'Fred', lastName: 'Flintstone'}).then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    */

    const handleRegistro = async (e) => {
        e.preventDefault(); // Previene el envío predeterminado del formulario y recarga de la página
        setError(null);
        setSuccess(null);

        // Validaciones
        if (username.length < 6 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            setError("El nombre de usuario debe tener entre 6 y 20 caracteres alfanuméricos.");
            return;
        }
        if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/g.test(password)) {
            setError("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.");
            return;
        }

        try {
            // Espera la respuesta de la solicitud de registro usando await
            const response = await axios.post('http://localhost:8000/registro', { username, password });
            // Si llega aca -> solicitud exitosa
            setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
            setUsername('');
            setPassword('');
        } catch (err) {
            setError("Hubo un problema con el registro. Intenta nuevamente.");
        }
    };

    return (
        <div className="registro-page">
            <h2>Registro de Usuario</h2>
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
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
        </div>
    );
}

export default RegistroPage;