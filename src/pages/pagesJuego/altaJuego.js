import React, { useEffect, useState } from 'react';
import { setAuthHeader } from '../axiosConfig';
import '../styles/altaJuego.css';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function AltaJuego() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [clasificacionEdad, setClasificacionEdad] = useState('ATP');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [plataforma, setPlataforma] = useState([]);
    const navigate = useNavigate();
    // ABAJO CHECKBOX
    const [seleccionados, setSeleccionados] = useState([]);

    const opcionesClasificacion = ['ATP', '+13', '+18'];

    useEffect(() => {
        handlePlataforma();
    },[]);

    // GET plataformas
    const handlePlataforma = () => {
        setAuthHeader();
        api.get('/plataforma')
            .then((response) => {
                setPlataforma(response.data);
                //console.log(response.data);
                setError(null);
            })
            .catch((error) => {
                (error.response && error.response.status === 404)
                    ? setError("No hay plataformas que mostrar.")
                    : setError("Hubo un problema al cargar las plataformas.");
                setPlataforma([]);
            });
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onloadend = () => {
            setImagen(data.result);
        };
        if (file) {
            data.readAsDataURL(file);
        }
    };

    const handleSupport = () => {
        const idJuego = localStorage.getItem('id');
        if (!idJuego) {
            setError('No se pudo encontrar el ID del juego.');
            return;
        }
        seleccionados.forEach((plataformaId) => {
            console.log(plataformaId);
            console.log(localStorage.getItem('id'));
            api.post('/soporte', { juego_id: idJuego, plataforma_id: plataformaId })
                .then(() => {
                    console.log(`Soporte para plataforma ${plataformaId} agregado exitosamente.`);
                })
                .catch(() => {
                    setError('Error al agregar el soporte.');
                    console.log(error);
                    setSuccessMessage('');
                });
        });
        navigate('/');
    };

    const handleSubmitGame = (e) => {
        e.preventDefault();
        setAuthHeader();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);
        formData.append('clasificacion_edad', clasificacionEdad);

        api.post('/juego', formData)
            .then((response) => {
                setSuccessMessage('Juego agregado exitosamente.');
                localStorage.setItem('id', response.data.juego_id);
                console.log('ID del juego (de alta):', localStorage.getItem('id'));
                setError(null);
                handleSupport();
            })
            .catch(() => {
                setError('Error al agregar el juego.');
                setSuccessMessage('');
            });
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSeleccionados((prevSeleccionados) => {
            if (checked) {
                // Si se marca el checkbox, agrega el valor al estado
                return [...prevSeleccionados, value];
            } else {
                // Si se desmarca el checkbox, elimina el valor del estado
                return prevSeleccionados.filter((item) => item !== value);
            }
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
                <div>
                    <label>Soporte:</label>
                    <div>
                        {plataforma.map((opcion) => (
                            <div key={opcion.id}>
                                <input 
                                    type="checkbox" 
                                    id={opcion.id} 
                                    value={opcion.id}
                                    onChange={handleCheckboxChange} 
                                />
                                <label htmlFor={opcion.id}>{opcion.nombre}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">Agregar Juego</button>
            </form>
        </div>
    );  
}

export default AltaJuego;