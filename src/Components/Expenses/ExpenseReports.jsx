import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPrint, FaEye, FaTimes, FaRupeeSign } from 'react-icons/fa';

// Dummy data for expense reports
const expensesData = [
    {
        id: 1,
        employee: 'Ramesh Kumar',
        category: 'Travel',
        amount: 5500,
        date: '2025-07-20',
        description: 'Round-trip bus fare for client meeting in Delhi.',
    },
    {
        id: 2,
        employee: 'Sunita Rai',
        category: 'Office Supplies',
        amount: 1200,
        date: '2025-07-22',
        description: 'Purchase of stationery and printer paper.',
    },
    {
        id: 3,
        employee: 'Alok Singh',
        category: 'Food & Beverages',
        amount: 850,
        date: '2025-06-15',
        description: 'Lunch with a new vendor.',
    },
    {
        id: 4,
        employee: 'Ramesh Kumar',
        category: 'Food & Beverages',
        amount: 1500,
        date: '2025-06-18',
        description: 'Team lunch for project completion.',
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
        padding: '2.5rem',
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
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px dashed #e5e7eb',
    },
    detailLabel: {
        color: '#6b7280',
        fontWeight: '600',
    },
    detailValue: {
        color: '#1f2937',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
    },
    tableRowTotal: {
        backgroundColor: '#e9f5ff',
        fontWeight: 'bold',
    },
};

const ExpenseReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExpense, setSelectedExpense] = useState(null);

    const filteredExpenses = expensesData.filter(expense =>
        expense.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const calculateTotalAmount = () => {
        return filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
    };

    const handlePrint = () => {
        const content = document.getElementById('expense-report-table-content').innerHTML;

        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Expense Report</title>');

        // Modern and colourful CSS for the print page
        printWindow.document.write(`
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .print-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #fff;
          padding: 30px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 3px solid #007bff;
          margin-bottom: 20px;
        }
        .header-title {
          font-size: 28px;
          font-weight: 600;
          color: #007bff;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-title svg {
          color: #007bff;
          width: 30px;
          height: 30px;
        }
        .report-info {
          font-size: 14px;
          text-align: right;
        }
        .report-info p {
          margin: 0;
        }
        .data-section {
          margin-bottom: 30px;
        }
        .data-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .data-item {
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
        .data-label {
          font-weight: 600;
          color: #555;
          margin-bottom: 4px;
        }
        .data-value {
          border-bottom: 1px dashed #ccc;
          padding-bottom: 5px;
        }
        .expense-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .expense-table th, .expense-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .expense-table thead {
          background-color: #007bff;
          color: #fff;
        }
        .expense-table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        .expense-table tbody tr:hover {
          background-color: #e9ecef;
        }
        .table-row-total {
          background-color: #e9f5ff;
          font-weight: 600;
        }
        .report-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 50px;
        }
        .qr-code-placeholder {
          width: 100px;
          height: 100px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          text-align: center;
          line-height: 1.2;
        }
        .signature-line {
          border-top: 1px solid #555;
          width: 200px;
          text-align: center;
          padding-top: 5px;
          font-size: 14px;
        }
        @media print {
            body { -webkit-print-color-adjust: exact; color-adjust: exact; }
        }
      </style>
    `);

        printWindow.document.write('</head><body>');
        printWindow.document.write(`
      <div class="print-container">
        <div class="report-header">
          <div class="header-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Expense Report
          </div>
          <div class="report-info">
            <p>Report Date: ${new Date().toLocaleDateString()}</p>
            <p>Printed By: Admin</p>
          </div>
        </div>

        <div class="data-section">
          <h3 style="margin-bottom: 10px; color: #007bff;">Expense Details</h3>
          <table class="expense-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredExpenses.map(expense => `
                <tr>
                  <td>${expense.id}</td>
                  <td>${expense.employee}</td>
                  <td>${expense.category}</td>
                  <td>₹${expense.amount.toLocaleString()}</td>
                  <td>${expense.date}</td>
                </tr>
              `).join('')}
              <tr class="table-row-total">
                <td colspan="3">Total Amount</td>
                <td>₹${calculateTotalAmount().toLocaleString()}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="report-footer">
          <div class="qr-code-placeholder">
            QR Code<br/>(For Verification)
          </div>
          <div class="signature-block">
            <div class="signature-line">
              Authorised Signatory
            </div>
          </div>
        </div>
      </div>
    `);
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
                <h1 style={styles.header}>Expense Report</h1>
                <p style={styles.subheading}>A detailed overview of all employee expenses.</p>

                {/* Toolbar */}
                <div style={{ ...styles.toolbar, '@media (min-width: 768px)': { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }}>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by employee or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrint}
                        style={{ ...styles.actionButton, backgroundColor: '#3b82f6', color: '#fff', border: 'none', marginLeft: 'auto' }}
                    >
                        <FaPrint />
                        <span>Print Report</span>
                    </motion.button>
                </div>

                {/* Expenses Table */}
                <div style={styles.tableContainer}>
                    <table id="expense-report-table-content" style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Employee</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <AnimatePresence>
                            {filteredExpenses.map(expense => (
                                <motion.tr
                                    key={expense.id}
                                    style={styles.tableRow}
                                    whileHover={styles.tableRowHover}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <td style={styles.td}>{expense.id}</td>
                                    <td style={styles.td}>{expense.employee}</td>
                                    <td style={styles.td}>{expense.category}</td>
                                    <td style={styles.td}>₹{expense.amount.toLocaleString()}</td>
                                    <td style={styles.td}>{expense.date}</td>
                                    <td style={styles.td}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedExpense(expense)}
                                            style={{ ...styles.actionButton, backgroundColor: '#2563eb', color: '#fff' }}
                                        >
                                            <FaEye />
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Expense Detail Modal */}
            <AnimatePresence>
                {selectedExpense && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={() => setSelectedExpense(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedExpense(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <FaTimes size={24} color="#6b7280" />
                            </button>
                            <h2 style={styles.modalHeader}>Expense Details</h2>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Employee</span>
                                <span style={styles.detailValue}>{selectedExpense.employee}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Category</span>
                                <span style={styles.detailValue}>{selectedExpense.category}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Amount</span>
                                <span style={styles.detailValue}>₹{selectedExpense.amount.toLocaleString()}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Date</span>
                                <span style={styles.detailValue}>{selectedExpense.date}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Description</span>
                                <span style={styles.detailValue}>{selectedExpense.description}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExpenseReport;