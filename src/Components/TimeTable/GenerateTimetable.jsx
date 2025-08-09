// src/Components/Timetable/GenerateTimetable.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faMagic } from '@fortawesome/free-solid-svg-icons';

const GenerateTimetable = ({ theme }) => {
    const [constraints, setConstraints] = useState([]);
    const [newConstraint, setNewConstraint] = useState({ type: 'class', value: '' });

    const handleAddConstraint = () => {
        if (newConstraint.value) {
            setConstraints([...constraints, newConstraint]);
            setNewConstraint({ type: 'class', value: '' });
        }
    };

    const handleRemoveConstraint = (index) => {
        setConstraints(constraints.filter((_, i) => i !== index));
    };

    const handleGenerate = () => {
        // Here you would send the constraints to a backend for processing
        alert('Timetable generation started with the following constraints: ' + JSON.stringify(constraints));
        // You would then get the generated timetable and display it
    };

    const styles = {
        container: { color: theme.text },
        header: { color: theme.primary, borderBottom: `2px solid ${theme.border}`, paddingBottom: '1rem', marginBottom: '1.5rem' },
        form: { marginBottom: '2rem' },
        inputGroup: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
        select: { flex: '1', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.cardBackground, color: theme.text, fontSize: '1rem' },
        input: { flex: '2', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.cardBackground, color: theme.text, fontSize: '1rem' },
        button: { padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' },
        addButton: { backgroundColor: theme.primary, color: '#ffffff' },
        generateButton: { backgroundColor: '#28a745', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' },
        constraintList: { marginBottom: '1.5rem' },
        constraintItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.hover, padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem' },
        removeButton: { background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' },
    };

    return (
        <div style={styles.container}>
            <h4 style={styles.header}>Generate Timetable</h4>
            <p style={{ color: theme.subText }}>सेट करें कि कौन से विषय या शिक्षक किस समय उपलब्ध नहीं हैं, फिर timetable generate करें।</p>

            <div style={styles.form}>
                <div style={styles.inputGroup}>
                    <select
                        value={newConstraint.type}
                        onChange={(e) => setNewConstraint({...newConstraint, type: e.target.value})}
                        style={styles.select}
                    >
                        <option value="class">Class</option>
                        <option value="teacher">Teacher</option>
                        <option value="subject">Subject</option>
                        <option value="room">Room</option>
                    </select>
                    <input
                        type="text"
                        value={newConstraint.value}
                        onChange={(e) => setNewConstraint({...newConstraint, value: e.target.value})}
                        placeholder="Constraint e.g., '10th A'"
                        style={styles.input}
                    />
                    <button onClick={handleAddConstraint} style={{ ...styles.button, ...styles.addButton }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>

            <div style={styles.constraintList}>
                {constraints.map((constraint, index) => (
                    <div key={index} style={styles.constraintItem}>
                        <span><strong>{constraint.type}:</strong> {constraint.value}</span>
                        <button onClick={() => handleRemoveConstraint(index)} style={styles.removeButton}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={handleGenerate} style={{ ...styles.button, ...styles.generateButton }}>
                <FontAwesomeIcon icon={faMagic} /> Generate Timetable
            </button>
        </div>
    );
};

export default GenerateTimetable;