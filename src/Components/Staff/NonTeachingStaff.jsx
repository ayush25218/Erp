import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaEnvelope, FaPhone, FaTimes, FaBriefcase, FaBuilding } from 'react-icons/fa';

// Dummy data for non-teaching staff members
const nonTeachingStaffData = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        designation: 'Accountant',
        department: 'Administration',
        photo: 'https://randomuser.me/api/portraits/men/21.jpg',
        email: 'ramesh.k@school.edu',
        phone: '+91 98765 43210',
        bio: 'Manages all financial transactions and bookkeeping for the school, ensuring accurate and timely financial records.',
    },
    {
        id: 2,
        name: 'Sunita Rai',
        designation: 'Librarian',
        department: 'Library',
        photo: 'https://randomuser.me/api/portraits/women/22.jpg',
        email: 'sunita.r@school.edu',
        phone: '+91 98765 43211',
        bio: 'Oversees the school library, manages book circulation, and helps students with research and reading recommendations.',
    },
    {
        id: 3,
        name: 'Alok Singh',
        designation: 'IT Support',
        department: 'IT',
        photo: 'https://randomuser.me/api/portraits/men/23.jpg',
        email: 'alok.s@school.edu',
        phone: '+91 98765 43212',
        bio: 'Provides technical support for all school hardware and software, ensuring a seamless digital learning environment.',
    },
    {
        id: 4,
        name: 'Priya Mehta',
        designation: 'Front Desk Officer',
        department: 'Administration',
        photo: 'https://randomuser.me/api/portraits/women/24.jpg',
        email: 'priya.m@school.edu',
        phone: '+91 98765 43213',
        bio: 'The first point of contact for visitors and parents. Manages inquiries, schedules appointments, and handles administrative tasks.',
    },
    {
        id: 5,
        name: 'Vikram Patel',
        designation: 'Sports Coach',
        department: 'Sports',
        photo: 'https://randomuser.me/api/portraits/men/25.jpg',
        email: 'vikram.p@school.edu',
        phone: '+91 98765 43214',
        bio: 'Trains students for various sports and organizes inter-school tournaments and sports events.',
    },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    header: {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
    },
    searchContainer: {
        position: 'relative',
        maxWidth: '500px',
        margin: '0 auto',
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        borderRadius: '9999px',
        border: '1px solid #d1d5db',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize: '1rem',
        transition: 'all 0.2s',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
    },
    staffGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    cardImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        objectPosition: 'center',
        borderBottom: '4px solid #3b82f6',
    },
    cardContent: {
        padding: '1.5rem',
    },
    cardName: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.25rem',
    },
    cardDesignation: {
        fontSize: '0.875rem',
        color: '#4b5563',
        marginBottom: '0.5rem',
    },
    cardDepartment: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#2563eb',
        backgroundColor: '#eff6ff',
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 100,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    modalCloseButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
    },
    modalImage: {
        width: '120px',
        height: '120px',
        borderRadius: '9999px',
        objectFit: 'cover',
        margin: '0 auto 1.5rem',
        border: '4px solid #3b82f6',
    },
    modalInfo: {
        marginBottom: '1rem',
    },
    modalInfoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        color: '#4b5563',
    },
    modalBio: {
        marginTop: '1.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #e5e7eb',
        color: '#374151',
    },
};

const NonTeachingStaff = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);

    const filteredStaff = nonTeachingStaffData.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <div style={styles.header}>
                    <h1 style={styles.title}>Non-Teaching Staff</h1>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by name, designation, or department..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                <div style={styles.staffGrid}>
                    <AnimatePresence>
                        {filteredStaff.map(member => (
                            <motion.div
                                key={member.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                layout
                                whileHover={styles.cardHover}
                                style={styles.card}
                                onClick={() => setSelectedStaff(member)}
                            >
                                <img src={member.photo} alt={member.name} style={styles.cardImage} />
                                <div style={styles.cardContent}>
                                    <h3 style={styles.cardName}>{member.name}</h3>
                                    <p style={styles.cardDesignation}>{member.designation}</p>
                                    <span style={styles.cardDepartment}>{member.department}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedStaff && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={() => setSelectedStaff(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedStaff(null)} style={styles.modalCloseButton}>
                                <FaTimes size={24} color="#6b7280" />
                            </button>
                            <img src={selectedStaff.photo} alt={selectedStaff.name} style={styles.modalImage} />
                            <h2 style={{ ...styles.title, textAlign: 'center' }}>{selectedStaff.name}</h2>
                            <p style={{ ...styles.cardDesignation, textAlign: 'center', fontSize: '1rem' }}>{selectedStaff.designation}</p>

                            <div style={styles.modalInfo}>
                                <p style={styles.modalInfoItem}>
                                    <FaBuilding color="#2563eb" />
                                    <span>{selectedStaff.department}</span>
                                </p>
                                <p style={styles.modalInfoItem}>
                                    <FaBriefcase color="#2563eb" />
                                    <span>{selectedStaff.designation}</span>
                                </p>
                                <p style={styles.modalInfoItem}>
                                    <FaEnvelope color="#2563eb" />
                                    <span>{selectedStaff.email}</span>
                                </p>
                                <p style={styles.modalInfoItem}>
                                    <FaPhone color="#2563eb" />
                                    <span>{selectedStaff.phone}</span>
                                </p>
                            </div>

                            <div style={styles.modalBio}>
                                <p style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>About</p>
                                <p>{selectedStaff.bio}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NonTeachingStaff;