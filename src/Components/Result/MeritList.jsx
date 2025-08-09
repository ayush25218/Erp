import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPrint, FaExclamationCircle, FaTrophy } from 'react-icons/fa';

// Dummy data for classes, exams, and merit list
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const exams = ['Mid-Term Exam', 'Final Exam'];
const academicYears = ['2024-2025', '2023-2024'];

const dummyMeritList = [
    { rollNo: '101', name: 'Rahul Sharma', totalMarks: 480, maxMarks: 500, percentage: 96.00 },
    { rollNo: '105', name: 'Sonal Gupta', totalMarks: 475, maxMarks: 500, percentage: 95.00 },
    { rollNo: '103', name: 'Amit Verma', totalMarks: 460, maxMarks: 500, percentage: 92.00 },
    { rollNo: '102', name: 'Priya Singh', totalMarks: 450, maxMarks: 500, percentage: 90.00 },
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
    meritListContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    meritListHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    meritListTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
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
    td: {
        padding: '1rem',
        borderBottom: '1px solid #d1d5db',
        color: '#4b5563',
    },
    rankCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 'bold',
    },
    firstRank: {
        color: '#ffd700',
    },
    secondRank: {
        color: '#c0c0c0',
    },
    thirdRank: {
        color: '#cd7f32',
    },
};

const MeritList = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [meritList, setMeritList] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!selectedClass || !selectedExam || !selectedYear) {
            alert('Please select Class, Exam and Academic Year to view the merit list.');
            return;
        }

        setLoading(true);
        setTimeout(() => { // Simulate API call
            // In a real app, you would fetch data from a backend
            if (selectedClass && selectedExam && selectedYear) {
                // Sort dummy data to simulate a ranked list
                const sortedList = [...dummyMeritList].sort((a, b) => b.percentage - a.percentage);
                setMeritList(sortedList);
            } else {
                setMeritList(null);
            }
            setLoading(false);
        }, 1000);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('merit-list-print').innerHTML;
        const printWindow = window.open('', '_blank');

        printWindow.document.write('<html><head><title>Merit List</title></head><body>');
        printWindow.document.write(`
      <style>
        body { font-family: sans-serif; padding: 20px; color: #333; }
        .print-container { width: 100%; max-width: 800px; margin: 0 auto; }
        .print-header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
        .print-header h1 { margin: 0; font-size: 24px; color: #2563eb; }
        .print-header p { margin: 5px 0 0; color: #555; }
        .merit-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .merit-table th, .merit-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .merit-table th { background-color: #f0f4f8; }
        .first-rank { color: #ffd700; }
        .second-rank { color: #c0c0c0; }
        .third-rank { color: #cd7f32; }
        .trophy-icon { margin-right: 5px; }
        @media print {
          button { display: none; }
          .merit-list-title { text-align: left; }
        }
      </style>
    `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
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

    const getRankColor = (rank) => {
        if (rank === 1) return styles.firstRank.color;
        if (rank === 2) return styles.secondRank.color;
        if (rank === 3) return styles.thirdRank.color;
        return '#4b5563';
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Merit List</h1>
                <p style={styles.subheading}>View the top performing students for a specific exam and class.</p>

                {/* Search Form */}
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
                        <label style={styles.label} htmlFor="year">Academic Year</label>
                        <select
                            id="year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select Year --</option>
                            {academicYears.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSearch}
                        disabled={loading || !selectedClass || !selectedExam || !selectedYear}
                        style={styles.searchButton}
                    >
                        <FaSearch />
                        <span>{loading ? 'Searching...' : 'Search Merit List'}</span>
                    </motion.button>
                </div>

                {/* Merit List Display Section */}
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
                    {!loading && meritList && (
                        <motion.div
                            key="merit-list"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={styles.meritListContainer}
                        >
                            <div id="merit-list-print">
                                <div style={styles.meritListHeader}>
                                    <div style={styles.meritListTitle}>
                                        <FaTrophy />
                                        Merit List for {selectedClass} ({selectedExam})
                                    </div>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePrint} style={styles.printButton}>
                                        <FaPrint />
                                        <span>Print</span>
                                    </motion.button>
                                </div>

                                <table style={styles.table}>
                                    <thead style={styles.tableHead}>
                                    <tr>
                                        <th style={styles.th}>Rank</th>
                                        <th style={styles.th}>Roll No.</th>
                                        <th style={styles.th}>Student Name</th>
                                        <th style={styles.th}>Total Marks</th>
                                        <th style={styles.th}>Percentage</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {meritList.map((student, index) => (
                                        <motion.tr
                                            key={student.rollNo}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            style={{ ...styles.td, borderBottom: '1px solid #d1d5db' }}
                                        >
                                            <td style={{ ...styles.td }}>
                          <span style={{ ...styles.rankCell, color: getRankColor(index + 1) }}>
                            {(index === 0 || index === 1 || index === 2) && <FaTrophy />}
                              {index + 1}
                          </span>
                                            </td>
                                            <td style={styles.td}>{student.rollNo}</td>
                                            <td style={styles.td}>{student.name}</td>
                                            <td style={styles.td}>{student.totalMarks} / {student.maxMarks}</td>
                                            <td style={styles.td}>{student.percentage.toFixed(2)}%</td>
                                        </motion.tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                    {!loading && !meritList && selectedClass && selectedExam && selectedYear && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', backgroundColor: '#fef2f2', borderRadius: '1rem' }}
                        >
                            <FaExclamationCircle size={48} color="#ef4444" />
                            <p style={{ marginTop: '1rem', color: '#ef4444', fontWeight: 'bold' }}>
                                No merit list found for the given details.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default MeritList;