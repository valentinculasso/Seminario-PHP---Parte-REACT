import React, { useState } from 'react';
import { setAuthHeader } from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './altaJuego.css';
import api from '../axiosConfig';

function SoporteJuego() {
    const [id, setID] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmitSupport = (e) => {
        e.preventDefault();
        
        setAuthHeader();

        if (!(plataforma >= 1 || plataforma <= 5)) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }

        api.post('/soporte', { juego_id: id, plataforma_id: plataforma })
            .then(() => {
                setSuccessMessage('Soporte agregado exitosamente.');
                setError(null);
                navigate('/'); // Vuelve a inicio
            })
            .catch(() => {
                setError('Error al agregar el soporte.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="nuevo-juego-form">
            <h2>Agregar Soporte al Juego</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
        
            <form onSubmit={handleSubmitSupport}>
                <div>
                    <label>ID del Juego:</label>
                    <input 
                        type="text" 
                        value={id} 
                        onChange={(e) => setID(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Plataforma:</label>
                    <input 
                        type="text" 
                        value={plataforma} 
                        onChange={(e) => setPlataforma(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit">Agregar Soporte</button>
            </form>
        </div>
    );
}

export default SoporteJuego;