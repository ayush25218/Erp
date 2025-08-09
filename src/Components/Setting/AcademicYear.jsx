// src/Components/Settings/AcademicYear.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faCheckCircle, faPlus, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

// Array of vibrant gradients
const gradients = [
    'linear-gradient(45deg, #00C9FF, #92FE9D)', // Light Blue to Light Green
    'linear-gradient(45deg, #FF7B7B, #F9D5A6)', // Peach to Pale Yellow
    'linear-gradient(45deg, #5EEAD4, #34D399)', // Cyan to Emerald Green
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
    minHeight: '400px',
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

const buttonBaseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    color: 'white',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    },
};

const addButton = {
    ...buttonBaseStyle,
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
};

const listContainerStyle = {
    display: 'grid',
    gap: '1rem',
    marginTop: '2rem',
};

const listItemStyle = (isActive) => ({
    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: isActive ? '2px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    },
});

const actionButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    marginRight: '0.5rem',
};

const AcademicYear = () => {
    const [years, setYears] = useState([
        { id: 1, name: '2023-2024', isActive: false },
        { id: 2, name: '2024-2025', isActive: true },
        { id: 3, name: '2025-2026', isActive: false },
    ]);
    const [newYearName, setNewYearName] = useState('');
    const [gradient, setGradient] = useState(getRandomGradient());

    const handleAddYear = () => {
        if (newYearName.trim()) {
            const newYear = {
                id: Date.now(),
                name: newYearName,
                isActive: false,
            };
            setYears([...years, newYear]);
            setNewYearName('');
        }
    };

    const handleDeleteYear = (id) => {
        setYears(years.filter(year => year.id !== id));
    };

    const handleSetActive = (id) => {
        setYears(years.map(year => ({
            ...year,
            isActive: year.id === id,
        })));
    };

    React.useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faCalendarPlus} />
                    Academic Year Management
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Enter new year (e.g., 2026-2027)"
                        value={newYearName}
                        onChange={(e) => setNewYearName(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'rgba(255, 255, 255, 0.9)', color: '#333' }}
                    />
                    <button onClick={handleAddYear} style={addButton}>
                        <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                </div>
            </div>

            <div style={listContainerStyle}>
                {years.map(year => (
                    <div key={year.id} style={listItemStyle(year.isActive)}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{year.name}</h4>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                                {year.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <div>
                            {!year.isActive && (
                                <button onClick={() => handleSetActive(year.id)} style={actionButtonStyle}>
                                    <FontAwesomeIcon icon={faCheckCircle} /> Activate
                                </button>
                            )}
                            <button onClick={() => handleDeleteYear(year.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicYear;