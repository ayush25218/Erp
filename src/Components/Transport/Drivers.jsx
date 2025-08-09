// src/Components/Transport/Drivers.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faPhone, faEnvelope, faPlusCircle, faEdit, faTrashAlt, faBus } from "@fortawesome/free-solid-svg-icons";

const gradients = [
    'linear-gradient(45deg, #1D4ED8, #3B82F6)', // Royal Blue to Sky Blue
    'linear-gradient(45deg, #9333EA, #DB2777)', // Dark Purple to Raspberry
    'linear-gradient(45deg, #F472B6, #FB7185)', // Pink to Rose
    'linear-gradient(45deg, #4F46E5, #8B5CF6)', // Indigo to Violet
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

const driverGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
};

const driverCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const driverPhotoStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: '1rem',
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

const Drivers = () => {
    const [drivers, setDrivers] = useState([
        { id: 1, name: 'Mr. Sharma', phone: '9876543210', assignedVehicle: 'Bus 01', photo: 'placeholder' },
        { id: 2, name: 'Ms. Gupta', phone: '9123456789', assignedVehicle: 'Bus 02', photo: 'placeholder' },
        { id: 3, name: 'Mr. Kumar', phone: '8765432109', assignedVehicle: 'Van 01', photo: 'placeholder' },
    ]);
    const [gradient, setGradient] = useState('');

    useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    const handleAddDriver = () => alert('Adding a new driver...');
    const handleEditDriver = (id) => alert(`Editing driver ${id}`);
    const handleDeleteDriver = (id) => setDrivers(drivers.filter(driver => driver.id !== id));

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faIdBadge} />
                    Drivers
                </div>
                <button onClick={handleAddDriver} style={addButton}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add New Driver
                </button>
            </div>

            <div style={driverGridStyle}>
                {drivers.map(driver => (
                    <div key={driver.id} style={driverCardStyle}>
                        <div style={driverPhotoStyle}>
                            {/* This is a placeholder for a photo */}
                            <p>Photo</p>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.5rem', textAlign: 'center' }}>{driver.name}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FontAwesomeIcon icon={faPhone} />
                                <p style={{ margin: 0, opacity: 0.9 }}>{driver.phone}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FontAwesomeIcon icon={faBus} /> {/* Corrected here */}
                                <p style={{ margin: 0, opacity: 0.9 }}>{driver.assignedVehicle}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => handleEditDriver(driver.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button onClick={() => handleDeleteDriver(driver.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drivers;