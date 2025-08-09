import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaLayerGroup, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

// Dummy data for all available subjects
const allSubjects = [
    'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science',
    'Accountancy', 'Business Studies', 'Economics', 'History', 'Political Science',
    'Geography', 'English', 'Hindi'
];

// Initial dummy data for subject groups
const initialSubjectGroups = [
    { id: 1, name: 'Science Stream', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'] },
    { id: 2, name: 'Commerce Stream', subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'] },
    { id: 3, name: 'Arts Stream', subjects: ['History', 'Political Science', 'Geography', 'English'] },
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
    subjectTagContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    subjectTag: {
        backgroundColor: '#e2e8f0',
        borderRadius: '9999px',
        padding: '0.25rem 0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.875rem',
        color: '#1f2937',
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
        maxWidth: '600px',
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
    addSubjectButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
    }
};

const SubjectGroups = () => {
    const [subjectGroups, setSubjectGroups] = useState(initialSubjectGroups);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [formState, setFormState] = useState({
        name: '',
        subjects: [],
    });
    const [selectedSubjectToAdd, setSelectedSubjectToAdd] = useState('');

    const openModal = (group = null) => {
        setIsModalOpen(true);
        if (group) {
            setCurrentGroup(group);
            setFormState(group);
        } else {
            setCurrentGroup(null);
            setFormState({ name: '', subjects: [] });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSubjectToAdd('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSave = () => {
        if (formState.name.trim() === '' || formState.subjects.length === 0) {
            alert('Please enter a group name and add at least one subject.');
            return;
        }

        if (currentGroup) {
            // Update existing group
            setSubjectGroups(subjectGroups.map(group => (group.id === currentGroup.id ? { ...formState, id: group.id } : group)));
        } else {
            // Add new group
            const newGroup = { ...formState, id: Date.now() };
            setSubjectGroups([...subjectGroups, newGroup]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this subject group?')) {
            setSubjectGroups(subjectGroups.filter(group => group.id !== id));
        }
    };

    const addSubject = () => {
        if (selectedSubjectToAdd && !formState.subjects.includes(selectedSubjectToAdd)) {
            setFormState({ ...formState, subjects: [...formState.subjects, selectedSubjectToAdd] });
            setSelectedSubjectToAdd('');
        }
    };

    const removeSubject = (subjectToRemove) => {
        setFormState({ ...formState, subjects: formState.subjects.filter(sub => sub !== subjectToRemove) });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Subject Groups</h1>
                <p style={styles.subheading}>Create and manage subject groups for different academic streams or electives.</p>

                {/* Toolbar */}
                <div style={styles.toolbar}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal()}
                        style={styles.addButton}
                    >
                        <FaPlus />
                        <span>Create New Group</span>
                    </motion.button>
                </div>

                {/* Subject Groups Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Group Name</th>
                            <th style={styles.th}>Subjects</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {subjectGroups.length > 0 ? (
                                subjectGroups.map((group) => (
                                    <motion.tr
                                        key={group.id}
                                        style={styles.tableRow}
                                        whileHover={styles.tableRowHover}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <FaLayerGroup />
                                                {group.name}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.subjectTagContainer}>
                                                {group.subjects.map((subject, index) => (
                                                    <div key={index} style={styles.subjectTag}>{subject}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                onClick={() => openModal(group)}
                                                style={{ ...styles.actionButton, ...styles.editButton }}
                                            >
                                                <FaEdit />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(group.id)}
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
                                    <td colSpan="3" style={{ ...styles.td, textAlign: 'center' }}>
                                        No subject groups found.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Add/Edit Group Modal */}
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
                            <h2 style={styles.modalHeader}>{currentGroup ? 'Edit Subject Group' : 'Create New Subject Group'}</h2>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Group Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Science Stream"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select Subjects</label>
                                <select
                                    value={selectedSubjectToAdd}
                                    onChange={(e) => setSelectedSubjectToAdd(e.target.value)}
                                    style={styles.select}
                                >
                                    <option value="">-- Add a subject --</option>
                                    {allSubjects.filter(sub => !formState.subjects.includes(sub)).map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={addSubject}
                                    disabled={!selectedSubjectToAdd}
                                    style={styles.addSubjectButton}
                                >
                                    <FaPlusCircle />
                                    Add Subject
                                </motion.button>
                                <div style={{ ...styles.subjectTagContainer, marginTop: '1rem' }}>
                                    {formState.subjects.map(subject => (
                                        <motion.div
                                            key={subject}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            style={{ ...styles.subjectTag, backgroundColor: '#dbeafe' }}
                                        >
                                            <span>{subject}</span>
                                            <button onClick={() => removeSubject(subject)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                                                <FaMinusCircle />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.modalButtons}>
                                <button onClick={closeModal} style={styles.modalCancelButton}>Cancel</button>
                                <button onClick={handleSave} style={styles.modalSaveButton}>
                                    {currentGroup ? 'Update Group' : 'Create Group'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SubjectGroups;