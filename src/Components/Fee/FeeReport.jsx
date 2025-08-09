import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaFilter, FaSearch, FaRupeeSign, FaArrowUp, FaArrowDown, FaUsers } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy data for the report
const reportData = [
    { studentId: 1, name: 'Rahul Sharma', class: '10A', feeType: 'Tution', amountPaid: 5000, date: '2025-08-01', status: 'Paid' },
    { studentId: 2, name: 'Priya Singh', class: '9B', feeType: 'Tution', amountPaid: 0, amountPending: 4500, date: null, status: 'Pending' },
    { studentId: 3, name: 'Amit Verma', class: '11C', feeType: 'Exam', amountPaid: 1500, date: '2025-08-05', status: 'Paid' },
    { studentId: 4, name: 'Nisha Gupta', class: '10A', feeType: 'Tution', amountPaid: 0, amountPending: 5000, date: null, status: 'Pending' },
    { studentId: 5, name: 'Sanjay Kumar', class: '9B', feeType: 'Transport', amountPaid: 2000, date: '2025-07-28', status: 'Paid' },
    { studentId: 6, name: 'Ritu Devi', class: '11C', feeType: 'Tution', amountPaid: 7500, date: '2025-08-02', status: 'Paid' },
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
    overviewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    overviewBox: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    overviewBoxHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    overviewTitle: {
        fontSize: '1.125rem',
        color: '#4b5563',
        marginBottom: '0.5rem',
    },
    overviewValue: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    filterBar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
    },
    filterItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        width: '100%',
    },
    downloadButton: {
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
    chartContainer: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
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
};

const FeeReports = () => {
    const [filters, setFilters] = useState({ class: '', section: '', dateRange: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const totalCollected = reportData.reduce((sum, item) => sum + (item.amountPaid || 0), 0);
    const totalPending = reportData.reduce((sum, item) => sum + (item.amountPending || 0), 0);
    const totalStudents = new Set(reportData.map(item => item.studentId)).size;

    const chartData = {
        labels: ['Total Collected', 'Total Pending'],
        datasets: [
            {
                label: 'Fee Status',
                data: [totalCollected, totalPending],
                backgroundColor: ['#10b981', '#ef4444'],
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Fee Collection Overview' },
        },
    };

    const handleDownload = () => {
        const csvHeader = 'Student ID,Name,Class,Fee Type,Amount Paid,Amount Pending,Date,Status\n';
        const csvContent = reportData.map(item =>
            `${item.studentId},"${item.name}","${item.class}","${item.feeType}",${item.amountPaid || ''},${item.amountPending || ''},${item.date || ''},${item.status}`
        ).join('\n');

        const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'fee_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={styles.card}
            >
                <h1 style={styles.header}>Fee Reports & Analytics</h1>

                {/* Overview Dashboard */}
                <div style={styles.overviewGrid}>
                    <motion.div
                        style={{ ...styles.overviewBox, backgroundColor: '#d1fae5' }}
                        whileHover={styles.overviewBoxHover}
                    >
                        <p style={styles.overviewTitle}>Total Collected</p>
                        <h2 style={styles.overviewValue}>
                            <FaRupeeSign />{totalCollected.toLocaleString()}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, backgroundColor: '#fee2e2' }}
                        whileHover={styles.overviewBoxHover}
                    >
                        <p style={styles.overviewTitle}>Total Pending</p>
                        <h2 style={styles.overviewValue}>
                            <FaRupeeSign />{totalPending.toLocaleString()}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, backgroundColor: '#e0f2fe' }}
                        whileHover={styles.overviewBoxHover}
                    >
                        <p style={styles.overviewTitle}>Total Students</p>
                        <h2 style={styles.overviewValue}>
                            <FaUsers />{totalStudents}
                        </h2>
                    </motion.div>
                </div>

                {/* Filters and Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center' } }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaSearch color="#6b7280" />
                            <input
                                type="text"
                                placeholder="Search student..."
                                style={styles.input}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaFilter color="#6b7280" />
                            <select style={styles.input} value={filters.class} onChange={(e) => setFilters({ ...filters, class: e.target.value })}>
                                <option value="">All Classes</option>
                                <option value="10A">10A</option>
                                <option value="9B">9B</option>
                                <option value="11C">11C</option>
                            </select>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        style={styles.downloadButton}
                    >
                        <FaDownload />
                        <span>Download Report</span>
                    </motion.button>
                </div>

                {/* Chart Section */}
                <div style={styles.chartContainer}>
                    <Bar data={chartData} options={chartOptions} />
                </div>

                {/* Report Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Student Name</th>
                            <th style={styles.th}>Class</th>
                            <th style={styles.th}>Fee Type</th>
                            <th style={styles.th}>Amount Paid</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reportData
                            .filter(item =>
                                item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                                (filters.class === '' || item.class === filters.class)
                            )
                            .map(item => (
                                <motion.tr
                                    key={item.studentId + item.feeType}
                                    style={styles.tableRow}
                                    whileHover={styles.tableRowHover}
                                >
                                    <td style={styles.td}>{item.name}</td>
                                    <td style={styles.td}>{item.class}</td>
                                    <td style={styles.td}>{item.feeType}</td>
                                    <td style={{ ...styles.td, color: item.amountPaid > 0 ? '#10b981' : '#ef4444' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FaRupeeSign size={12} />{item.amountPaid || item.amountPending}
                    </span>
                                    </td>
                                    <td style={{ ...styles.td, color: item.status === 'Paid' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                                        {item.status}
                                    </td>
                                    <td style={styles.td}>{item.date || 'N/A'}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default FeeReports;