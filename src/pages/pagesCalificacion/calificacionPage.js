import React, { useState , useEffect} from 'react';
import api, { setAuthHeader } from '../axiosConfig';
import '../styles/calificacionPage.css';

function CalificacionPage() {
    const [juegoID, setJuegoID] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [calificacionID, setCalificacionID] = useState(null);
    const [calificacionExistente, setCalificacionExistente] = useState(null);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    //
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        listCalification();
        const storedID = localStorage.getItem('juegoPage_id');
        console.log('ID que recupero en calificacionPage:', storedID);
        if (storedID) {
            setJuegoID(storedID);
        }
    }, []);

    const listCalification = () => {
        setAuthHeader();
        api.get('/calificaciones')
            .then((response) => {
                setListaCalificacion(response.data);
                setError(null);
            })
            .catch(() => {
                setError('No se pudieron cargar las calificaciones del usuario.');
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthHeader();
        if (juegoID === '' || estrellas < 1 || estrellas > 5) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }
        if(calificacionExistente){
            setCalificacionID(calificacionExistente.id);
        }
        const request = calificacionExistente
            ? api.put(`/calificacion/${calificacionID}`, { juego_id: juegoID, estrellas: estrellas })
            : api.post('/calificacion', { juego_id: juegoID, estrellas: estrellas });

        request
            .then(() => {
                setSuccessMessage('Calificación enviada correctamente!');
                setError(null);
                setJuegoID('');
                setEstrellas(0);
                listCalification();
            })
            .catch(() => {
                setError('Hubo un error al enviar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setAuthHeader();
        const calificacionID = calificacionExistente.id;
        api.delete(`/calificacion/${calificacionID}`)
            .then(() => {
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('Calificación eliminada correctamente!');
                setCalificacionExistente(null);
                setError(null);
                listCalification();
            })
            .catch(() => {
                setError('No se pudo eliminar la calificación.');
                setJuegoID('');
                setEstrellas(0);
                setSuccessMessage('');
            });
    };
    useEffect(() => {
        if (juegoID) {
            const calificacionExistente = listaCalificacion.find((calificacion) => calificacion.juego_id === juegoID);
            setCalificacionExistente(calificacionExistente);
            setError(null);
        }
    }, [listaCalificacion, juegoID]);

    return (
        <div className="calificacion-page">
            <h1 className="titulo">Calificar Juego</h1>
            
            {/* Mostrar mensaje de éxito o error */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            {/* Formulario de calificación */}
            <form onSubmit={handleSubmit} className="calificacion-form">           
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