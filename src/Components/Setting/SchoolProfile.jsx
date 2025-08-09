// src/Components/Settings/SchoolProfile.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool, faUserTie, faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

// Array of vibrant gradients
const gradients = [
    'linear-gradient(45deg, #FF6B6B, #FFD93D)', // Sunset Orange to Yellow
    'linear-gradient(45deg, #17C3B2, #47A2DA)', // Teal to Sky Blue
    'linear-gradient(45deg, #A855F7, #EC4899)', // Purple to Pink
    'linear-gradient(45deg, #2DD4BF, #4ADE80)', // Mint Green to Green
    'linear-gradient(45deg, #F9A825, #F5784E)', // Golden Yellow to Coral
];

// Function to get a random gradient
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
    display: 'flex',
    flexDirection: 'column',
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

const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
};

const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const iconWrapperStyle = {
    fontSize: '1.5rem',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.2)',
};

const inputContainerStyle = {
    marginBottom: '1.5rem',
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    fontSize: '0.9rem',
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
};

const buttonBaseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    },
};

const saveButtonStyle = {
    ...buttonBaseStyle,
    background: '#34D399', // Green
    color: 'white',
};

const cancelButtonStyle = {
    ...buttonBaseStyle,
    background: '#F87171', // Red
    color: 'white',
};

const editButtonStyle = {
    ...buttonBaseStyle,
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
};

const SchoolProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        schoolName: "St. Xavier's High School",
        principalName: "Mr. Alok Sharma",
        address: "123, Main Street, Patna, Bihar",
        phone: "+91 98765 43210",
        email: "contact@stxavierspatna.edu",
        website: "www.stxavierspatna.edu",
    });
    const [gradient, setGradient] = useState(getRandomGradient());

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({ ...prevState, [name]: value }));
    };

    // Update gradient on mount for a new color each time
    React.useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faSchool} />
                    School Profile
                </div>
                {!isEditing && (
                    <button onClick={handleEdit} style={editButtonStyle}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                )}
            </div>

            {!isEditing ? (
                <div style={contentGridStyle}>
                    <div style={cardStyle}>
                        <div style={iconWrapperStyle}><FontAwesomeIcon icon={faSchool} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>School Name</p>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{profileData.schoolName}</h4>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={iconWrapperStyle}><FontAwesomeIcon icon={faUserTie} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Principal</p>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{profileData.principalName}</h4>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={iconWrapperStyle}><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Address</p>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{profileData.address}</h4>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={iconWrapperStyle}><FontAwesomeIcon icon={faPhone} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Phone</p>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{profileData.phone}</h4>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={iconWrapperStyle}><FontAwesomeIcon icon={faEnvelope} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Email</p>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{profileData.email}</h4>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={iconWrapperStyle}><FontAwesomeIcon icon={faGlobe} /></div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Website</p>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{profileData.website}</h4>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={contentGridStyle}>
                        {Object.keys(profileData).map(key => (
                            <div key={key} style={inputContainerStyle}>
                                <label style={labelStyle} htmlFor={key}>
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={profileData[key]}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={buttonContainerStyle}>
                        <button onClick={handleSave} style={saveButtonStyle}>
                            <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button onClick={handleCancel} style={cancelButtonStyle}>
                            <FontAwesomeIcon icon={faTimes} /> Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolProfile;