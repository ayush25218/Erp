import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';

// Dummy data for subjects
const initialSubjects = [
    { id: 1, name: 'Physics', code: 'PHY101', teacher: 'Mrs. S. Gupta' },
    { id: 2, name: 'Chemistry', code: 'CHE102', teacher: 'Mr. A. Khan' },
    { id: 3, name: 'Mathematics', code: 'MAT103', teacher: 'Mrs. K. Sharma' },
    { id: 4, name: 'Biology', code: 'BIO104', teacher: 'Mr. V. Singh' },
    { id: 5, name: 'English', code: 'ENG105', teacher: 'Mrs. N. Patel' },
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
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        borderRadius: '9999px',
        border: '1px solid #d1d5db',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize: '1rem',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
    },
    addButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#10b981',
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
        backgroundColor: '#2563eb',
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
    input: {
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
        backgroundColor: '#10b981',
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

const AllSubjects = () => {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [formState, setFormState] = useState({
        name: '',
        code: '',
        teacher: '',
    });

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (subject = null) => {
        setIsModalOpen(true);
        if (subject) {
            setCurrentSubject(subject);
            setFormState(subject);
        } else {
            setCurrentSubject(null);
            setFormState({ name: '', code: '', teacher: '' });
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
        if (currentSubject) {
            // Update existing subject
            setSubjects(subjects.map(sub => (sub.id === currentSubject.id ? { ...formState, id: sub.id } : sub)));
        } else {
            // Add new subject
            const newSubject = { ...formState, id: Date.now() };
            setSubjects([...subjects, newSubject]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            setSubjects(subjects.filter(sub => sub.id !== id));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>All Subjects</h1>
                <p style={styles.subheading}>Manage and organize all academic subjects in the school.</p>

                {/* Toolbar */}
                <div style={{ ...styles.toolbar, '@media (min-width: 768px)': { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }}>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal()}
                        style={styles.addButton}
                    >
                        <FaPlus />
                        <span>Add New Subject</span>
                    </motion.button>
                </div>

                {/* Subjects Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Subject Name</th>
                            <th style={styles.th}>Subject Code</th>
                            <th style={styles.th}>Teacher</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {filteredSubjects.length > 0 ? (
                                filteredSubjects.map((subject) => (
                                    <motion.tr
                                        key={subject.id}
                                        style={styles.tableRow}
                                        whileHover={styles.tableRowHover}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <td style={styles.td}>{subject.name}</td>
                                        <td style={styles.td}>{subject.code}</td>
                                        <td style={styles.td}>{subject.teacher}</td>
                                        <td style={styles.td}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                onClick={() => openModal(subject)}
                                                style={{ ...styles.actionButton, ...styles.editButton }}
                                            >
                                                <FaEdit />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(subject.id)}
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
                                        No subjects found.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Add/Edit Subject Modal */}
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
                            <h2 style={styles.modalHeader}>{currentSubject ? 'Edit Subject' : 'Add New Subject'}</h2>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Subject Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Physics"
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Subject Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formState.code}
                                    onChange={handleInputChange}
                                    placeholder="e.g., PHY101"
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Assigned Teacher</label>
                                <input
                                    type="text"
                                    name="teacher"
                                    value={formState.teacher}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mrs. S. Gupta"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.modalButtons}>
                                <button onClick={closeModal} style={styles.modalCancelButton}>Cancel</button>
                                <button onClick={handleSave} style={styles.modalSaveButton}>Save</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllSubjects;