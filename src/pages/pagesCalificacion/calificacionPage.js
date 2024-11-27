import React, { useState , useEffect} from 'react';
import api, { setAuthHeader } from '../axiosConfig';
import '../styles/calificacionPage.css';

function CalificacionPage() {
    const [juegoID, setJuegoID] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [calificacionExistente, setCalificacionExistente] = useState(null);
    const [listaCalificacion, setListaCalificacion] = useState([]);
    //
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

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
            setCalificacionExistente(calificacionExistente);
            setError(null);
        }
    }, [listaCalificacion, juegoID]); // Aca el juegoID seria absurdo porque si estoy en la pagina de calificacion en teoria nunca va a cambiar

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

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
        if ( !juegoID || estrellas < 1 || estrellas > 5) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }
        
        const request = calificacionExistente
            ? api.put(`/calificacion/${calificacionExistente.id}`, { juego_id: juegoID, estrellas: estrellas })
            : api.post('/calificacion', { juego_id: juegoID, estrellas: estrellas });

        request
            .then(() => {
                setSuccessMessage('Calificación enviada correctamente!');
                setError(null);
                // setJuegoID(''); YO ACA ESTABA SETIANDO EN VACIO EL ID Y LO ESTABA PERDIENDO
                setEstrellas(0);
                listCalification(); // Si yo llamo a actualizar la lista... ¿Porque no se ejecuta el useEffect para cambiar los botones? - Solucionado
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
                // setJuegoID(''); Nuevamente, si seteo el juegoID lo pierdo y entonces ya no puedo volver a calificar
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