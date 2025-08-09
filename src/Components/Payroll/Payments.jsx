import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCheckCircle, FaExclamationCircle, FaSpinner, FaDollarSign, FaEdit, FaTimes } from 'react-icons/fa';

// Dummy data for employee salary payments
const initialPayments = [
    {
        id: 1,
        employeeName: 'Ramesh Kumar',
        month: 'July',
        year: 2024,
        amount: 62800,
        dueDate: '2024-07-31',
        status: 'Paid',
    },
    {
        id: 2,
        employeeName: 'Sunita Rai',
        month: 'July',
        year: 2024,
        amount: 37000,
        dueDate: '2024-07-31',
        status: 'Pending',
    },
    {
        id: 3,
        employeeName: 'Alok Singh',
        month: 'July',
        year: 2024,
        amount: 43000,
        dueDate: '2024-07-31',
        status: 'Paid',
    },
    {
        id: 4,
        employeeName: 'Priya Mehta',
        month: 'July',
        year: 2024,
        amount: 52000,
        dueDate: '2024-07-31',
        status: 'Pending',
    },
    {
        id: 5,
        employeeName: 'Vikram Patel',
        month: 'June',
        year: 2024,
        amount: 32000,
        dueDate: '2024-06-30',
        status: 'Paid',
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
        transition: 'transform 0.2s',
        borderLeft: '4px solid',
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
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        borderRadius: '9999px',
        border: '1px solid #d1d5db',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize: '1rem',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
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
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    actionButton: {
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '600',
        transition: 'all 0.2s',
    },
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Paid':
            return { backgroundColor: '#dcfce7', color: '#10b981', icon: <FaCheckCircle /> };
        case 'Pending':
            return { backgroundColor: '#fefce8', color: '#f97316', icon: <FaExclamationCircle /> };
        case 'Processing':
            return { backgroundColor: '#eff6ff', color: '#2563eb', icon: <FaSpinner className="animate-spin" /> };
        default:
            return { backgroundColor: '#f3f4f6', color: '#6b7280', icon: <FaDollarSign /> };
    }
};

const Payments = () => {
    const [payments, setPayments] = useState(initialPayments);
    const [searchQuery, setSearchQuery] = useState('');

    const totalPayments = payments.length;
    const pendingPayments = payments.filter(p => p.status === 'Pending').length;
    const paidPayments = payments.filter(p => p.status === 'Paid').length;

    const handleMarkAsPaid = (id) => {
        setPayments(prev =>
            prev.map(p => (p.id === id ? { ...p, status: 'Processing' } : p))
        );
        setTimeout(() => {
            setPayments(prev =>
                prev.map(p => (p.id === id ? { ...p, status: 'Paid' } : p))
            );
        }, 1500); // Simulate a network request
    };

    const filteredPayments = payments.filter(payment =>
        payment.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Salary Payments</h1>
                <p style={styles.subheading}>Manage and track all employee salary payments.</p>

                {/* Overview Dashboard */}
                <div style={styles.overviewGrid}>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#2563eb' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Total Payments</p>
                        <h2 style={{ ...styles.overviewValue, color: '#2563eb' }}>
                            <FaDollarSign /> {totalPayments}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#f97316' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Pending</p>
                        <h2 style={{ ...styles.overviewValue, color: '#f97316' }}>
                            <FaExclamationCircle /> {pendingPayments}
                        </h2>
                    </motion.div>
                    <motion.div
                        style={{ ...styles.overviewBox, borderLeftColor: '#10b981' }}
                        whileHover={{ translateY: -5 }}
                    >
                        <p style={styles.overviewTitle}>Completed</p>
                        <h2 style={{ ...styles.overviewValue, color: '#10b981' }}>
                            <FaCheckCircle /> {paidPayments}
                        </h2>
                    </motion.div>
                </div>

                {/* Toolbar */}
                <div style={{ ...styles.toolbar, '@media (min-width: 768px)': { flexDirection: 'row', justifyContent: 'flex-start' } }}>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by employee name or month..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Payments Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Employee Name</th>
                            <th style={styles.th}>Month & Year</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Due Date</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {filteredPayments.map(payment => {
                                const statusStyles = getStatusStyles(payment.status);
                                return (
                                    <motion.tr
                                        key={payment.id}
                                        style={styles.tableRow}
                                        whileHover={styles.tableRowHover}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <td style={styles.td}>{payment.employeeName}</td>
                                        <td style={styles.td}>{payment.month} {payment.year}</td>
                                        <td style={styles.td}>₹{payment.amount.toLocaleString()}</td>
                                        <td style={styles.td}>{payment.dueDate}</td>
                                        <td style={styles.td}>
                        <span style={{ ...styles.statusBadge, ...statusStyles }}>
                          {statusStyles.icon}
                            {payment.status}
                        </span>
                                        </td>
                                        <td style={styles.td}>
                                            {payment.status === 'Pending' && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleMarkAsPaid(payment.id)}
                                                    style={{ ...styles.actionButton, backgroundColor: '#10b981', color: '#fff' }}
                                                >
                                                    <FaCheckCircle />
                                                    <span>Mark as Paid</span>
                                                </motion.button>
                                            )}
                                            {payment.status === 'Processing' && (
                                                <motion.button
                                                    style={{ ...styles.actionButton, backgroundColor: '#2563eb', color: '#fff' }}
                                                >
                                                    <FaSpinner className="animate-spin" />
                                                    <span>Processing...</span>
                                                </motion.button>
                                            )}
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default Payments;