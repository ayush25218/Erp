// src/Components/Exam/Grades.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Grades = () => {
    const [grades, setGrades] = useState([
        { id: 1, gradeName: 'A+', gradePoint: 10, percentageFrom: 90, percentageTo: 100, comment: 'Outstanding' },
        { id: 2, gradeName: 'A', gradePoint: 9, percentageFrom: 80, percentageTo: 89, comment: 'Excellent' },
        { id: 3, gradeName: 'B+', gradePoint: 8, percentageFrom: 70, percentageTo: 79, comment: 'Very Good' },
        { id: 4, gradeName: 'B', gradePoint: 7, percentageFrom: 60, percentageTo: 69, comment: 'Good' },
        { id: 5, gradeName: 'C', gradePoint: 6, percentageFrom: 50, percentageTo: 59, comment: 'Satisfactory' },
        { id: 6, gradeName: 'D', gradePoint: 5, percentageFrom: 40, percentageTo: 49, comment: 'Average' },
        { id: 7, gradeName: 'E', gradePoint: 0, percentageFrom: 0, percentageTo: 39, comment: 'Fail' },
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGrade, setCurrentGrade] = useState({
        id: null,
        gradeName: '',
        gradePoint: '',
        percentageFrom: '',
        percentageTo: '',
        comment: ''
    });

    const handleAddEdit = () => {
        if (!currentGrade.gradeName || !currentGrade.gradePoint || !currentGrade.percentageTo) {
            alert('Please fill out all fields!');
            return;
        }

        if (isEditing) {
            setGrades(grades.map(grade =>
                grade.id === currentGrade.id ? currentGrade : grade
            ));
        } else {
            const newId = grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1;
            setGrades([...grades, { ...currentGrade, id: newId }]);
        }

        // Reset form
        setCurrentGrade({ id: null, gradeName: '', gradePoint: '', percentageFrom: '', percentageTo: '', comment: '' });
        setIsEditing(false);
    };

    const handleEditClick = (grade) => {
        setCurrentGrade(grade);
        setIsEditing(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this grade?')) {
            setGrades(grades.filter(grade => grade.id !== id));
        }
    };

    const styles = {
        container: {
            fontFamily: "'Poppins', sans-serif",
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        header: {
            color: '#1a237e',
            textAlign: 'center',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '600',
        },
        formCard: {
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            marginBottom: '2rem',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#343a40',
        },
        input: {
            padding: '0.75rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '1rem',
        },
        buttonGroup: {
            gridColumn: '1 / -1', // Span across all columns
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '1rem',
        },
        button: {
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        addButton: {
            backgroundColor: '#28a745',
            ':hover': { backgroundColor: '#218838' },
        },
        editButton: {
            backgroundColor: '#007bff',
            ':hover': { backgroundColor: '#0056b3' },
        },
        cancelButton: {
            backgroundColor: '#6c757d',
            ':hover': { backgroundColor: '#5a6268' },
        },
        tableCard: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            overflowX: 'auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '700px',
        },
        tableHeader: {
            backgroundColor: '#e9ecef',
            color: '#495057',
            textAlign: 'left',
            fontWeight: '600',
        },
        tableCell: {
            padding: '15px 20px',
            borderBottom: '1px solid #dee2e6',
        },
        actionButton: {
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            marginRight: '0.5rem',
        },
        editIcon: {
            color: '#007bff',
            ':hover': { color: '#0056b3' },
        },
        deleteIcon: {
            color: '#dc3545',
            ':hover': { color: '#c82333' },
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Grade System Management</h3>

            {/* Form to Add/Edit Grades */}
            <div style={styles.formCard}>
                <form style={styles.form} onSubmit={(e) => { e.preventDefault(); handleAddEdit(); }}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Grade Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={currentGrade.gradeName}
                            onChange={(e) => setCurrentGrade({ ...currentGrade, gradeName: e.target.value })}
                            placeholder="e.g., A+"
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Grade Point</label>
                        <input
                            style={styles.input}
                            type="number"
                            value={currentGrade.gradePoint}
                            onChange={(e) => setCurrentGrade({ ...currentGrade, gradePoint: e.target.value })}
                            placeholder="e.g., 10"
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Percentage From</label>
                        <input
                            style={styles.input}
                            type="number"
                            value={currentGrade.percentageFrom}
                            onChange={(e) => setCurrentGrade({ ...currentGrade, percentageFrom: e.target.value })}
                            placeholder="e.g., 90"
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Percentage To</label>
                        <input
                            style={styles.input}
                            type="number"
                            value={currentGrade.percentageTo}
                            onChange={(e) => setCurrentGrade({ ...currentGrade, percentageTo: e.target.value })}
                            placeholder="e.g., 100"
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Comment</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={currentGrade.comment}
                            onChange={(e) => setCurrentGrade({ ...currentGrade, comment: e.target.value })}
                            placeholder="e.g., Outstanding"
                        />
                    </div>
                    <div style={styles.buttonGroup}>
                        {isEditing ? (
                            <>
                                <button type="submit" style={{ ...styles.button, ...styles.editButton }}>
                                    <FontAwesomeIcon icon={faEdit} /> Update Grade
                                </button>
                                <button type="button" onClick={() => {
                                    setIsEditing(false);
                                    setCurrentGrade({ id: null, gradeName: '', gradePoint: '', percentageFrom: '', percentageTo: '', comment: '' });
                                }} style={{ ...styles.button, ...styles.cancelButton }}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button type="submit" style={{ ...styles.button, ...styles.addButton }}>
                                <FontAwesomeIcon icon={faPlus} /> Add New Grade
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Grades Table */}
            <div style={styles.tableCard}>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Grade Name</th>
                        <th style={styles.tableCell}>Grade Point</th>
                        <th style={styles.tableCell}>Percentage Range</th>
                        <th style={styles.tableCell}>Comment</th>
                        <th style={styles.tableCell}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {grades.map(grade => (
                        <tr key={grade.id}>
                            <td style={styles.tableCell}>{grade.gradeName}</td>
                            <td style={styles.tableCell}>{grade.gradePoint}</td>
                            <td style={styles.tableCell}>{grade.percentageFrom}% - {grade.percentageTo}%</td>
                            <td style={styles.tableCell}>{grade.comment}</td>
                            <td style={styles.tableCell}>
                                <button onClick={() => handleEditClick(grade)} style={{ ...styles.actionButton, ...styles.editIcon }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDeleteClick(grade.id)} style={{ ...styles.actionButton, ...styles.deleteIcon }}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Grades;