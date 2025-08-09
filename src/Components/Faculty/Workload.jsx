import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaBook, FaTimes, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

// Dummy data for faculty members
const facultyData = [
    { id: 1, name: 'Dr. Ramesh Kumar', photo: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 2, name: 'Ms. Sunita Rai', photo: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: 3, name: 'Mr. Alok Singh', photo: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { id: 4, name: 'Dr. Priya Mehta', photo: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { id: 5, name: 'Ms. Kavita Sharma', photo: 'https://randomuser.me/api/portraits/women/15.jpg' },
];

// Dummy data for subject assignments
const subjectAssignments = [
    { teacherId: 1, class: '10A', subject: 'Physics' },
    { teacherId: 1, class: '11B', subject: 'Physics' },
    { teacherId: 1, class: '12C', subject: 'Physics' },
    { teacherId: 2, class: '9A', subject: 'English' },
    { teacherId: 2, class: '10A', subject: 'English' },
    { teacherId: 3, class: '11C', subject: 'Mathematics' },
    { teacherId: 3, class: '12A', subject: 'Mathematics' },
    { teacherId: 4, class: '10A', subject: 'Chemistry' },
    { teacherId: 5, class: '9B', subject: 'History' },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem',
    },
    subheading: {
        color: '#6b7280',
        marginBottom: '2rem',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1.5rem',
    },
    filterButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3b82f6',
        color: '#fff',
        borderRadius: '9999px',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
    },
    workloadGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
    },
    facultyCard: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '1.5rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    facultyCardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    cardImage: {
        width: '96px',
        height: '96px',
        borderRadius: '9999px',
        objectFit: 'cover',
        margin: '0 auto 1rem',
        border: '4px solid #3b82f6',
    },
    cardName: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.25rem',
    },
    cardWorkload: {
        fontSize: '1rem',
        color: '#4b5563',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    },
    progressBarContainer: {
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '9999px',
        overflow: 'hidden',
        height: '8px',
    },
    progressBar: {
        height: '100%',
        transition: 'width 0.5s ease-in-out',
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
        maxWidth: '500px',
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
    modalHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    modalName: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    assignmentList: {
        marginTop: '1.5rem',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1.5rem',
    },
    assignmentItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '0.75rem',
    },
    assignmentText: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
    },
    assignmentSubText: {
        fontSize: '0.875rem',
        color: '#6b7280',
    },
};

const Workload = () => {
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [sortBy, setSortBy] = useState('desc'); // 'asc' or 'desc'

    const getWorkload = (teacherId) => {
        return subjectAssignments.filter(assignment => assignment.teacherId === teacherId);
    };

    const facultyWithWorkload = facultyData.map(faculty => ({
        ...faculty,
        workload: getWorkload(faculty.id),
        workloadCount: getWorkload(faculty.id).length,
    }));

    const maxWorkload = Math.max(...facultyWithWorkload.map(f => f.workloadCount));

    const sortedFaculty = [...facultyWithWorkload].sort((a, b) => {
        if (sortBy === 'asc') {
            return a.workloadCount - b.workloadCount;
        }
        return b.workloadCount - a.workloadCount;
    });

    const getProgressBarColor = (count) => {
        const percentage = (count / maxWorkload) * 100;
        if (percentage > 75) return '#ef4444';
        if (percentage > 50) return '#f97316';
        return '#10b981';
    };

    const toggleSort = () => {
        setSortBy(sortBy === 'desc' ? 'asc' : 'desc');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Faculty Workload</h1>
                <p style={styles.subheading}>View and manage the teaching load of each faculty member.</p>

                <div style={styles.toolbar}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSort}
                        style={styles.filterButton}
                    >
                        {sortBy === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                        <span>Sort by Workload ({sortBy === 'desc' ? 'High to Low' : 'Low to High'})</span>
                    </motion.button>
                </div>

                <div style={styles.workloadGrid}>
                    <AnimatePresence>
                        {sortedFaculty.map(faculty => (
                            <motion.div
                                key={faculty.id}
                                whileHover={styles.facultyCardHover}
                                style={styles.facultyCard}
                                onClick={() => setSelectedFaculty(faculty)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={faculty.photo} alt={faculty.name} style={styles.cardImage} />
                                <h3 style={styles.cardName}>{faculty.name}</h3>
                                <p style={styles.cardWorkload}>
                                    <FaBook /> {faculty.workloadCount} Subject{faculty.workloadCount !== 1 ? 's' : ''}
                                </p>
                                <div style={styles.progressBarContainer}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(faculty.workloadCount / maxWorkload) * 100}%` }}
                                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                                        style={{ ...styles.progressBar, backgroundColor: getProgressBarColor(faculty.workloadCount) }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Faculty Workload Details Modal */}
            <AnimatePresence>
                {selectedFaculty && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={() => setSelectedFaculty(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedFaculty(null)} style={styles.modalCloseButton}>
                                <FaTimes size={24} color="#6b7280" />
                            </button>
                            <div style={styles.modalHeader}>
                                <img src={selectedFaculty.photo} alt={selectedFaculty.name} style={{ ...styles.cardImage, width: '64px', height: '64px', margin: 0 }} />
                                <div>
                                    <h2 style={styles.modalName}>{selectedFaculty.name}</h2>
                                    <p style={{ ...styles.cardWorkload, margin: 0 }}>
                                        Total Assignments: {selectedFaculty.workloadCount}
                                    </p>
                                </div>
                            </div>

                            <div style={styles.assignmentList}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Assigned Subjects</h3>
                                {selectedFaculty.workload.length > 0 ? (
                                    selectedFaculty.workload.map((assignment, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            style={styles.assignmentItem}
                                        >
                                            <div>
                                                <p style={styles.assignmentText}>{assignment.subject}</p>
                                                <p style={styles.assignmentSubText}>Class: {assignment.class}</p>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: '#6b7280' }}>No subjects assigned.</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Workload;