import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUserTie } from 'react-icons/fa';

// Dummy data for classes, subjects, and teachers
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'];
const teachers = ['Mrs. S. Gupta', 'Mr. A. Khan', 'Mrs. K. Sharma', 'Mr. V. Singh', 'Mrs. N. Patel'];

// Initial dummy assignment data
const initialAssignments = [
    { id: 1, class: 'Class 10A', subject: 'Physics', teacher: 'Mrs. S. Gupta' },
    { id: 2, class: 'Class 10A', subject: 'Chemistry', teacher: 'Mr. A. Khan' },
    { id: 3, class: 'Class 11B', subject: 'Mathematics', teacher: 'Mrs. K. Sharma' },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '1000px',
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
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1.5rem',
    },
    addButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    tableContainer: {
        overflowX: 'auto',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHead: {
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #e5e7eb',
        transition: 'background-color 0.2s',
    },
    tableRowHover: {
        backgroundColor: '#f3f4f6',
    },
    td: {
        padding: '1rem',
        color: '#4b5563',
    },
    actionButton: {
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        marginRight: '0.5rem',
        transition: 'all 0.2s',
    },
    editButton: {
        backgroundColor: '#10b981',
        color: '#fff',
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        color: '#fff',
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
        padding: '2.5rem',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    formGroup: {
        marginBottom: '1.5rem',
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
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
    },
    modalSaveButton: {
        backgroundColor: '#2563eb',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
    },
    modalCancelButton: {
        backgroundColor: '#e5e7eb',
        color: '#4b5563',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
    },
};

const AssignTeachers = () => {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [formState, setFormState] = useState({
        class: '',
        subject: '',
        teacher: '',
    });

    const openModal = (assignment = null) => {
        setIsModalOpen(true);
        if (assignment) {
            setCurrentAssignment(assignment);
            setFormState(assignment);
        } else {
            setCurrentAssignment(null);
            setFormState({ class: '', subject: '', teacher: '' });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSave = () => {
        if (currentAssignment) {
            // Update existing assignment
            setAssignments(assignments.map(ass => (ass.id === currentAssignment.id ? { ...formState, id: ass.id } : ass)));
        } else {
            // Add new assignment
            const newAssignment = { ...formState, id: Date.now() };
            setAssignments([...assignments, newAssignment]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to unassign this teacher?')) {
            setAssignments(assignments.filter(ass => ass.id !== id));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Assign Teachers to Subjects</h1>
                <p style={styles.subheading}>Manage which teacher is assigned to which class and subject.</p>

                {/* Toolbar */}
                <div style={styles.toolbar}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal()}
                        style={styles.addButton}
                    >
                        <FaPlus />
                        <span>Assign New Teacher</span>
                    </motion.button>
                </div>

                {/* Assignments Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Class</th>
                            <th style={styles.th}>Subject</th>
                            <th style={styles.th}>Assigned Teacher</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {assignments.length > 0 ? (
                                assignments.map((assignment) => (
                                    <motion.tr
                                        key={assignment.id}
                                        style={styles.tableRow}
                                        whileHover={styles.tableRowHover}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <td style={styles.td}>{assignment.class}</td>
                                        <td style={styles.td}>{assignment.subject}</td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <FaUserTie />
                                                {assignment.teacher}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                onClick={() => openModal(assignment)}
                                                style={{ ...styles.actionButton, ...styles.editButton }}
                                            >
                                                <FaEdit />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(assignment.id)}
                                                style={{ ...styles.actionButton, ...styles.deleteButton }}
                                            >
                                                <FaTrash />
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td colSpan="4" style={{ ...styles.td, textAlign: 'center' }}>
                                        No teachers have been assigned yet.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Add/Edit Assignment Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={closeModal} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <FaTimes size={24} color="#6b7280" />
                            </button>
                            <h2 style={styles.modalHeader}>{currentAssignment ? 'Edit Assignment' : 'Assign New Teacher'}</h2>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Class</label>
                                <select
                                    name="class"
                                    value={formState.class}
                                    onChange={handleInputChange}
                                    style={styles.select}
                                    disabled={!!currentAssignment} // Disable class selection on edit
                                >
                                    <option value="">-- Select Class --</option>
                                    {classes.map((cls) => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Subject</label>
                                <select
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleInputChange}
                                    style={styles.select}
                                    disabled={!!currentAssignment} // Disable subject selection on edit
                                >
                                    <option value="">-- Select Subject --</option>
                                    {subjects.map((sub) => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Teacher</label>
                                <select
                                    name="teacher"
                                    value={formState.teacher}
                                    onChange={handleInputChange}
                                    style={styles.select}
                                >
                                    <option value="">-- Select Teacher --</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher} value={teacher}>{teacher}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.modalButtons}>
                                <button onClick={closeModal} style={styles.modalCancelButton}>Cancel</button>
                                <button onClick={handleSave} style={styles.modalSaveButton}>
                                    {currentAssignment ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AssignTeachers;