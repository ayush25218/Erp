// src/Components/Transport/Routes.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faRoute, faPlusCircle, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const gradients = [
    'linear-gradient(45deg, #17C3B2, #47A2DA)', // Teal to Sky Blue
    'linear-gradient(45deg, #FF6B6B, #FFD93D)', // Sunset Orange to Yellow
    'linear-gradient(45deg, #A855F7, #EC4899)', // Purple to Pink
    'linear-gradient(45deg, #F97316, #FBBF24)', // Orange to Amber
];

const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

const containerStyle = (gradient) => ({
    background: gradient,
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '3rem',
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    transition: 'background 0.5s ease',
});

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    paddingBottom: '1rem',
};

const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
};

const addButton = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'transform 0.2s, background 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
        background: 'rgba(255, 255, 255, 0.3)',
    },
};

const routeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
};

const routeCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const actionButtonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background 0.2s',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.3)',
    },
};

const mapPlaceholderStyle = {
    width: '100%',
    height: '300px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px dashed rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '2rem',
};

const Routes = () => {
    const [routes, setRoutes] = useState([
        { id: 1, name: 'Route A', stops: 12, vehicle: 'Bus 01', driver: 'Mr. Sharma' },
        { id: 2, name: 'Route B', stops: 8, vehicle: 'Bus 02', driver: 'Ms. Gupta' },
        { id: 3, name: 'Route C', stops: 15, vehicle: 'Van 01', driver: 'Mr. Kumar' },
    ]);
    const [gradient, setGradient] = useState('');

    useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    const handleAddRoute = () => alert('Adding a new route...');
    const handleEditRoute = (id) => alert(`Editing route ${id}`);
    const handleDeleteRoute = (id) => setRoutes(routes.filter(route => route.id !== id));

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                    Transport Routes
                </div>
                <button onClick={handleAddRoute} style={addButton}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add New Route
                </button>
            </div>

            <div style={routeGridStyle}>
                {routes.map(route => (
                    <div key={route.id} style={routeCardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, fontSize: '1.5rem' }}>
                                <FontAwesomeIcon icon={faRoute} style={{ marginRight: '0.5rem' }} />
                                {route.name}
                            </h4>
                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.2)', fontSize: '0.8rem', fontWeight: '600' }}>
                {route.stops} Stops
              </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.8 }}>Vehicle: {route.vehicle}</p>
                        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.8 }}>Driver: {route.driver}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button onClick={() => handleEditRoute(route.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button onClick={() => handleDeleteRoute(route.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={mapPlaceholderStyle}>
                <p>Map visualization of transport routes will appear here.</p>
            </div>
        </div>
    );
};

export default Routes;