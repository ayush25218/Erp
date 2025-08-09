import React from 'react';

const ExamSchedule = () => {
    const dummySchedule = [
        { id: 1, subject: 'Mathematics', date: '2025-12-01', time: '10:00 AM', room: 'A-201', grade: '10th' },
        { id: 2, subject: 'Physics', date: '2025-12-03', time: '02:00 PM', room: 'B-105', grade: '10th' },
        { id: 3, subject: 'English', date: '2025-12-05', time: '10:00 AM', room: 'A-201', grade: '9th' },
        { id: 4, subject: 'Chemistry', date: '2025-12-07', time: '10:00 AM', room: 'B-105', grade: '11th' },
        { id: 5, subject: 'Biology', date: '2025-12-09', time: '02:00 PM', room: 'C-302', grade: '12th' },
    ];

    // Inline styles as JavaScript objects
    const styles = {
        container: {
            fontFamily: "'Poppins', sans-serif",
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            margin: '0 auto',
        },
        header: {
            color: '#1a237e',
            textAlign: 'center',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '600',
        },
        card: {
            overflowX: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px', // Ensures table is scrollable on small screens
        },
        tableHeader: {
            backgroundColor: '#e9ecef',
            color: '#495057',
            textAlign: 'left',
            fontWeight: '600',
        },
        tableCell: {
            padding: '15px 20px',
            borderBottom: '1px solid #dee2e6',
        },
        tableRowHover: {
            backgroundColor: '#f0f2f5',
            transition: 'background-color 0.3s ease',
        },
        // For responsive design, we can use a media query alternative
        '@media (maxWidth: 768px)': {
            header: {
                fontSize: '1.5rem',
            },
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Upcoming Exam Schedule</h3>
            <div style={styles.card}>
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Subject</th>
                        <th style={styles.tableCell}>Grade</th>
                        <th style={styles.tableCell}>Date</th>
                        <th style={styles.tableCell}>Time</th>
                        <th style={styles.tableCell}>Room</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dummySchedule.map((item, index) => (
                        <tr
                            key={item.id}
                            style={
                                index % 2 === 0
                                    ? {} // Even rows get default style
                                    : { backgroundColor: '#f9f9f9' } // Odd rows get a lighter shade
                            }
                            // You can't use pseudo-classes like :hover with inline styles.
                            // For hover effects, a separate CSS file or a CSS-in-JS library is better.
                        >
                            <td style={styles.tableCell}>{item.subject}</td>
                            <td style={styles.tableCell}>{item.grade}</td>
                            <td style={styles.tableCell}>{item.date}</td>
                            <td style={styles.tableCell}>{item.time}</td>
                            <td style={styles.tableCell}>{item.room}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamSchedule;