import React, { useState , useEffect} from 'react';
import api, { setAuthHeader } from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/calificacionPage.css';

function CalificacionPage() {
    const [juegoID, setJuegoID] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [calificacionExistente, setCalificacionExistente] = useState(null);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    const [calificacionActual, setCalificacionActual] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        listCalification();
        const storedID = localStorage.getItem('juegoPage_id');
        if (storedID) {
            setJuegoID(storedID);
        }
    }, []);

    useEffect(() => {
        if (juegoID) {
            const calificacionExistente = listaCalificacion.find((calificacion) => calificacion.juego_id === juegoID);
            if (calificacionExistente) {
                setCalificacionExistente(calificacionExistente);
                console.log("Calificación existente: ", calificacionExistente);
                const calificacionAct = calificacionExistente.estrellas;
                if (calificacionAct !== undefined) {
                    console.log("Calificación actual: ", calificacionAct);
                    setCalificacionActual(calificacionAct);
                }
            } else {
                setCalificacionExistente(null); //para manejar estados claros en caso de no encontrar calificación.
                setCalificacionActual(null);
            }
        }
    }, [listaCalificacion, juegoID]);

    const listCalification = () => {
        setAuthHeader();
        api.get('/calificaciones')
            .then((response) => {
                setListaCalificacion(response.data);
            })
            .catch(() => {
                // window.alert('No se pudieron cargar las calificaciones del usuario.');
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthHeader();
        
        const request = calificacionExistente
            ? api.put(`/calificacion/${calificacionExistente.id}`, { juego_id: juegoID, estrellas: estrellas })
            : api.post('/calificacion', { juego_id: juegoID, estrellas: estrellas });

        request
            .then(() => {
                setEstrellas(0);
                listCalification();
                window.alert('¡Calificación enviada correctamente!');
                navigate('/');
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    window.alert('Se ha ingresado la misma calificacion! Ingrese un puntaje distinto');
                }
                setEstrellas(0);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setAuthHeader();
        const calificacionID = calificacionExistente.id;
        api.delete(`/calificacion/${calificacionID}`)
            .then(() => {
                setEstrellas(0);
                setCalificacionExistente(null);
                listCalification();
                window.alert('Calificación eliminada correctamente!');
                navigate('/');
            })
            .catch(() => {
                setEstrellas(0);
            });
    };
    
    return (
        <div className="calificacion-page">
            <h1 className="titulo">Calificar Juego</h1>

            {/* Formulario de calificación */}
            <form onSubmit={handleSubmit} className="calificacion-form">           
                <div>
                    {calificacionExistente 
                        ? <h3>Puntaje actual: {calificacionActual}</h3>
                        : <h3>Puntaje actual: Sin calificaciones</h3>
                    }
                    <h3>Ingrese la calificacion: (1-5 Estrellas):</h3>
                    <input 
                        type="number" 
                        min="1"
                        max="5"
                        value={estrellas}
                        onChange={(e) => setEstrellas(e.target.value)} 
                        required 
                    />
                </div>

                {calificacionExistente ? (
                    <>
                        <button type="submit">Editar Calificación</button>
                        <button type="button" onClick={handleDelete}>Eliminar Calificación</button>
                    </>
                ) : (
                    <button type="submit">Enviar Calificación</button>
                )}
            </form>
        </div>
    );
}

export default CalificacionPage;