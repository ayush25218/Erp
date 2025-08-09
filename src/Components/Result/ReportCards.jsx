import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPrint, FaExclamationCircle, FaUser, FaSchool, FaBook, FaCalendarAlt } from 'react-icons/fa';

// Dummy data for classes, exams, and students
const classes = ['Class 10A', 'Class 11B', 'Class 12C'];
const exams = ['Mid-Term Exam', 'Final Exam'];
const students = ['Rahul Sharma', 'Priya Singh', 'Amit Verma'];

// Dummy report card data
const dummyReportCard = {
    rollNo: '101',
    name: 'Rahul Sharma',
    class: 'Class 10A',
    exam: 'Mid-Term Exam',
    school: 'DAV Public School',
    academicYear: '2024-2025',
    subjects: [
        { name: 'Physics', marks: 85, maxMarks: 100, grade: 'A' },
        { name: 'Chemistry', marks: 78, maxMarks: 100, grade: 'B+' },
        { name: 'Biology', marks: 92, maxMarks: 100, grade: 'A+' },
        { name: 'Mathematics', marks: 75, maxMarks: 100, grade: 'B' },
        { name: 'English', marks: 88, maxMarks: 100, grade: 'A' },
    ],
    totalMarks: 418,
    maxTotalMarks: 500,
    percentage: 83.60,
    attendance: { present: 95, total: 100 },
    resultStatus: 'Promoted',
};

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
    reportCardContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
        marginLeft: 'auto',
    },
};

const ReportCards = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [reportCard, setReportCard] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!selectedClass || !selectedStudent || !selectedExam) {
            alert('Please select Class, Student and Exam to view the report card.');
            return;
        }

        setLoading(true);
        setTimeout(() => { // Simulate API call
            // In a real app, you would fetch data from a backend
            if (selectedStudent === 'Rahul Sharma' && selectedClass === 'Class 10A' && selectedExam === 'Mid-Term Exam') {
                setReportCard(dummyReportCard);
            } else {
                setReportCard(null);
            }
            setLoading(false);
        }, 1000);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('report-card-print').innerHTML;
        const printWindow = window.open('', '_blank');

        printWindow.document.write('<html><head><title>Report Card</title>');
        printWindow.document.write(`
      <style>
        body { font-family: sans-serif; padding: 20px; color: #333; }
        .report-card-container { width: 100%; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .school-header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
        .school-header h1 { margin: 0; font-size: 24px; color: #2563eb; }
        .school-header p { margin: 5px 0 0; color: #555; }
        .student-info { display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px; }
        .student-info p { margin: 5px 0; font-size: 14px; }
        .student-info p span { font-weight: bold; }
        .marks-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .marks-table th, .marks-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .marks-table th { background-color: #f0f4f8; }
        .summary-box { display: flex; flex-wrap: wrap; justify-content: space-between; background-color: #e0f2fe; padding: 15px; border-radius: 8px; }
        .summary-item { font-size: 16px; font-weight: bold; }
        .summary-item span { font-weight: normal; }
        .footer-section { margin-top: 30px; display: flex; justify-content: space-between; }
        .signature-line { border-top: 1px solid #555; width: 200px; text-align: center; padding-top: 5px; }
        @media print {
          button { display: none; }
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

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Student Report Card</h1>
                <p style={styles.subheading}>Search and view detailed academic report cards.</p>

                {/* Search Form */}
                <div style={styles.formGrid}>
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
                        <label style={styles.label} htmlFor="student">Student Name</label>
                        <select
                            id="student"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select Student --</option>
                            {students.map((student) => (
                                <option key={student} value={student}>{student}</option>
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
                        disabled={loading || !selectedClass || !selectedStudent || !selectedExam}
                        style={styles.searchButton}
                    >
                        <FaSearch />
                        <span>{loading ? 'Searching...' : 'Search Report Card'}</span>
                    </motion.button>
                </div>

                {/* Report Card Display Section */}
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
                    {!loading && reportCard && (
                        <motion.div
                            key="report-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={styles.reportCardContainer}
                            id="report-card-print"
                        >
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePrint} style={styles.printButton}>
                                    <FaPrint />
                                    <span>Print</span>
                                </motion.button>
                            </div>

                            <div className="report-card-container">
                                <div className="school-header">
                                    <h1>{reportCard.school}</h1>
                                    <p>Academic Report Card</p>
                                    <p>{reportCard.academicYear}</p>
                                </div>
                                <div className="student-info">
                                    <p><span>Name:</span> {reportCard.name}</p>
                                    <p><span>Roll No:</span> {reportCard.rollNo}</p>
                                    <p><span>Class:</span> {reportCard.class}</p>
                                    <p><span>Exam:</span> {reportCard.exam}</p>
                                </div>
                                <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Subject Details</h3>
                                <table className="marks-table">
                                    <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Marks Obtained</th>
                                        <th>Max Marks</th>
                                        <th>Grade</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {reportCard.subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td>{subject.name}</td>
                                            <td>{subject.marks}</td>
                                            <td>{subject.maxMarks}</td>
                                            <td>{subject.grade}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="summary-box">
                                    <div className="summary-item">Total Marks: <span>{reportCard.totalMarks} / {reportCard.maxTotalMarks}</span></div>
                                    <div className="summary-item">Percentage: <span>{reportCard.percentage.toFixed(2)}%</span></div>
                                    <div className="summary-item">Result: <span>{reportCard.resultStatus}</span></div>
                                    <div className="summary-item">Attendance: <span>{reportCard.attendance.present} / {reportCard.attendance.total}</span></div>
                                </div>
                                <div className="footer-section">
                                    <div className="signature-line">
                                        Parent's Signature
                                    </div>
                                    <div className="signature-line">
                                        Principal's Signature
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {!loading && !reportCard && selectedClass && selectedStudent && selectedExam && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', backgroundColor: '#fef2f2', borderRadius: '1rem' }}
                        >
                            <FaExclamationCircle size={48} color="#ef4444" />
                            <p style={{ marginTop: '1rem', color: '#ef4444', fontWeight: 'bold' }}>
                                No report card found for the given details.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ReportCards;