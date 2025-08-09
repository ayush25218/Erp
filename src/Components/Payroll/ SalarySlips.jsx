import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPrint, FaEye, FaTimes, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

// Dummy data for salary slips
const salarySlipsData = [
    {
        id: 1,
        employeeName: 'Ramesh Kumar',
        designation: 'Accountant',
        month: 'July',
        year: 2024,
        earnings: [{ name: 'Basic Pay', amount: 45000 }, { name: 'HRA', amount: 15000 }, { name: 'DA', amount: 8000 }],
        deductions: [{ name: 'EPF', amount: 5000 }, { name: 'Professional Tax', amount: 200 }],
    },
    {
        id: 2,
        employeeName: 'Sunita Rai',
        designation: 'Librarian',
        month: 'July',
        year: 2024,
        earnings: [{ name: 'Basic Pay', amount: 30000 }, { name: 'HRA', amount: 10000 }],
        deductions: [{ name: 'EPF', amount: 3000 }],
    },
    {
        id: 3,
        employeeName: 'Alok Singh',
        designation: 'IT Support',
        month: 'June',
        year: 2024,
        earnings: [{ name: 'Basic Pay', amount: 35000 }, { name: 'HRA', amount: 12000 }],
        deductions: [{ name: 'EPF', amount: 4000 }],
    },
    {
        id: 4,
        employeeName: 'Ramesh Kumar',
        designation: 'Accountant',
        month: 'June',
        year: 2024,
        earnings: [{ name: 'Basic Pay', amount: 45000 }, { name: 'HRA', amount: 15000 }, { name: 'DA', amount: 8000 }],
        deductions: [{ name: 'EPF', amount: 5000 }, { name: 'Professional Tax', amount: 200 }],
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
    actionButton: {
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '600',
        transition: 'all 0.2s',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 100,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 768px)': {
            padding: '1rem',
        },
    },
    modalCloseButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
    },
    slipHeader: {
        textAlign: 'center',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
    },
    slipDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },
    slipSection: {
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '1rem',
        marginBottom: '1rem',
    },
    slipTotal: {
        marginTop: '1.5rem',
        borderTop: '2px solid #e5e7eb',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '1.25rem',
    },
    printButtons: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        marginTop: '2rem',
    },
};

const SalarySlips = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSlip, setSelectedSlip] = useState(null);

    const calculateTotals = (slip) => {
        const totalEarnings = slip.earnings.reduce((sum, item) => sum + item.amount, 0);
        const totalDeductions = slip.deductions.reduce((sum, item) => sum + item.amount, 0);
        const netPay = totalEarnings - totalDeductions;
        return { totalEarnings, totalDeductions, netPay };
    };

    const filteredSlips = salarySlipsData.filter(slip =>
        slip.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePrint = () => {
        const content = document.getElementById('salary-slip-content').innerHTML;
        const originalContent = document.body.innerHTML;

        // Create a new window to print the content
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Salary Slip</title>');

        // Add the component styles to the print window for consistent appearance
        printWindow.document.write(`
      <style>
        body { font-family: sans-serif; }
        .print-container { max-width: 800px; margin: 0 auto; padding: 2rem; border: 1px solid #e5e7eb; border-radius: 1rem; }
        h2 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #1f2937; text-align: center; }
        p { color: #6b7280; text-align: center; }
        .slip-header { border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1.5rem; }
        .slip-details { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .slip-section { border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem; }
        .slip-section h3 { font-size: 1.25rem; margin-bottom: 1rem; }
        .slip-total { margin-top: 1.5rem; border-top: 2px solid #e5e7eb; padding-top: 1.5rem; display: flex; justify-content: space-between; font-weight: bold; font-size: 1.25rem; }
        .earnings-list, .deductions-list { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .earnings-section { border-left: 4px solid #10b981; }
        .deductions-section { border-left: 4px solid #ef4444; }
        .earnings-heading { color: #10b981; }
        .deductions-heading { color: #ef4444; }
        .net-pay-box { background-color: #dcfce7; padding: 1rem; border-radius: 0.75rem; }
        .net-pay-value { color: #10b981; }

        @media print {
          body { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
          .modal-buttons { display: none; }
        }
      </style>
    `);

        printWindow.document.write('</head><body>');
        printWindow.document.write(content);
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
                <h1 style={styles.header}>Salary Slips</h1>
                <p style={styles.subheading}>View, print, and manage monthly salary slips for all employees.</p>

                {/* Toolbar */}
                <div style={{ ...styles.toolbar, '@media (min-width: 768px)': { flexDirection: 'row', justifyContent: 'flex-start' } }}>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by employee name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                {/* Salary Slips Table */}
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>Employee Name</th>
                            <th style={styles.th}>Designation</th>
                            <th style={styles.th}>Month</th>
                            <th style={styles.th}>Year</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {filteredSlips.map(slip => (
                                <motion.tr
                                    key={slip.id}
                                    style={styles.tableRow}
                                    whileHover={styles.tableRowHover}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <td style={styles.td}>{slip.employeeName}</td>
                                    <td style={styles.td}>{slip.designation}</td>
                                    <td style={styles.td}>{slip.month}</td>
                                    <td style={styles.td}>{slip.year}</td>
                                    <td style={styles.td}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedSlip(slip)}
                                            style={{ ...styles.actionButton, backgroundColor: '#2563eb', color: '#fff' }}
                                        >
                                            <FaEye />
                                            <span>View</span>
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Salary Slip Modal */}
            <AnimatePresence>
                {selectedSlip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={() => setSelectedSlip(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div id="salary-slip-content" className="print-container">
                                <div style={styles.slipHeader}>
                                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#1f2937' }}>Salary Slip</h2>
                                    <p style={{ color: '#6b7280' }}>
                                        for the month of {selectedSlip.month}, {selectedSlip.year}
                                    </p>
                                </div>

                                <div style={styles.slipDetails}>
                                    <div>
                                        <p><strong>Employee Name:</strong> {selectedSlip.employeeName}</p>
                                        <p><strong>Designation:</strong> {selectedSlip.designation}</p>
                                    </div>
                                    <div>
                                        <p><strong>Slip ID:</strong> {selectedSlip.id}</p>
                                        <p><strong>Date of Generation:</strong> {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '2rem', '@media (max-width: 768px)': { flexDirection: 'column' } }}>
                                    {/* Earnings Section */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ ...styles.slipSection, borderLeft: '4px solid #10b981' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10b981' }}>Earnings</h3>
                                            {selectedSlip.earnings.map((item, index) => (
                                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <span><FaPlusCircle color="#10b981" style={{ marginRight: '0.5rem' }} />{item.name}</span>
                                                    <span>₹{item.amount.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Deductions Section */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ ...styles.slipSection, borderLeft: '4px solid #ef4444' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#ef4444' }}>Deductions</h3>
                                            {selectedSlip.deductions.map((item, index) => (
                                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <span><FaMinusCircle color="#ef4444" style={{ marginRight: '0.5rem' }} />{item.name}</span>
                                                    <span>₹{item.amount.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Total Section */}
                                <div style={styles.slipTotal}>
                                    <span>Gross Pay</span>
                                    <span>₹{calculateTotals(selectedSlip).totalEarnings.toLocaleString()}</span>
                                </div>
                                <div style={{ ...styles.slipTotal, color: '#ef4444', borderTop: 'none' }}>
                                    <span>Total Deductions</span>
                                    <span>₹{calculateTotals(selectedSlip).totalDeductions.toLocaleString()}</span>
                                </div>
                                <div style={{ ...styles.slipTotal, backgroundColor: '#dcfce7', padding: '1rem', borderRadius: '0.75rem' }}>
                                    <span>Net Pay</span>
                                    <span style={{ color: '#10b981' }}>₹{calculateTotals(selectedSlip).netPay.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Print Button */}
                            <div style={styles.printButtons}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={handlePrint}
                                    style={{ ...styles.actionButton, backgroundColor: '#3b82f6', color: '#fff' }}
                                >
                                    <FaPrint />
                                    <span>Print</span>
                                </motion.button>
                            </div>
                            <button onClick={() => setSelectedSlip(null)} style={styles.modalCloseButton}>
                                <FaTimes size={24} color="#6b7280" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SalarySlips;