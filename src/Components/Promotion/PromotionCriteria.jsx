import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaSave, FaCheckCircle, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

// Dummy data for classes and subjects
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const allSubjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English'];

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
    formContainer: {
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
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
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
    },
    subjectTagContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: '0.5rem',
    },
    subjectTag: {
        backgroundColor: '#e2e8f0',
        borderRadius: '9999px',
        padding: '0.25rem 0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    tagText: {
        fontSize: '0.875rem',
        color: '#1f2937',
    },
    tagRemoveButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#ef4444',
    },
    saveButton: {
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
    successMessage: {
        padding: '1rem',
        backgroundColor: '#d1fae5',
        color: '#10b981',
        borderRadius: '0.75rem',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
    },
};

const PromotionCriteria = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [minimumPercentage, setMinimumPercentage] = useState('');
    const [mandatorySubjects, setMandatorySubjects] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        if (!selectedClass || !minimumPercentage) {
            alert('Please select a class and a minimum percentage.');
            return;
        }

        console.log('Saving promotion criteria:', {
            class: selectedClass,
            minimumPercentage: minimumPercentage,
            mandatorySubjects: mandatorySubjects,
        });

        // Simulate API call and show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const addSubject = (subject) => {
        if (subject && !mandatorySubjects.includes(subject)) {
            setMandatorySubjects([...mandatorySubjects, subject]);
        }
    };

    const removeSubject = (subjectToRemove) => {
        setMandatorySubjects(mandatorySubjects.filter(subject => subject !== subjectToRemove));
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Set Promotion Criteria</h1>
                <p style={styles.subheading}>Define the rules for promoting students to the next class.</p>

                <div style={styles.formContainer}>
                    {/* Class Selection */}
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="class">Select Class to Apply Criteria</label>
                        <select
                            id="class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select Class --</option>
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    {/* Minimum Percentage */}
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="min-percent">Minimum Overall Percentage (%)</label>
                        <input
                            type="number"
                            id="min-percent"
                            value={minimumPercentage}
                            onChange={(e) => setMinimumPercentage(e.target.value)}
                            placeholder="e.g., 40"
                            style={styles.input}
                        />
                    </div>

                    {/* Mandatory Subjects */}
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="mandatory-subjects">Mandatory Subjects to Pass</label>
                        <select
                            id="mandatory-subjects"
                            onChange={(e) => addSubject(e.target.value)}
                            value=""
                            style={styles.select}
                        >
                            <option value="">-- Add a subject --</option>
                            {allSubjects.filter(sub => !mandatorySubjects.includes(sub)).map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                        <div style={styles.subjectTagContainer}>
                            {mandatorySubjects.map((subject) => (
                                <motion.div
                                    key={subject}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    style={styles.subjectTag}
                                >
                                    <span style={styles.tagText}>{subject}</span>
                                    <button onClick={() => removeSubject(subject)} style={styles.tagRemoveButton}>
                                        <FaMinusCircle />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={!selectedClass || !minimumPercentage}
                        style={styles.saveButton}
                    >
                        <FaSave />
                        <span>Save Criteria</span>
                    </motion.button>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={styles.successMessage}
                        >
                            <FaCheckCircle />
                            <span>Promotion criteria saved successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PromotionCriteria;