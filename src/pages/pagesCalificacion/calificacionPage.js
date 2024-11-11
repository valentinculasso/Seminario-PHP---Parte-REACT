import React, { useState } from 'react';
import { setAuthHeader } from '../axiosConfig';
import './calificacionPage.css';
import api from '../axiosConfig';

function CalificacionPage() {
    // Estados para almacenar los datos del formulario
    const [juegoID, setJuegoID] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        setAuthHeader(); // Llama a la función para establecer el token en las solicitudes

        if (juegoID === '' || estrellas < 1 || estrellas > 5) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }

        api.post('/calificacion', { juego_id: juegoID, estrellas: estrellas })
            .then(() => {
                setSuccessMessage('Calificación enviada correctamente!');
                setError(null);
                setJuegoID('');
                setEstrellas(0);
            })
            .catch(() => {
                setError('Hubo un error al enviar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };

    return (
        <div className="calificacion-page">
            <h1 className="titulo">Calificar Juego</h1>
            
            {/* Mostrar mensaje de éxito o error */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            {/* Formulario de calificación */}
            <form onSubmit={handleSubmit} className="calificacion-form">
                <div>
                    <label>Juego ID:</label>
                    <input 
                        type="text" 
                        value={juegoID} 
                        onChange={(e) => setJuegoID(e.target.value)} 
                        required 
                    />
                </div>
                
                <div>
                    <label>Estrellas (1-5):</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="5" 
                        value={estrellas} 
                        onChange={(e) => setEstrellas(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit">Enviar Calificación</button>
            </form>
        </div>
    );
}

export default CalificacionPage;