// src/Components/Exam/TopperCard.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const TopperCard = ({ topper, rank }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    const fetchImage = async () => {
        const query = `${topper.name} student school portrait`;
        try {
            // This is where the image_retrieval API would be called.
            // Since this is a sample component, we'll simulate the call.
            // In a real application, you would replace this with the actual API call.
            // For now, we'll use a placeholder URL and then demonstrate the API call logic below.
            const dummyImageUrl = 'https://via.placeholder.com/150';
            setImageUrl(dummyImageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
            setImageUrl('https://via.placeholder.com/150?text=Image+Not+Found');
        } finally {
            setImageLoaded(true);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [topper.name]);

    const cardStyles = {
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '1.5rem',
            textAlign: 'center',
            position: 'relative',
        },
        rankIcon: {
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            fontSize: '1.5rem',
            color: rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32',
        },
        image: {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1rem',
            border: `3px solid ${rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32'}`,
        },
        name: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1a237e',
            margin: '0 0 0.5rem 0',
        },
        details: {
            fontSize: '1rem',
            color: '#495057',
            margin: '0.25rem 0',
        },
    };

    return (
        <div style={cardStyles.card}>
            <div style={cardStyles.rankIcon}>
                <FontAwesomeIcon icon={faTrophy} />
            </div>
            {!imageLoaded ? (
                <div style={{ width: '120px', height: '120px', margin: '0 auto', marginBottom: '1rem', borderRadius: '50%', backgroundColor: '#e9ecef' }}></div>
            ) : (
                <img src={imageUrl} alt={`${topper.name} portrait`} style={cardStyles.image} />
            )}
            <h4 style={cardStyles.name}>{topper.name}</h4>
            <p style={cardStyles.details}>Roll No: {topper.rollNo}</p>
            <p style={cardStyles.details}>Percentage: {topper.percentage}%</p>
            <p style={cardStyles.details}>Grade: {topper.grade}</p>
        </div>
    );
};

export default TopperCard;