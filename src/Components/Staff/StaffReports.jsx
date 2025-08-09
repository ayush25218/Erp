import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaFilter, FaSearch, FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';
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
const staffData = [
    { id: 1, name: 'Ramesh Kumar', designation: 'Accountant', department: 'Administration', status: 'Active' },
    { id: 2, name: 'Sunita Rai', designation: 'Librarian', department: 'Library', status: 'Active' },
    { id: 3, name: 'Alok Singh', designation: 'IT Support', department: 'IT', status: 'Active' },
    { id: 4, name: 'Priya Mehta', designation: 'Front Desk Officer', department: 'Administration', status: 'Active' },
    { id: 5, name: 'Vikram Patel', designation: 'Sports Coach', department: 'Sports', status: 'Inactive' },
    { id: 6, name: 'Geeta Sharma', designation: 'Security Guard', department: 'Security', status: 'Active' },
    { id: 7, name: 'Mahesh Gupta', designation: 'Accountant', department: 'Administration', status: 'Active' },
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

const StaffReport = () => {
    const [filters, setFilters] = useState({ department: '', designation: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const totalStaff = staffData.length;
    const activeStaff = staffData.filter(s => s.status === 'Active').length;
    const inactiveStaff = staffData.filter(s => s.status === 'Inactive').length;

    const chartData = {
        labels: ['Active Staff', 'Inactive Staff'],
        datasets: [
            {
                label: 'Staff Status',
                data: [activeStaff, inactiveStaff],
                backgroundColor: ['#10b981', '#ef4444'],
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Staff Status Overview' },
        },
    };

    const handleDownload = () => {
        const csvHeader = 'ID,Name,Designation,Department,Status\n';
        const csvContent = staffData.map(item =>
            `${item.id},"${item.name}","${item.designation}","${item.department}","${item.status}"`
        ).join('\n');

        const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'staff_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredStaff = staffData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.department === '' || item.department === filters.department) &&
        (filters.designation === '' || item.designation === filters.designation)
    );

    // Get unique departments and designations for filters
    const uniqueDepartments = [...new Set(staffData.map(s => s.department))];
    const uniqueDesignations = [...new Set(staffData.map(s => s.designation))];

    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={styles.card}
            >
                <h1 style={styles.header}>Staff Reports</h1>
                <p style={styles.subheading}>Generate and analyze reports on all school staff members.</p>

                {/* Overview Dashboard */}
                <div style={styles.overviewGrid}>
                    <motion.div
                        style={{ ...styles.overviewBox, backgroundColor: '#d1fae5' }}
                        whileHover={styles.overviewBoxHover}
                    >
                        <p style={styles.overviewTitle}>Total Staff</p>
                        <h2 style={{ ...styles.overviewValue, color: '#065f46' }}>
                            <FaUsers />{totalStaff}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, backgroundColor: '#dcfce7' }}
                        whileHover={styles.overviewBoxHover}
                    >
                        <p style={styles.overviewTitle}>Active Staff</p>
                        <h2 style={{ ...styles.overviewValue, color: '#10b981' }}>
                            <FaUserCheck />{activeStaff}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, backgroundColor: '#fee2e2' }}
                        whileHover={styles.overviewBoxHover}
                    >
                        <p style={styles.overviewTitle}>Inactive Staff</p>
                        <h2 style={{ ...styles.overviewValue, color: '#ef4444' }}>
                            <FaUserTimes />{inactiveStaff}
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
                                placeholder="Search staff by name..."
                                style={styles.input}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaFilter color="#6b7280" />
                            <select style={styles.input} value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                                <option value="">All Departments</option>
                                {uniqueDepartments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>
                        <div style={{ ...styles.filterItem, flex: 1 }}>
                            <FaFilter color="#6b7280" />
                            <select style={styles.input} value={filters.designation} onChange={(e) => setFilters({ ...filters, designation: e.target.value })}>
                                <option value="">All Designations</option>
                                {uniqueDesignations.map(desig => <option key={desig} value={desig}>{desig}</option>)}
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
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Designation</th>
                            <th style={styles.th}>Department</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredStaff.map(item => (
                            <motion.tr
                                key={item.id}
                                style={styles.tableRow}
                                whileHover={styles.tableRowHover}
                            >
                                <td style={styles.td}>{item.name}</td>
                                <td style={styles.td}>{item.designation}</td>
                                <td style={styles.td}>{item.department}</td>
                                <td style={{ ...styles.td, color: item.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                                    {item.status}
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default StaffReport;