import React from 'react';

function PaginationButtonsComponent({ paginaActual, total, onPageChange }) {

    const elementosPorPagina = 5;
    const totalPaginas = Math.ceil(total / elementosPorPagina);

    // Manejo de la página siguiente
    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            onPageChange(paginaActual + 1);
        }
    };

    // Manejo de la página anterior
    const handlePaginaAnterior = () => {
        if (paginaActual > 1) {
            onPageChange(paginaActual - 1);
        }
    };

    return (
        total > elementosPorPagina && (
            <div className="pagination-controls">
                <button
                    onClick={handlePaginaAnterior}
                    disabled={paginaActual === 1}
                    className="pagination-button"
                >
                    Anterior
                </button>
                <span className="pagination-info">
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button
                    onClick={handlePaginaSiguiente}
                    disabled={paginaActual === totalPaginas}
                    className="pagination-button"
                >
                    Siguiente
                </button>
            </div>
        )
    );
}

export default PaginationButtonsComponent;