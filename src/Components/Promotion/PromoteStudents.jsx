import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Dummy data for classes and students
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const studentsInClass10A = [
    { id: 1, name: 'Rahul Sharma', rollNo: '101' },
    { id: 2, name: 'Priya Singh', rollNo: '102' },
    { id: 3, name: 'Amit Verma', rollNo: '103' },
    { id: 4, name: 'Sonal Gupta', rollNo: '104' },
    { id: 5, name: 'Vikas Kumar', rollNo: '105' },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem',
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    subheading: {
        color: '#6b7280',
        marginBottom: '2rem',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '1rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        display: 'block',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    select: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    studentTableContainer: {
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '1rem',
        marginBottom: '2rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHead: {
        backgroundColor: '#e5e7eb',
        color: '#4b5563',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #d1d5db',
    },
    td: {
        padding: '1rem',
        color: '#4b5563',
    },
    promoteButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
        backgroundColor: '#10b981',
        color: '#fff',
        marginLeft: 'auto',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
    },
    modalHeader: {
        fontSize: '1.5rem',
        color: '#1f2937',
        marginBottom: '1rem',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '1.5rem',
    },
    confirmButton: {
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
    },
};

const PromoteStudents = () => {
    const [currentClass, setCurrentClass] = useState('');
    const [promoteToClass, setPromoteToClass] = useState('');
    const [students, setStudents] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isPromoted, setIsPromoted] = useState(false);

    const handleClassSelect = (e) => {
        const selectedClass = e.target.value;
        setCurrentClass(selectedClass);
        // In a real app, this would be an API call to get students of the selected class
        if (selectedClass === 'Class 10A') {
            setStudents(studentsInClass10A);
        } else {
            setStudents([]);
        }
        // Reset promotion status
        setIsPromoted(false);
    };

    const handlePromoteConfirmation = () => {
        if (!currentClass || !promoteToClass) {
            alert('Please select both current and promotion classes.');
            return;
        }
        setShowConfirmation(true);
    };

    const handlePromote = () => {
        console.log(`Promoting students from ${currentClass} to ${promoteToClass}. Students:`, students.map(s => s.name));
        // Simulate API call for promotion
        setTimeout(() => {
            setShowConfirmation(false);
            setIsPromoted(true);
            // Reset selections after promotion
            setCurrentClass('');
            setPromoteToClass('');
            setStudents([]);
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Promote Students</h1>
                <p style={styles.subheading}>Easily promote an entire class of students to the next academic level.</p>

                {/* Selection Form */}
                <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="current-class">Current Class</label>
                        <select
                            id="current-class"
                            value={currentClass}
                            onChange={handleClassSelect}
                            style={styles.select}
                        >
                            <option value="">-- Select Current Class --</option>
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="promote-to-class">Promote To Class</label>
                        <select
                            id="promote-to-class"
                            value={promoteToClass}
                            onChange={(e) => setPromoteToClass(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select Class to Promote --</option>
                            {classes.filter(cls => cls !== currentClass).map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePromoteConfirmation}
                        disabled={!currentClass || !promoteToClass || students.length === 0}
                        style={{ ...styles.promoteButton, marginTop: '1.5rem' }}
                    >
                        <FaArrowRight />
                        <span>Promote Class</span>
                    </motion.button>
                </div>

                {/* Student List Section */}
                <AnimatePresence>
                    {students.length > 0 && (
                        <motion.div
                            key="student-list"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={styles.studentTableContainer}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
                                Students to be Promoted ({students.length})
                            </h3>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table style={styles.table}>
                                    <thead style={styles.tableHead}>
                                    <tr>
                                        <th style={styles.th}>Roll No.</th>
                                        <th style={styles.th}>Student Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id} style={styles.tableRow}>
                                            <td style={styles.td}>{student.rollNo}</td>
                                            <td style={styles.td}>{student.name}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success/Error Message */}
                <AnimatePresence>
                    {isPromoted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#10b981', borderRadius: '0.75rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}
                        >
                            <FaCheckCircle />
                            <span>Students successfully promoted to **{promoteToClass}**!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={() => setShowConfirmation(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaExclamationCircle size={48} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                            <h3 style={styles.modalHeader}>Confirm Promotion</h3>
                            <p>Are you sure you want to promote all students from **{currentClass}** to **{promoteToClass}**?</p>
                            <p style={{ color: '#ef4444', fontWeight: 'bold' }}>This action cannot be undone.</p>
                            <div style={styles.modalButtons}>
                                <button style={styles.cancelButton} onClick={() => setShowConfirmation(false)}>Cancel</button>
                                <button style={styles.confirmButton} onClick={handlePromote}>Confirm</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PromoteStudents;