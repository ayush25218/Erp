import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';

// Dummy data for Teachers, Classes, and Subjects
const teachersData = [
    { id: 1, name: 'Dr. Ramesh Kumar' },
    { id: 2, name: 'Ms. Sunita Rai' },
    { id: 3, name: 'Mr. Alok Singh' },
    { id: 4, name: 'Dr. Priya Mehta' },
];

const classesData = [
    { id: '10A', name: 'Class 10A' },
    { id: '9B', name: 'Class 9B' },
    { id: '11C', name: 'Class 11C' },
];

const subjectsData = [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'maths', name: 'Mathematics' },
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'Hindi' },
];

// Initial dummy assignment data
const initialAssignments = [
    { id: 1, teacherId: 1, teacherName: 'Dr. Ramesh Kumar', classId: '10A', className: 'Class 10A', subjectId: 'physics', subjectName: 'Physics' },
    { id: 2, teacherId: 3, teacherName: 'Mr. Alok Singh', classId: '9B', className: 'Class 9B', subjectId: 'maths', subjectName: 'Mathematics' },
    { id: 3, teacherId: 2, teacherName: 'Ms. Sunita Rai', classId: '11C', className: 'Class 11C', subjectId: 'english', subjectName: 'English' },
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
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
    },
    formRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    select: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        backgroundColor: '#fff',
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
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
    td: {
        padding: '1rem',
        color: '#4b5563',
    },
    iconButton: {
        padding: '0.5rem',
        borderRadius: '9999px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    editButton: {
        color: '#2563eb',
    },
    deleteButton: {
        color: '#ef4444',
    },
    saveButton: {
        backgroundColor: '#10b981',
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#ef4444',
        color: '#fff',
    },
    notificationSuccess: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        backgroundColor: '#d1fae5',
        color: '#065f46',
        fontWeight: 'bold',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '1rem',
    },
};

const AssignSubjects = () => {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [newAssignment, setNewAssignment] = useState({ teacherId: '', classId: '', subjectId: '' });
    const [editingId, setEditingId] = useState(null);
    const [tempEditData, setTempEditData] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddAssignment = () => {
        if (newAssignment.teacherId && newAssignment.classId && newAssignment.subjectId) {
            setIsLoading(true);
            setTimeout(() => {
                const teacher = teachersData.find(t => t.id === Number(newAssignment.teacherId));
                const classInfo = classesData.find(c => c.id === newAssignment.classId);
                const subject = subjectsData.find(s => s.id === newAssignment.subjectId);

                const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
                const newRecord = {
                    id: newId,
                    teacherId: teacher.id,
                    teacherName: teacher.name,
                    classId: classInfo.id,
                    className: classInfo.name,
                    subjectId: subject.id,
                    subjectName: subject.name,
                };

                setAssignments([...assignments, newRecord]);
                setNewAssignment({ teacherId: '', classId: '', subjectId: '' });
                setIsLoading(false);
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 2000);
            }, 1000);
        }
    };

    const handleEdit = (assignment) => {
        setEditingId(assignment.id);
        setTempEditData({
            teacherId: assignment.teacherId,
            classId: assignment.classId,
            subjectId: assignment.subjectId,
        });
    };

    const handleSaveEdit = (id) => {
        const teacher = teachersData.find(t => t.id === Number(tempEditData.teacherId));
        const classInfo = classesData.find(c => c.id === tempEditData.classId);
        const subject = subjectsData.find(s => s.id === tempEditData.subjectId);

        const updatedAssignments = assignments.map(a =>
            a.id === id
                ? {
                    ...a,
                    teacherId: teacher.id,
                    teacherName: teacher.name,
                    classId: classInfo.id,
                    className: classInfo.name,
                    subjectId: subject.id,
                    subjectName: subject.name,
                }
                : a
        );
        setAssignments(updatedAssignments);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            const updatedAssignments = assignments.filter(a => a.id !== id);
            setAssignments(updatedAssignments);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Assign Subjects</h1>
                <p style={styles.subheading}>Assign subjects to teachers for specific classes and manage the assignments.</p>

                {/* Form to add a new assignment */}
                <div style={{ ...styles.formContainer, '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'flex-end' } }}>
                    <div style={{ ...styles.formRow, '@media (min-width: 768px)': { flexDirection: 'row', flex: 1 } }}>
                        <select
                            style={styles.select}
                            value={newAssignment.teacherId}
                            onChange={(e) => setNewAssignment({ ...newAssignment, teacherId: e.target.value })}
                        >
                            <option value="">Select Teacher</option>
                            {teachersData.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            ))}
                        </select>
                        <select
                            style={styles.select}
                            value={newAssignment.classId}
                            onChange={(e) => setNewAssignment({ ...newAssignment, classId: e.target.value })}
                        >
                            <option value="">Select Class</option>
                            {classesData.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                        <select
                            style={styles.select}
                            value={newAssignment.subjectId}
                            onChange={(e) => setNewAssignment({ ...newAssignment, subjectId: e.target.value })}
                        >
                            <option value="">Select Subject</option>
                            {subjectsData.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddAssignment}
                        disabled={!newAssignment.teacherId || !newAssignment.classId || !newAssignment.subjectId || isLoading}
                        style={{
                            ...styles.addButton,
                            opacity: (!newAssignment.teacherId || !newAssignment.classId || !newAssignment.subjectId) ? 0.6 : 1,
                            cursor: (!newAssignment.teacherId || !newAssignment.classId || !newAssignment.subjectId) ? 'not-allowed' : 'pointer',
                            minWidth: '150px'
                        }}
                    >
                        {isLoading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                        <span>{isLoading ? 'Adding...' : 'Add Assignment'}</span>
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isSaved && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={styles.notificationSuccess}
                        >
                            <FaCheckCircle style={{ fontSize: '1.5rem' }} />
                            <span>Assignment added successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Assignments Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Teacher Name</th>
                            <th style={styles.th}>Class</th>
                            <th style={styles.th}>Subject</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {assignments.map(assignment => (
                            <motion.tr
                                key={assignment.id}
                                style={styles.tableRow}
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                            >
                                {editingId === assignment.id ? (
                                    <>
                                        <td style={styles.td}>
                                            <select
                                                style={styles.select}
                                                value={tempEditData.teacherId}
                                                onChange={(e) => setTempEditData({ ...tempEditData, teacherId: e.target.value })}
                                            >
                                                {teachersData.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={styles.td}>
                                            <select
                                                style={styles.select}
                                                value={tempEditData.classId}
                                                onChange={(e) => setTempEditData({ ...tempEditData, classId: e.target.value })}
                                            >
                                                {classesData.map(cls => (
                                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={styles.td}>
                                            <select
                                                style={styles.select}
                                                value={tempEditData.subjectId}
                                                onChange={(e) => setTempEditData({ ...tempEditData, subjectId: e.target.value })}
                                            >
                                                {subjectsData.map(subject => (
                                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleSaveEdit(assignment.id)}
                                                    style={{ ...styles.iconButton, ...styles.saveButton }}
                                                >
                                                    <FaSave />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setEditingId(null)}
                                                    style={{ ...styles.iconButton, ...styles.cancelButton }}
                                                >
                                                    <FaTimes />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={styles.td}>{assignment.teacherName}</td>
                                        <td style={styles.td}>{assignment.className}</td>
                                        <td style={styles.td}>{assignment.subjectName}</td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEdit(assignment)}
                                                    style={{ ...styles.iconButton, ...styles.editButton }}
                                                >
                                                    <FaEdit />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(assignment.id)}
                                                    style={{ ...styles.iconButton, ...styles.deleteButton }}
                                                >
                                                    <FaTrash />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AssignSubjects;