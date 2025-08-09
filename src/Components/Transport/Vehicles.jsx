// src/Components/Transport/Vehicles.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faIdCard, faShieldAlt, faPlusCircle, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const gradients = [
    'linear-gradient(45deg, #00C9FF, #92FE9D)', // Light Blue to Light Green
    'linear-gradient(45deg, #FF7B7B, #F9D5A6)', // Peach to Pale Yellow
    'linear-gradient(45deg, #C471ED, #F6C5FF)', // Magenta to Lavender
    'linear-gradient(45deg, #FFA72F, #FF7A64)', // Orange to Coral
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

const vehicleGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
};

const vehicleCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const vehicleImageStyle = {
    width: '100%',
    height: '180px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1rem',
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

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([
        { id: 1, number: 'UP65 BC 1234', type: 'Bus', capacity: 45, status: 'Active', photo: 'placeholder' },
        { id: 2, number: 'UP65 CD 5678', type: 'Bus', capacity: 40, status: 'Active', photo: 'placeholder' },
        { id: 3, number: 'UP65 AB 9101', type: 'Van', capacity: 15, status: 'Under Maintenance', photo: 'placeholder' },
    ]);
    const [gradient, setGradient] = useState('');

    useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    const handleAddVehicle = () => alert('Adding a new vehicle...');
    const handleEditVehicle = (id) => alert(`Editing vehicle ${id}`);
    const handleDeleteVehicle = (id) => setVehicles(vehicles.filter(vehicle => vehicle.id !== id));

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faBus} />
                    Vehicles
                </div>
                <button onClick={handleAddVehicle} style={addButton}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add New Vehicle
                </button>
            </div>

            <div style={vehicleGridStyle}>
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} style={vehicleCardStyle}>
                        <div style={vehicleImageStyle}>
                            {/* This is a placeholder for an image */}
                            <p>{vehicle.type} Photo</p>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.5rem' }}>{vehicle.number}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                            <span>Type: {vehicle.type}</span>
                            <span>Capacity: {vehicle.capacity}</span>
                        </div>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            background: vehicle.status === 'Active' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            color: vehicle.status === 'Active' ? '#d1fae5' : '#fee2e2',
                            fontWeight: '600',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            fontSize: '0.8rem',
                            alignSelf: 'flex-start'
                        }}>
              {vehicle.status}
            </span>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button onClick={() => handleEditVehicle(vehicle.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button onClick={() => handleDeleteVehicle(vehicle.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vehicles;