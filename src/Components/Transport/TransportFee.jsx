// src/Components/Transport/TransportFees.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faPlusCircle, faEdit, faTrashAlt, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const gradients = [
    'linear-gradient(45deg, #2DD4BF, #4ADE80)', // Mint Green to Green
    'linear-gradient(45deg, #F9A825, #F5784E)', // Golden Yellow to Coral
    'linear-gradient(45deg, #10B981, #3B82F6)', // Emerald to Blue
    'linear-gradient(45deg, #EC4899, #8B5CF6)', // Pink to Violet
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

const feeListStyle = {
    marginTop: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const feeItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    '&:last-child': {
        borderBottom: 'none',
    },
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

const TransportFees = () => {
    const [fees, setFees] = useState([
        { id: 1, route: 'Route A', amount: '₹1200', status: 'Active' },
        { id: 2, route: 'Route B', amount: '₹1000', status: 'Active' },
        { id: 3, route: 'Route C', amount: '₹1500', status: 'Active' },
    ]);
    const [gradient, setGradient] = useState('');

    useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    const handleAddFee = () => alert('Adding a new fee structure...');
    const handleEditFee = (id) => alert(`Editing fee for route ${id}`);
    const handleDeleteFee = (id) => setFees(fees.filter(fee => fee.id !== id));

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faRupeeSign} />
                    Transport Fees
                </div>
                <button onClick={handleAddFee} style={addButton}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Fee Structure
                </button>
            </div>

            <div style={feeListStyle}>
                {fees.map(fee => (
                    <div key={fee.id} style={feeItemStyle}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{fee.route}</h4>
                            <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontWeight: '600', fontSize: '1.5rem' }}>{fee.amount}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEditFee(fee.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button onClick={() => handleDeleteFee(fee.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransportFees;