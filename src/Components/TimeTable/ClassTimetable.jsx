// src/Components/Timetable/ClassTimetable.jsx
import React, { useState } from 'react';

// Dummy data for a typical school week
const dummyData = {
    classes: ['10th A', '10th B', '11th Science', '12th Commerce'],
    periods: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 1:00', '1:00 - 2:00'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

// Timetable data for each class
const classTimetables = {
    '10th A': [
        ['Maths', 'Science', 'English', 'History', 'Art'],
        ['Science', 'Maths', 'History', 'English', 'P.E.'],
        ['English', 'Maths', 'Science', 'Art', 'History'],
        ['History', 'Science', 'Maths', 'English', 'P.E.'],
        ['Art', 'English', 'History', 'Maths', 'Science'],
    ],
    '10th B': [
        ['English', 'History', 'Maths', 'Science', 'Art'],
        ['History', 'English', 'Science', 'Maths', 'P.E.'],
        ['Maths', 'English', 'History', 'Art', 'Science'],
        ['Science', 'English', 'Maths', 'History', 'P.E.'],
        ['Art', 'Maths', 'Science', 'English', 'History'],
    ],
    '11th Science': [
        ['Physics', 'Chemistry', 'Maths', 'Biology', 'English'],
        ['Chemistry', 'Physics', 'Biology', 'Maths', 'P.E.'],
        ['Maths', 'Physics', 'Chemistry', 'English', 'Biology'],
        ['Physics', 'Maths', 'Chemistry', 'Biology', 'P.E.'],
        ['English', 'Biology', 'Physics', 'Chemistry', 'Maths'],
    ],
    '12th Commerce': [
        ['Accounts', 'Economics', 'Business Studies', 'English', 'Maths'],
        ['Economics', 'Accounts', 'Business Studies', 'Maths', 'P.E.'],
        ['Business Studies', 'Accounts', 'Economics', 'Maths', 'English'],
        ['Accounts', 'Business Studies', 'Economics', 'English', 'P.E.'],
        ['Maths', 'English', 'Accounts', 'Economics', 'Business Studies'],
    ]
};

const ClassTimetable = ({ theme }) => {
    const [selectedClass, setSelectedClass] = useState('10th A');
    const [timetable, setTimetable] = useState(classTimetables['10th A']);

    // Function to handle class selection
    const handleClassChange = (e) => {
        const newClass = e.target.value;
        setSelectedClass(newClass);
        setTimetable(classTimetables[newClass]);
    };

    // Fallback for when no data is available
    if (!timetable) {
        return <div style={{ color: theme.text }}>No timetable available for this class.</div>;
    }

    const styles = {
        container: { color: theme.text },
        header: { color: theme.primary, borderBottom: `2px solid ${theme.border}`, paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        select: { padding: '0.75rem', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.cardBackground, color: theme.text, fontSize: '1rem' },
        tableContainer: { overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' },
        table: { width: '100%', borderCollapse: 'collapse', minWidth: '800px' },
        tableHead: { background: `linear-gradient(45deg, ${theme.primary}, #6a5acd)`, color: '#ffffff' },
        tableHeaderCell: { padding: '15px', textAlign: 'center', fontWeight: '600' },
        tableBody: { backgroundColor: theme.cardBackground },
        tableRow: { borderBottom: `1px solid ${theme.border}` },
        tableCell: { padding: '12px 15px', textAlign: 'center', transition: 'background-color 0.2s', ':hover': { backgroundColor: theme.hover } },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h4 style={{ margin: 0, fontSize: '1.5rem' }}>Class Timetable</h4>
                <select
                    value={selectedClass}
                    onChange={handleClassChange}
                    style={styles.select}
                >
                    {dummyData.classes.map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead style={styles.tableHead}>
                    <tr>
                        <th style={styles.tableHeaderCell}>Time / Day</th>
                        {dummyData.days.map(day => (
                            <th key={day} style={styles.tableHeaderCell}>{day}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody style={styles.tableBody}>
                    {dummyData.periods.map((period, periodIndex) => (
                        <tr key={periodIndex} style={styles.tableRow}>
                            <td style={{ ...styles.tableCell, fontWeight: '600', backgroundColor: theme.hover }}>{period}</td>
                            {timetable[periodIndex]?.map((subject, dayIndex) => (
                                <td key={dayIndex} style={styles.tableCell}>
                                    {subject || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassTimetable;