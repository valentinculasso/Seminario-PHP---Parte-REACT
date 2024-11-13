import React from 'react';

const UserForm = ({ title, error, success, username, setUsername, password, setPassword, handleSubmit, buttonText }) => {
    return (
        <div className="usuario-page">
            <h2>{title}</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit} className="usuario-form">
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default UserForm;