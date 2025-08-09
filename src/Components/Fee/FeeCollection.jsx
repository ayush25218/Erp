import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUser, FaRupeeSign, FaCheckCircle, FaAngleDown, FaInfoCircle, FaFileAlt } from 'react-icons/fa';

// Sample data for demonstration
const studentsData = [
    {
        id: 1,
        name: 'Rahul Sharma',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
        class: '10A',
        feeDetails: [
            { id: 'tution', name: 'Tution Fee', amount: 5000, status: 'Pending' },
            { id: 'transport', name: 'Transport Fee', amount: 2000, status: 'Paid' },
            { id: 'library', name: 'Library Fee', amount: 500, status: 'Pending' },
        ]
    },
    {
        id: 2,
        name: 'Priya Singh',
        photo: 'https://randomuser.me/api/portraits/women/2.jpg',
        class: '9B',
        feeDetails: [
            { id: 'tution', name: 'Tution Fee', amount: 4500, status: 'Pending' },
            { id: 'misc', name: 'Misc. Fee', amount: 1000, status: 'Pending' },
        ]
    },
    {
        id: 3,
        name: 'Ankit Verma',
        photo: 'https://randomuser.me/api/portraits/men/3.jpg',
        class: '11C',
        feeDetails: [
            { id: 'tution', name: 'Tution Fee', amount: 7500, status: 'Paid' },
        ]
    },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem 1rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '1200px', // Larger max-width
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#6b7280',
        fontWeight: '500',
        transition: 'color 0.2s',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    navLinkHover: {
        color: '#1f2937',
    },
    searchContainer: {
        position: 'relative',
        flex: '1',
        marginRight: '2rem',
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
    studentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    studentCard: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    studentCardHover: {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    studentInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
    },
    studentPhoto: {
        width: '4rem',
        height: '4rem',
        borderRadius: '9999px',
        border: '2px solid #3b82f6',
    },
    feeDetailsContainer: {
        marginTop: '1rem',
    },
    feeItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0',
        borderBottom: '1px solid #e5e7eb',
    },
    feeStatus: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '600',
    },
    statusColors: {
        Pending: { backgroundColor: '#fef3c7', color: '#92400e' },
        Paid: { backgroundColor: '#d1fae5', color: '#065f46' },
    },
    paymentSection: {
        marginTop: '2rem',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.5rem',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    buttonHover: {
        backgroundColor: '#1d4ed8',
    },
};

const FeeCollection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setSearchQuery('');
    };

    const handleFeePayment = (feeItem) => {
        // Logic to handle payment for a specific fee item
        alert(`Processing payment for ${feeItem.name} of ₹${feeItem.amount} for ${selectedStudent.name}`);
        // Here you would add real API calls and state updates
    };

    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={styles.card}
            >
                <div style={styles.header}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>Fee Management</h1>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <a href="#" style={styles.navLink} onMouseEnter={e => e.target.style.color = styles.navLinkHover.color} onMouseLeave={e => e.target.style.color = styles.navLink.color}>
                            <FaFileAlt />
                            Reports
                        </a>
                        <a href="#" style={styles.navLink} onMouseEnter={e => e.target.style.color = styles.navLinkHover.color} onMouseLeave={e => e.target.style.color = styles.navLink.color}>
                            <FaInfoCircle />
                            Pending Fees
                        </a>
                        <a href="#" style={styles.navLink} onMouseEnter={e => e.target.style.color = styles.navLinkHover.color} onMouseLeave={e => e.target.style.color = styles.navLink.color}>
                            <FaRupeeSign />
                            Fee Structure
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                    {/* Search Section */}
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search student by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    {/* Student List */}
                    <AnimatePresence>
                        {searchQuery && !selectedStudent && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div style={styles.studentGrid}>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map(student => (
                                            <motion.div
                                                key={student.id}
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                                onClick={() => handleStudentSelect(student)}
                                                style={styles.studentCard}
                                            >
                                                <div style={styles.studentInfo}>
                                                    <img src={student.photo} alt={student.name} style={styles.studentPhoto} />
                                                    <div>
                                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>{student.name}</h3>
                                                        <p style={{ color: '#4b5563' }}>Class: {student.class}</p>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                                                    <a href="#" style={{ color: '#2563eb', fontWeight: '600' }}>
                                                        View Details <FaAngleDown style={{marginLeft: '0.25rem'}} />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                                            No students found.
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Selected Student & Payment Form */}
                    <AnimatePresence>
                        {selectedStudent && (
                            <motion.div
                                key={selectedStudent.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            >
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                                    Fee Payment for {selectedStudent.name}
                                </h2>

                                {/* Fee Details Section */}
                                <div style={styles.feeDetailsContainer}>
                                    {selectedStudent.feeDetails.map(fee => (
                                        <div key={fee.id} style={styles.feeItem}>
                                            <div>
                                                <p style={{ fontWeight: '600' }}>{fee.name}</p>
                                                <p style={{ color: '#4b5563' }}>₹{fee.amount}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{...styles.feeStatus, ...styles.statusColors[fee.status]}}>{fee.status}</span>
                                                {fee.status === 'Pending' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleFeePayment(fee)}
                                                        style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                                                    >
                                                        Pay Now
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ textAlign: 'right', marginTop: '2rem' }}>
                                    <button
                                        onClick={() => setSelectedStudent(null)}
                                        style={{ color: '#ef4444', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default FeeCollection;