import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPrint, FaUser, FaBook, FaCalendarAlt, FaCheck, FaTimes, FaExclamationCircle } from 'react-icons/fa';
// Dummy data for classes, exams, and results
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const exams = ['Mid-Term Exam', 'Final Exam', 'Unit Test-1'];

const dummyResults = [
    {
        rollNo: '101',
        name: 'Rahul Sharma',
        class: 'Class 10A',
        exam: 'Mid-Term Exam',
        subjects: [
            { name: 'Physics', marks: 85, maxMarks: 100, status: 'Pass', grade: 'A' },
            { name: 'Chemistry', marks: 78, maxMarks: 100, status: 'Pass', grade: 'B+' },
            { name: 'Biology', marks: 92, maxMarks: 100, status: 'Pass', grade: 'A+' },
        ],
        totalMarks: 255,
        maxTotalMarks: 300,
        percentage: 85.00,
    },
    {
        rollNo: '102',
        name: 'Priya Singh',
        class: 'Class 10A',
        exam: 'Mid-Term Exam',
        subjects: [
            { name: 'Physics', marks: 45, maxMarks: 100, status: 'Pass', grade: 'C' },
            { name: 'Chemistry', marks: 32, maxMarks: 100, status: 'Fail', grade: 'F' },
            { name: 'Biology', marks: 68, maxMarks: 100, status: 'Pass', grade: 'B' },
        ],
        totalMarks: 145,
        maxTotalMarks: 300,
        percentage: 48.33,
    },
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
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    select: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    searchButton: {
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
        marginTop: '1.5rem',
        justifyContent: 'center',
    },
    resultCard: {
        backgroundColor: '#f9fafb',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    resultHeader: {
        borderBottom: '2px solid #2563eb',
        paddingBottom: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    studentInfo: {
        lineHeight: '1.5',
    },
    resultTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1.5rem',
    },
    resultTableHeader: {
        backgroundColor: '#e5e7eb',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
        color: '#4b5563',
    },
    td: {
        padding: '1rem',
        borderBottom: '1px solid #d1d5db',
        color: '#4b5563',
    },
    passStatus: {
        color: '#10b981',
        fontWeight: 'bold',
    },
    failStatus: {
        color: '#ef4444',
        fontWeight: 'bold',
    },
    totalRow: {
        backgroundColor: '#e0f2fe',
        fontWeight: 'bold',
    },
    printButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
};

const ViewResult = () => {
    const [rollNo, setRollNo] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => { // Simulate API call
            const foundResult = dummyResults.find(
                (res) =>
                    res.rollNo === rollNo &&
                    res.class === selectedClass &&
                    res.exam === selectedExam
            );
            setResult(foundResult);
            setLoading(false);
        }, 1000);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('result-card-print').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Result</title></head><body>');
        printWindow.document.write(`<div style="font-family: sans-serif; padding: 20px;">${printContent}</div>`);
        printWindow.document.write('<style>@media print { button { display: none; } }</style>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>View Result</h1>
                <p style={styles.subheading}>Search for a student's result by entering the details below.</p>

                {/* Search Form */}
                <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="rollNo">Roll No.</label>
                        <input
                            type="text"
                            id="rollNo"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="e.g., 101"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="class">Class</label>
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
                        <label style={styles.label} htmlFor="exam">Exam</label>
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
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSearch}
                        disabled={loading || !rollNo || !selectedClass || !selectedExam}
                        style={styles.searchButton}
                    >
                        <FaSearch />
                        <span>{loading ? 'Searching...' : 'Search Result'}</span>
                    </motion.button>
                </div>

                {/* Result Display Section */}
                <AnimatePresence>
                    {loading && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', marginTop: '2rem', color: '#4b5563' }}
                        >
                            Loading...
                        </motion.p>
                    )}
                    {!loading && result && (
                        <motion.div
                            key="result-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={styles.resultCard}
                            id="result-card-print"
                        >
                            <div style={styles.resultHeader}>
                                <div style={styles.studentInfo}>
                                    <h2 style={{ margin: '0', fontSize: '1.5rem', color: '#1f2937' }}>{result.name}</h2>
                                    <p style={{ margin: '0', color: '#6b7280' }}>Roll No: {result.rollNo} | {result.class}</p>
                                    <p style={{ margin: '0', color: '#6b7280', fontWeight: 'bold' }}>{result.exam}</p>
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePrint} style={styles.printButton}>
                                    <FaPrint />
                                    <span>Print</span>
                                </motion.button>
                            </div>

                            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>Subject-wise Marks</h3>
                            <table style={styles.resultTable}>
                                <thead style={styles.resultTableHeader}>
                                <tr>
                                    <th style={styles.th}>Subject</th>
                                    <th style={styles.th}>Marks</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Grade</th>
                                </tr>
                                </thead>
                                <tbody>
                                {result.subjects.map((subject, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #d1d5db' }}>
                                        <td style={styles.td}>{subject.name}</td>
                                        <td style={styles.td}>{subject.marks}/{subject.maxMarks}</td>
                                        <td style={styles.td}>
                        <span style={subject.status === 'Pass' ? styles.passStatus : styles.failStatus}>
                          {subject.status === 'Pass' ? <FaCheck /> : <FaTimes />} {subject.status}
                        </span>
                                        </td>
                                        <td style={styles.td}>{subject.grade}</td>
                                    </tr>
                                ))}
                                <tr style={styles.totalRow}>
                                    <td style={styles.td}>Total</td>
                                    <td style={styles.td}>{result.totalMarks}/{result.maxTotalMarks}</td>
                                    <td style={styles.td}>Percentage: {result.percentage.toFixed(2)}%</td>
                                    <td style={styles.td}></td>
                                </tr>
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                    {!loading && !result && rollNo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', backgroundColor: '#fef2f2', borderRadius: '1rem' }}
                        >
                            <FaExclamationCircle size={48} color="#ef4444" />
                            <p style={{ marginTop: '1rem', color: '#ef4444', fontWeight: 'bold' }}>
                                No result found for the given details.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ViewResult;