import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { setAuthHeader, checkSesion } from '../axiosConfig';
import PaginationButtonsComponent from '../../components/paginationButtonsComponent';
import '../styles/juegoPage.css';

function JuegoPage() {
    const [juegos, setJuegos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    //
    const [texto, setTexto] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    //
    const opcionesClasificacion = ['', 'ATP', '+13', '+18'];
    const [opcionesPlataforma, setOpcionesPlataforma] = useState([{id: "0", nombre: ""}]);

    useEffect(() => {
        setPagina(1);
    }, [texto, plataforma, clasificacion]);

    useEffect(() => {
        handlePlataforma();
    },[]);

    // GET plataformas
    const handlePlataforma = () => {
        setAuthHeader();
        api.get('/plataforma')
            .then((response) => {
                if(opcionesPlataforma.length < 6){
                    setOpcionesPlataforma([...opcionesPlataforma, ...response.data]);
                    setError(null);
                }
            })
            .catch((error) => {
                (error.response && error.response.status === 404)
                    ? setError("No hay plataformas que mostrar.")
                    : setError("Hubo un problema al cargar las plataformas.");
                setPlataforma([]);
            });
    }
    //

    const fetchGameData = useCallback(() => {
        console.log("clasificacion: ", clasificacion);
        const queryParams = new URLSearchParams({
            pagina,
            clasificacion: clasificacion,
            texto: texto,
            plataforma: plataforma,
        });
        api.get(`/juegos?${queryParams.toString()}`)
            .then((response) => {
                setJuegos(response.data.result);
                setTotal(Number(response.data.total));
                setError(null);
            })
            .catch((error) => {
                (error.response && error.response.status === 404)
                    ? setError("No hay juegos que mostrar en esta página.")
                    : setError("Hubo un problema al cargar los juegos.");
                setJuegos([]);
            });
    }, [pagina, texto, plataforma, clasificacion]);

    useEffect(() => {
        fetchGameData();
    }, [fetchGameData]);

    const handleButton = (juego_id) => {
        localStorage.setItem('juegoPage_id', juego_id);
        console.log('ID almacenado en localstorage en juegoPage: ',juego_id);
    }

    return (

        <>
        <div className="juego-page">
            <form className="filter-form">
                {/* Formulario de filtros */}
                <div className="filter-item">
                    <span>Texto:</span>
                    <input type="text" placeholder="Buscar por nombre" value={texto} onChange={(e) => setTexto(e.target.value)} />
                </div>
                {/* tengo que ver estilos para los select asi los muestro bien */}
                <div className="filter-item">
                    <span>Plataformas: </span>
                    <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                        {opcionesPlataforma.map((opcion) => (
                            <option key={opcion.id} value={opcion.nombre}>{opcion.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-item">
                    <span>Clasificación por Edad:</span>
                    <select value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}>
                        {opcionesClasificacion.map((opcion) => (
                            <option key={opcion} value={opcion}>{opcion}</option>
                        ))}
                    </select>
                </div>
            </form>
            {/* Tabla de juegos */}
            <table className="juego-table">
                <thead>
                    <tr>
                        <th>Id del juego</th>
                        <th>Nombre del juego</th>
                        <th>Clasificacion por edad</th>
                        <th>Plataforma</th>
                        <th>Calificación Promedio</th>
                        {checkSesion() &&
                            <th>Calificar!</th>}
                    </tr>
                </thead>
                <tbody>
                    {juegos.map((juego) => (
                        <tr key={juego.id_juego}>
                            <td>{juego.id_juego}</td>
                            <td><Link to={`/juegos/${juego.id_juego}`}>{juego.nombre_juego}</Link></td>
                            <td>{juego.clasificacion_edad}</td>
                            <td>{juego.plataformas}</td>
                            <td>{juego.calificacion_promedio}</td>
                            {checkSesion() &&
                                <td><Link to={'/calificacion'}><button type="button" onClick={() => handleButton(juego.id_juego)}>Calificar!</button></Link></td>}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mensaje de error */}
            {error && <div className="error-message">{error}</div>}

            {/* Controles de paginación */}
            <PaginationButtonsComponent
                paginaActual={pagina}
                total={total}
                onPageChange={setPagina} />
        </div></>
    );
}

export default JuegoPage;