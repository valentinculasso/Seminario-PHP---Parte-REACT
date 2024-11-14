import React, { useState } from 'react';
import { setAuthHeader } from '../axiosConfig';
import './soporteJuego.css';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function AltaJuego() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(''); // ESTO LO TENGO QUE CAMBIAR USO STRING PARA PROBAR QUE FUNCIONE NOMAS
    const [clasificacionEdad, setClasificacionEdad] = useState('ATP');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const opcionesClasificacion = ['ATP', '+13', '+18'];

    // Función para convertir la imagen a base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onloadend = () => {
            setImagen(data.result); // imagen en base64
        };
        if (file) {
            data.readAsDataURL(file);
        }
    };

    // Manejador de envío del formulario
    const handleSubmitGame = (e) => {
        e.preventDefault();
        
        setAuthHeader();

        // Usar FormData para manejar la imagen y otros datos
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen); // Imagen como archivo
        formData.append('clasificacion_edad', clasificacionEdad);

        // Enviar el formulario al endpoint del backend
        api.post('/juego', formData)
            .then((response) => {
                setSuccessMessage('Juego agregado exitosamente.');
                setError(null);
                const id = response.data.juego_id;
                localStorage.setItem('juego_id', id);
                console.log('ID guardado en localStorage:', id); // Verifico que el id se este guardando
                navigate('/soporte'); // Redirige a otra página si es necesario
            })
            .catch(() => {
                setError('Error al agregar el juego.');
                setSuccessMessage('');
            });
    };

    return(
        <div className="nuevo-juego-form">
            <h2>Alta de un Nuevo Juego</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
        
            <form onSubmit={handleSubmitGame}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        maxLength="45" 
                        required 
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                        <input 
                            type="file" 
                            accept="image/jpeg" 
                            onChange={handleImageChange} 
                            required 
                        />
                </div>
                <div>
                    <label>Clasificación por Edad:</label>
                    <select value={clasificacionEdad} onChange={(e) => setClasificacionEdad(e.target.value)}>
                        {opcionesClasificacion.map((opcion) => (
                            <option key={opcion} value={opcion}>{opcion}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Agregar Juego</button>
            </form>
        </div>
    );  
}

export default AltaJuego;