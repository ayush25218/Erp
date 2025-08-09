// src/Components/Settings/UserManagement.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog, faUserPlus, faUserEdit, faTrashAlt, faLock } from "@fortawesome/free-solid-svg-icons";

// Array of vibrant gradients
const gradients = [
    'linear-gradient(45deg, #1D4ED8, #3B82F6)', // Royal Blue to Sky Blue
    'linear-gradient(45deg, #9333EA, #DB2777)', // Dark Purple to Raspberry
    'linear-gradient(45deg, #F472B6, #FB7185)', // Pink to Rose
    'linear-gradient(45deg, #4F46E5, #8B5CF6)', // Indigo to Violet
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

const userGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
};

const userCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
};

const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
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
};

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Admin', role: 'System Admin', email: 'admin@school.edu' },
        { id: 2, name: 'Ms. Neha Gupta', role: 'Teacher', email: 'neha.g@school.edu' },
        { id: 3, name: 'Mr. Rajesh Kumar', role: 'Teacher', email: 'rajesh.k@school.edu' },
        { id: 4, name: 'Accountant', role: 'Staff', email: 'accounts@school.edu' },
    ]);
    const [gradient, setGradient] = useState(getRandomGradient());

    const handleAddUser = () => {
        // Logic to add a new user
        alert('Adding a new user...');
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted!');
    };

    React.useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faUsersCog} />
                    User Management
                </div>
                <button onClick={handleAddUser} style={addButton}>
                    <FontAwesomeIcon icon={faUserPlus} /> Add New User
                </button>
            </div>

            <div style={userGridStyle}>
                {users.map(user => (
                    <div key={user.id} style={userCardStyle}>
                        <div style={userInfoStyle}>
                            <div style={avatarStyle}>
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{user.name}</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{user.role}</p>
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>{user.email}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faUserEdit} /> Edit
                            </button>
                            <button style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faLock} /> Reset Password
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} style={actionButtonStyle}>
                                <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;