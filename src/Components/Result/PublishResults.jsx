import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaBullhorn, FaSave, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Dummy Data
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const exams = ['Mid-Term Exam', 'Final Exam', 'Unit Test-1'];
const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
const dummyStudents = [
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
    marksTableContainer: {
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
    marksInput: {
        width: '100%',
        padding: '0.5rem',
        textAlign: 'center',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        outline: 'none',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
    },
    publishButton: {
        backgroundColor: '#10b981',
        color: '#fff',
    },
    draftButton: {
        backgroundColor: '#6b7280',
        color: '#fff',
    },
};

const PublishResult = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [studentMarks, setStudentMarks] = useState([]);

    useEffect(() => {
        // This effect would fetch students based on selectedClass from an API
        if (selectedClass) {
            setStudentMarks(
                dummyStudents.map(student => ({
                    ...student,
                    marks: '', // Initial empty marks
                }))
            );
        } else {
            setStudentMarks([]);
        }
    }, [selectedClass]);

    const handleMarksChange = (studentId, marks) => {
        setStudentMarks(prevMarks =>
            prevMarks.map(student =>
                student.id === studentId ? { ...student, marks: marks } : student
            )
        );
    };

    const handlePublish = () => {
        if (!selectedClass || !selectedExam || !selectedSubject) {
            alert('Please select Class, Exam, and Subject before publishing.');
            return;
        }
        console.log('Publishing Results:', {
            class: selectedClass,
            exam: selectedExam,
            subject: selectedSubject,
            results: studentMarks,
        });
        alert('Results published successfully!');
    };

    const handleSaveAsDraft = () => {
        if (!selectedClass || !selectedExam || !selectedSubject) {
            alert('Please select Class, Exam, and Subject before saving as draft.');
            return;
        }
        console.log('Saving Results as Draft:', {
            class: selectedClass,
            exam: selectedExam,
            subject: selectedSubject,
            results: studentMarks,
        });
        alert('Results saved as draft!');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Publish Exam Results</h1>
                <p style={styles.subheading}>Select the exam details and enter student marks to publish results.</p>

                {/* Selection Form */}
                <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="class">Select Class</label>
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
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="exam">Select Exam</label>
                        <select
                            id="exam"
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select Exam --</option>
                            {exams.map((exam) => (
                                <option key={exam} value={exam}>{exam}</option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="subject">Select Subject</label>
                        <select
                            id="subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select Subject --</option>
                            {subjects.map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Student Marks Entry Section */}
                <AnimatePresence>
                    {selectedClass && selectedExam && selectedSubject && (
                        <motion.div
                            key="marks-entry"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={styles.marksTableContainer}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
                                Enter Marks for {selectedSubject} ({selectedExam})
                            </h3>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table style={styles.table}>
                                    <thead style={styles.tableHead}>
                                    <tr>
                                        <th style={styles.th}>Roll No.</th>
                                        <th style={styles.th}>Student Name</th>
                                        <th style={styles.th}>Marks Obtained</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {studentMarks.map((student) => (
                                        <tr key={student.id} style={styles.tableRow}>
                                            <td style={styles.td}>{student.rollNo}</td>
                                            <td style={styles.td}>{student.name}</td>
                                            <td style={styles.td}>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100" // Adjust max marks as needed
                                                    value={student.marks}
                                                    onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                                    style={styles.marksInput}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div style={styles.buttonGroup}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveAsDraft}
                        style={{ ...styles.button, ...styles.draftButton }}
                    >
                        <FaSave />
                        <span>Save as Draft</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePublish}
                        style={{ ...styles.button, ...styles.publishButton }}
                    >
                        <FaBullhorn />
                        <span>Publish Result</span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default PublishResult;