// src/Components/Timetable/TeacherTimetable.jsx
import React, { useState } from 'react';

// Dummy data for a typical school week and teachers
const dummyData = {
    teachers: ['Ms. Priya Sharma', 'Mr. Rajesh Kumar', 'Ms. Neha Gupta'],
    periods: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 1:00', '1:00 - 2:00'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

// Timetable data for each teacher
const teacherTimetables = {
    'Ms. Priya Sharma': [
        ['10th A - Maths', '10th B - Maths', '11th Sci - Maths', '12th Com - Maths', '10th A - Maths'],
        ['10th B - English', '10th A - Science', '11th Sci - Physics', '12th Com - Accounts', '11th Sci - Chemistry'],
        ['11th Sci - Biology', '12th Com - Economics', '10th A - History', '10th B - Art', '10th A - English'],
        ['10th A - P.E.', '10th B - Science', '11th Sci - Maths', '12th Com - English', '10th B - Maths'],
        ['11th Sci - Physics', '12th Com - Accounts', '10th A - Science', '10th B - History', '11th Sci - Maths'],
    ],
    'Mr. Rajesh Kumar': [
        ['10th A - English', '10th B - History', '11th Sci - P.E.', '12th Com - B.S.', '10th A - Science'],
        ['10th B - Maths', '10th A - History', '11th Sci - English', '12th Com - Economics', '10th B - P.E.'],
        ['11th Sci - Maths', '12th Com - Maths', '10th A - English', '10th B - Science', '11th Sci - Physics'],
        ['10th A - Art', '10th B - P.E.', '11th Sci - Chemistry', '12th Com - B.S.', '10th A - History'],
        ['11th Sci - Biology', '12th Com - English', '10th A - Maths', '10th B - Art', '11th Sci - English'],
    ],
    'Ms. Neha Gupta': [
        ['10th B - English', '10th A - Science', '11th Sci - Physics', '12th Com - Accounts', '11th Sci - Chemistry'],
        ['11th Sci - Biology', '12th Com - Economics', '10th A - History', '10th B - Art', '10th A - English'],
        ['10th A - Maths', '10th B - Maths', '11th Sci - Maths', '12th Com - Maths', '10th A - Maths'],
        ['10th A - P.E.', '10th B - Science', '11th Sci - Maths', '12th Com - English', '10th B - Maths'],
        ['11th Sci - Physics', '12th Com - Accounts', '10th A - Science', '10th B - History', '11th Sci - Maths'],
    ]
};

const TeacherTimetable = ({ theme }) => {
    const [selectedTeacher, setSelectedTeacher] = useState('Ms. Priya Sharma');
    const [timetable, setTimetable] = useState(teacherTimetables['Ms. Priya Sharma']);

    // Function to handle teacher selection
    const handleTeacherChange = (e) => {
        const newTeacher = e.target.value;
        setSelectedTeacher(newTeacher);
        setTimetable(teacherTimetables[newTeacher]);
    };

    // Fallback for when no data is available
    if (!timetable) {
        return <div style={{ color: theme.text }}>No timetable available for this teacher.</div>;
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
                <h4 style={{ margin: 0, fontSize: '1.5rem' }}>Teacher Timetable</h4>
                <select
                    value={selectedTeacher}
                    onChange={handleTeacherChange}
                    style={styles.select}
                >
                    {dummyData.teachers.map((teacher) => (
                        <option key={teacher} value={teacher}>{teacher}</option>
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
                            {timetable[periodIndex]?.map((assignment, dayIndex) => (
                                <td key={dayIndex} style={styles.tableCell}>
                                    {assignment || 'N/A'}
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

export default TeacherTimetable;