import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCheck, FaUserTimes, FaUserSlash, FaCalendarAlt, FaCheckCircle, FaTimes, FaUser } from 'react-icons/fa';
import moment from 'moment';

// Dummy data for faculty members
const facultyData = [
    { id: 1, name: 'Dr. Ramesh Kumar', department: 'Physics' },
    { id: 2, name: 'Ms. Sunita Rai', department: 'English' },
    { id: 3, name: 'Mr. Alok Singh', department: 'Mathematics' },
    { id: 4, name: 'Dr. Priya Mehta', department: 'Chemistry' },
    { id: 5, name: 'Mr. Vivek Singh', department: 'Computer Science' },
    { id: 6, name: 'Ms. Geeta Sharma', department: 'History' },
];

// Dummy attendance data for today
const today = moment().format('YYYY-MM-DD');
const initialAttendance = {
    [today]: {
        1: 'present',
        2: 'present',
        3: 'absent',
        4: 'leave',
        5: 'present',
        6: 'present',
    }
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
        alignItems: 'center',
        transition: 'transform 0.2s',
    },
    overviewBoxHover: {
        transform: 'translateY(-5px)',
    },
    overviewTitle: {
        fontSize: '1rem',
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
    statusIndicator: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
    },
    attendanceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    calendar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        gap: '1rem',
    },
    dateNavButton: {
        backgroundColor: '#e5e7eb',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    dateDisplay: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
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
    td: {
        padding: '1rem',
        color: '#4b5563',
    },
    statusButtons: {
        display: 'flex',
        gap: '0.5rem',
    },
    statusButton: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        color: '#fff',
    },
    activeStatus: {
        boxShadow: '0 0 0 4px #3b82f6',
    }
};

const getStatusColors = (status) => {
    switch (status) {
        case 'present': return '#10b981';
        case 'absent': return '#ef4444';
        case 'leave': return '#f97316';
        default: return '#9ca3af';
    }
};

const FacultyAttendance = () => {
    const [attendance, setAttendance] = useState(initialAttendance);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            // Simulate fetching attendance for the selected date
            const dateKey = selectedDate.format('YYYY-MM-DD');
            if (!attendance[dateKey]) {
                setAttendance(prev => ({
                    ...prev,
                    [dateKey]: {}
                }));
            }
            setLoading(false);
        }, 500);
    }, [selectedDate]);

    const handleMarkAttendance = (facultyId, status) => {
        const dateKey = selectedDate.format('YYYY-MM-DD');
        setAttendance(prev => ({
            ...prev,
            [dateKey]: {
                ...prev[dateKey],
                [facultyId]: status
            }
        }));
    };

    const currentDayAttendance = attendance[selectedDate.format('YYYY-MM-DD')] || {};

    const presentCount = Object.values(currentDayAttendance).filter(s => s === 'present').length;
    const absentCount = Object.values(currentDayAttendance).filter(s => s === 'absent').length;
    const leaveCount = Object.values(currentDayAttendance).filter(s => s === 'leave').length;
    const totalFaculty = facultyData.length;

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Faculty Attendance</h1>
                <p style={styles.subheading}>Mark and manage daily attendance for all faculty members.</p>

                {/* Overview Dashboard */}
                <div style={styles.overviewGrid}>
                    <motion.div style={{ ...styles.overviewBox, backgroundColor: '#d1fae5' }} whileHover={styles.overviewBoxHover}>
                        <p style={styles.overviewTitle}>Total Faculty</p>
                        <h2 style={{ ...styles.overviewValue, color: '#065f46' }}>
                            <FaUser size={32} />{totalFaculty}
                        </h2>
                    </motion.div>
                    <motion.div style={{ ...styles.overviewBox, backgroundColor: '#dcfce7' }} whileHover={styles.overviewBoxHover}>
                        <p style={styles.overviewTitle}>Present</p>
                        <h2 style={{ ...styles.overviewValue, color: '#10b981' }}>
                            <FaUserCheck size={32} />{presentCount}
                        </h2>
                    </motion.div>
                    <motion.div style={{ ...styles.overviewBox, backgroundColor: '#fee2e2' }} whileHover={styles.overviewBoxHover}>
                        <p style={styles.overviewTitle}>Absent</p>
                        <h2 style={{ ...styles.overviewValue, color: '#ef4444' }}>
                            <FaUserTimes size={32} />{absentCount}
                        </h2>
                    </motion.div>
                    <motion.div style={{ ...styles.overviewBox, backgroundColor: '#fefce8' }} whileHover={styles.overviewBoxHover}>
                        <p style={styles.overviewTitle}>On Leave</p>
                        <h2 style={{ ...styles.overviewValue, color: '#f97316' }}>
                            <FaUserSlash size={32} />{leaveCount}
                        </h2>
                    </motion.div>
                </div>

                {/* Date Selector */}
                <div style={styles.attendanceContainer}>
                    <div style={styles.calendar}>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={styles.dateNavButton} onClick={() => setSelectedDate(moment(selectedDate).subtract(1, 'days'))}>
                            &lt;
                        </motion.button>
                        <span style={styles.dateDisplay}>{selectedDate.format('MMMM Do, YYYY')}</span>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={styles.dateNavButton} onClick={() => setSelectedDate(moment(selectedDate).add(1, 'days'))}>
                            &gt;
                        </motion.button>
                    </div>

                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead style={styles.tableHead}>
                            <tr>
                                <th style={styles.th}>Faculty Name</th>
                                <th style={styles.th}>Department</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Loading...</td>
                                </tr>
                            ) : (
                                facultyData.map(faculty => {
                                    const status = currentDayAttendance[faculty.id] || '';
                                    return (
                                        <motion.tr
                                            key={faculty.id}
                                            style={styles.tableRow}
                                            whileHover={{ backgroundColor: '#f3f4f6' }}
                                        >
                                            <td style={styles.td}>{faculty.name}</td>
                                            <td style={styles.td}>{faculty.department}</td>
                                            <td style={styles.td}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                            <span style={{ ...styles.statusIndicator, backgroundColor: getStatusColors(status) }}></span>
                              {status || 'Not Marked'}
                          </span>
                                            </td>
                                            <td style={styles.td}>
                                                <div style={styles.statusButtons}>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleMarkAttendance(faculty.id, 'present')}
                                                        style={{
                                                            ...styles.statusButton,
                                                            backgroundColor: '#10b981',
                                                            ...(status === 'present' && styles.activeStatus)
                                                        }}
                                                    >
                                                        <FaUserCheck />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleMarkAttendance(faculty.id, 'absent')}
                                                        style={{
                                                            ...styles.statusButton,
                                                            backgroundColor: '#ef4444',
                                                            ...(status === 'absent' && styles.activeStatus)
                                                        }}
                                                    >
                                                        <FaUserTimes />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleMarkAttendance(faculty.id, 'leave')}
                                                        style={{
                                                            ...styles.statusButton,
                                                            backgroundColor: '#f97316',
                                                            ...(status === 'leave' && styles.activeStatus)
                                                        }}
                                                    >
                                                        <FaUserSlash />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FacultyAttendance;