import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaEnvelope, FaBell, FaInfoCircle, FaCheckCircle, FaRupeeSign, FaTimes } from 'react-icons/fa';

// Dummy data for students with pending fees
const studentsWithFees = [
    {
        id: 1,
        name: 'Rahul Sharma',
        class: '10A',
        dueDate: '2025-08-10',
        feeDetails: [
            { id: 'tution', name: 'Tution Fee (Q1)', amount: 5000, status: 'Pending' },
            { id: 'transport', name: 'Transport Fee (Q1)', amount: 2000, status: 'Pending' },
        ],
    },
    {
        id: 2,
        name: 'Priya Singh',
        class: '9B',
        dueDate: '2025-08-01',
        feeDetails: [
            { id: 'tution', name: 'Tution Fee (Q2)', amount: 4500, status: 'Overdue' },
        ],
    },
    {
        id: 3,
        name: 'Amit Verma',
        class: '11C',
        dueDate: '2025-08-20',
        feeDetails: [
            { id: 'exam', name: 'Exam Fee', amount: 1500, status: 'Pending' },
            { id: 'misc', name: 'Misc. Fee', amount: 500, status: 'Pending' },
        ],
    },
    {
        id: 4,
        name: 'Nisha Gupta',
        class: '10A',
        dueDate: '2025-07-25',
        feeDetails: [
            { id: 'tution', name: 'Tution Fee (Q2)', amount: 5000, status: 'Overdue' },
        ],
    },
];

const getDueDateStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Overdue', color: '#fca5a5' };
    if (diffDays <= 7) return { text: 'Due Soon', color: '#fcd34d' };
    return { text: 'Pending', color: '#99f6e4' };
};

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
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem',
    },
    subheading: {
        color: '#6b7280',
        marginBottom: '2rem',
    },
    actionBar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem',
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        fontSize: '1rem',
        transition: 'all 0.2s',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
    },
    reminderButton: {
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
        transition: 'background-color 0.2s',
        borderBottom: '1px solid #e5e7eb',
        cursor: 'pointer',
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
        fontWeight: '600',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '40rem',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
    },
    notificationSuccess: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        backgroundColor: '#d1fae5',
        color: '#065f46',
        fontWeight: 'bold',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '1rem',
    },
};

const PendingFees = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

    const filteredStudents = studentsWithFees.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.class.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSendReminders = () => {
        if (selectedStudents.length === 0) {
            alert('Please select at least one student to send a reminder.');
            return;
        }
        console.log(`Sending reminders to students with IDs: ${selectedStudents.join(', ')}`);

        // Simulate API call and show success notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        setSelectedStudents([]);
    };

    const handleStudentDetails = (student) => {
        setSelectedStudentDetails(student);
    };

    const totalSelectedAmount = selectedStudents.reduce((sum, studentId) => {
        const student = studentsWithFees.find(s => s.id === studentId);
        const pendingFees = student?.feeDetails.filter(fee => fee.status !== 'Paid');
        return sum + (pendingFees ? pendingFees.reduce((feeSum, fee) => feeSum + fee.amount, 0) : 0);
    }, 0);

    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={styles.card}
            >
                <h1 style={styles.heading}>Pending Fees</h1>
                <p style={styles.subheading}>View and manage all pending fees for students. Send reminders with a single click.</p>

                <div style={styles.actionBar}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center' } }}>
                        <div style={styles.searchContainer}>
                            <FaSearch style={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search by name or class..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={styles.searchInput}
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendReminders}
                            disabled={selectedStudents.length === 0}
                            style={{
                                ...styles.reminderButton,
                                backgroundColor: selectedStudents.length > 0 ? '#2563eb' : '#9ca3af',
                                cursor: selectedStudents.length > 0 ? 'pointer' : 'not-allowed',
                            }}
                        >
                            <FaBell />
                            <span>Send Reminder ({selectedStudents.length})</span>
                        </motion.button>
                    </div>
                </div>

                <AnimatePresence>
                    {showNotification && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={styles.notificationSuccess}
                        >
                            <FaCheckCircle style={{ fontSize: '1.5rem' }} />
                            <span>Reminders sent successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={{ ...styles.th, width: '2rem' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.length === filteredStudents.length}
                                    onChange={() => {
                                        if (selectedStudents.length === filteredStudents.length) {
                                            setSelectedStudents([]);
                                        } else {
                                            setSelectedStudents(filteredStudents.map(s => s.id));
                                        }
                                    }}
                                />
                            </th>
                            <th style={styles.th}>Student Name</th>
                            <th style={styles.th}>Class</th>
                            <th style={styles.th}>Pending Amount</th>
                            <th style={styles.th}>Due Date</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredStudents.map(student => {
                            const totalPendingAmount = student.feeDetails
                                .filter(fee => fee.status !== 'Paid')
                                .reduce((sum, fee) => sum + fee.amount, 0);

                            const status = getDueDateStatus(student.dueDate);

                            return (
                                <motion.tr
                                    key={student.id}
                                    style={styles.tableRow}
                                    onClick={() => handleStudentDetails(student)}
                                    whileHover={{ backgroundColor: '#f3f4f6' }}
                                >
                                    <td style={{ ...styles.td, width: '2rem' }} onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleSelectStudent(student.id)}
                                        />
                                    </td>
                                    <td style={styles.td}>{student.name}</td>
                                    <td style={styles.td}>{student.class}</td>
                                    <td style={styles.td}>₹{totalPendingAmount.toLocaleString()}</td>
                                    <td style={styles.td}>{student.dueDate}</td>
                                    <td style={styles.td}>
                                            <span style={{ ...styles.statusBadge, backgroundColor: status.color }}>
                                                {status.text}
                                            </span>
                                    </td>
                                </motion.tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Selected student total */}
                {selectedStudents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#e0f2fe', borderRadius: '0.75rem', fontWeight: 'bold' }}
                    >
                        Total Pending Amount for selected students: ₹{totalSelectedAmount.toLocaleString()}
                    </motion.div>
                )}

                {/* Student Details Modal */}
                <AnimatePresence>
                    {selectedStudentDetails && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={styles.modalOverlay}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                style={styles.modalContent}
                            >
                                <button
                                    onClick={() => setSelectedStudentDetails(null)}
                                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <FaTimes size={20} color="#6b7280" />
                                </button>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    Fee Details for {selectedStudentDetails.name}
                                </h2>
                                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                                    Class: {selectedStudentDetails.class}
                                </p>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {selectedStudentDetails.feeDetails.map(fee => (
                                        <div key={fee.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
                                            <div>
                                                <p style={{ fontWeight: '600' }}>{fee.name}</p>
                                                <p style={{ color: '#4b5563' }}>Amount: ₹{fee.amount}</p>
                                            </div>
                                            <span style={{ ...styles.statusBadge, backgroundColor: fee.status === 'Overdue' ? '#fca5a5' : '#99f6e4', color: '#1f2937' }}>
                                                {fee.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default PendingFees;