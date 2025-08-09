import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPrint, FaCheckCircle, FaTimesCircle, FaChartBar, FaExclamationCircle } from 'react-icons/fa';

// Dummy data for classes and academic years
const classes = ['Class 10A', 'Class 11B'];
const academicYears = ['2024-2025', '2023-2024'];

// Dummy promotion report data
const dummyReport = {
    promotedStudents: [
        { id: 1, name: 'Rahul Sharma', rollNo: '101', marks: '85%' },
        { id: 2, name: 'Sonal Gupta', rollNo: '104', marks: '78%' },
        { id: 3, name: 'Amit Verma', rollNo: '103', marks: '72%' },
    ],
    notPromotedStudents: [
        { id: 4, name: 'Priya Singh', rollNo: '102', reason: 'Failed in mandatory subjects' },
        { id: 5, name: 'Vikas Kumar', rollNo: '105', reason: 'Low attendance' },
    ],
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
    select: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
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
    reportContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    reportTitle: {
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
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    summaryCard: {
        padding: '1.5rem',
        borderRadius: '1rem',
        textAlign: 'center',
    },
    promotedCard: {
        backgroundColor: '#d1fae5',
        color: '#10b981',
    },
    notPromotedCard: {
        backgroundColor: '#fef2f2',
        color: '#ef4444',
    },
    summaryNumber: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '0',
    },
    summaryLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        marginTop: '0.5rem',
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
    tableTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    promotedTitle: {
        color: '#10b981',
    },
    notPromotedTitle: {
        color: '#ef4444',
    },
};

const PromotionReports = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!selectedClass || !selectedYear) {
            alert('Please select Class and Academic Year to generate the report.');
            return;
        }

        setLoading(true);
        setTimeout(() => { // Simulate API call
            // In a real app, you would fetch data from a backend
            if (selectedClass && selectedYear) {
                setReport(dummyReport);
            } else {
                setReport(null);
            }
            setLoading(false);
        }, 1000);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('promotion-report-print').innerHTML;
        const printWindow = window.open('', '_blank');

        printWindow.document.write('<html><head><title>Promotion Report</title></head><body>');
        printWindow.document.write(`
      <style>
        body { font-family: sans-serif; padding: 20px; color: #333; }
        .print-container { width: 100%; max-width: 900px; margin: 0 auto; }
        .print-header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
        .print-header h1 { margin: 0; font-size: 24px; color: #2563eb; }
        .print-header p { margin: 5px 0 0; color: #555; }
        .summary-card { padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .promoted-card { background-color: #d1fae5; color: #10b981; }
        .not-promoted-card { background-color: #fef2f2; color: #ef4444; }
        .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .summary-number { font-size: 2rem; font-weight: bold; }
        .summary-label { font-size: 1rem; font-weight: 600; }
        .table-title { font-size: 1.25rem; font-weight: bold; margin-bottom: 10px; }
        .table-title.promoted-title { color: #10b981; }
        .table-title.not-promoted-title { color: #ef4444; }
        .report-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .report-table th, .report-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        .report-table th { background-color: #f0f4f8; }
        @media print { button { display: none; } }
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
                <h1 style={styles.header}>Promotion Report</h1>
                <p style={styles.subheading}>Generate detailed reports on student promotions and detentions.</p>

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
                        disabled={loading || !selectedClass || !selectedYear}
                        style={styles.searchButton}
                    >
                        <FaSearch />
                        <span>{loading ? 'Generating...' : 'Generate Report'}</span>
                    </motion.button>
                </div>

                {/* Report Display Section */}
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
                    {!loading && report && (
                        <motion.div
                            key="promotion-report"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={styles.reportContainer}
                            id="promotion-report-print"
                        >
                            <div style={styles.reportHeader}>
                                <div style={styles.reportTitle}>
                                    <FaChartBar />
                                    Promotion Report for {selectedClass} ({selectedYear})
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePrint} style={styles.printButton}>
                                    <FaPrint />
                                    <span>Print</span>
                                </motion.button>
                            </div>

                            {/* Summary */}
                            <div style={styles.summaryGrid}>
                                <div style={{ ...styles.summaryCard, ...styles.promotedCard }}>
                                    <p style={styles.summaryNumber}>{report.promotedStudents.length}</p>
                                    <p style={styles.summaryLabel}>Promoted Students</p>
                                </div>
                                <div style={{ ...styles.summaryCard, ...styles.notPromotedCard }}>
                                    <p style={styles.summaryNumber}>{report.notPromotedStudents.length}</p>
                                    <p style={styles.summaryLabel}>Not Promoted Students</p>
                                </div>
                            </div>

                            {/* Promoted Students Table */}
                            <h3 style={{ ...styles.tableTitle, ...styles.promotedTitle }}>
                                <FaCheckCircle /> Promoted Students
                            </h3>
                            <table style={styles.table}>
                                <thead style={styles.tableHead}>
                                <tr>
                                    <th style={styles.th}>Roll No.</th>
                                    <th style={styles.th}>Student Name</th>
                                    <th style={styles.th}>Performance</th>
                                </tr>
                                </thead>
                                <tbody>
                                {report.promotedStudents.map(student => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid #d1d5db' }}>
                                        <td style={styles.td}>{student.rollNo}</td>
                                        <td style={styles.td}>{student.name}</td>
                                        <td style={styles.td}>{student.marks}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {/* Not Promoted Students Table */}
                            <h3 style={{ ...styles.tableTitle, ...styles.notPromotedTitle, marginTop: '2rem' }}>
                                <FaTimesCircle /> Not Promoted Students
                            </h3>
                            <table style={styles.table}>
                                <thead style={styles.tableHead}>
                                <tr>
                                    <th style={styles.th}>Roll No.</th>
                                    <th style={styles.th}>Student Name</th>
                                    <th style={styles.th}>Reason</th>
                                </tr>
                                </thead>
                                <tbody>
                                {report.notPromotedStudents.map(student => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid #d1d5db' }}>
                                        <td style={styles.td}>{student.rollNo}</td>
                                        <td style={styles.td}>{student.name}</td>
                                        <td style={styles.td}>{student.reason}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                    {!loading && !report && selectedClass && selectedYear && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', backgroundColor: '#fef2f2', borderRadius: '1rem' }}
                        >
                            <FaExclamationCircle size={48} color="#ef4444" />
                            <p style={{ marginTop: '1rem', color: '#ef4444', fontWeight: 'bold' }}>
                                No promotion data found for the given details.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PromotionReports;