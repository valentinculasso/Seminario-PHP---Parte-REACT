import React, { useState, useEffect } from 'react';
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

    // Usamos useEffect para cargar el id desde localStorage cuando el componente se monta
    useEffect(() => {
        const storedID = localStorage.getItem('juego_id');
        console.log('ID almacenado:', storedID); // Verifica si el ID está correcto
        if (storedID) {
            setID(storedID); // Establecemos el id al valor de localStorage
        }
    }, []); // El array vacío asegura que esto solo se ejecute al montar el componente

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