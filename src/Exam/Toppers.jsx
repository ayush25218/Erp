// src/Components/Exam/Toppers.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import TopperCard from './TopperCard'; // We'll create this sub-component

// We will use the same dummy data structure as in the Result component
const allStudentsResults = [
    {
        studentId: 101, rollNo: '10A01', name: 'Rahul Sharma', class: '10th A', exam: 'Final Exam',
        marks: [
            { subject: 'Mathematics', marksObtained: 95, maxMarks: 100 },
            { subject: 'Science', marksObtained: 88, maxMarks: 100 },
            { subject: 'English', marksObtained: 75, maxMarks: 100 },
            { subject: 'History', marksObtained: 82, maxMarks: 100 },
        ]
    },
    {
        studentId: 102, rollNo: '10A02', name: 'Alok Kumar', class: '10th A', exam: 'Final Exam',
        marks: [
            { subject: 'Mathematics', marksObtained: 70, maxMarks: 100 },
            { subject: 'Science', marksObtained: 65, maxMarks: 100 },
            { subject: 'English', marksObtained: 80, maxMarks: 100 },
            { subject: 'History', marksObtained: 75, maxMarks: 100 },
        ]
    },
    {
        studentId: 103, rollNo: '10A03', name: 'Priya Patel', class: '10th A', exam: 'Final Exam',
        marks: [
            { subject: 'Mathematics', marksObtained: 55, maxMarks: 100 },
            { subject: 'Science', marksObtained: 60, maxMarks: 100 },
            { subject: 'English', marksObtained: 68, maxMarks: 100 },
            { subject: 'History', marksObtained: 45, maxMarks: 100 },
        ]
    },
    {
        studentId: 201, rollNo: '10B01', name: 'Sonia Singh', class: '10th B', exam: 'Final Exam',
        marks: [
            { subject: 'Mathematics', marksObtained: 98, maxMarks: 100 },
            { subject: 'Science', marksObtained: 92, maxMarks: 100 },
            { subject: 'English', marksObtained: 90, maxMarks: 100 },
            { subject: 'History', marksObtained: 95, maxMarks: 100 },
        ]
    },
    {
        studentId: 202, rollNo: '10B02', name: 'Vikram Gupta', class: '10th B', exam: 'Final Exam',
        marks: [
            { subject: 'Mathematics', marksObtained: 85, maxMarks: 100 },
            { subject: 'Science', marksObtained: 80, maxMarks: 100 },
            { subject: 'English', marksObtained: 88, maxMarks: 100 },
            { subject: 'History', marksObtained: 79, maxMarks: 100 },
        ]
    },
];

const dummyGrades = [
    { gradeName: 'A+', percentageFrom: 90, percentageTo: 100 },
    { gradeName: 'A', percentageFrom: 80, percentageTo: 89 },
    { gradeName: 'B+', percentageFrom: 70, percentageTo: 79 },
    { gradeName: 'B', percentageFrom: 60, percentageTo: 69 },
    { gradeName: 'C', percentageFrom: 50, percentageTo: 59 },
    { gradeName: 'D', percentageFrom: 40, percentageTo: 49 },
    { gradeName: 'E', percentageFrom: 0, percentageTo: 39 },
];

const getGrade = (percentage) => {
    const grade = dummyGrades.find(g => percentage >= g.percentageFrom && percentage <= g.percentageTo);
    return grade ? grade.gradeName : 'N/A';
};

const Toppers = () => {
    const [selectedClass, setSelectedClass] = useState('10th A');
    const [toppers, setToppers] = useState([]);
    const [loading, setLoading] = useState(false);

    const findToppers = (className) => {
        setLoading(true);
        const studentsInClass = allStudentsResults.filter(student => student.class === className);

        const studentsWithPerformance = studentsInClass.map(student => {
            const totalMarks = student.marks.reduce((acc, curr) => acc + (parseInt(curr.marksObtained) || 0), 0);
            const maxTotalMarks = student.marks.length * 100;
            const percentage = (totalMarks / maxTotalMarks * 100).toFixed(2);
            const grade = getGrade(percentage);

            return {
                ...student,
                totalMarks,
                percentage,
                grade
            };
        });

        const sortedToppers = studentsWithPerformance
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);

        setToppers(sortedToppers);
        setLoading(false);
    };

    useEffect(() => {
        findToppers(selectedClass);
    }, [selectedClass]);

    const styles = {
        container: {
            fontFamily: "'Poppins', sans-serif",
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
        header: {
            color: '#1a237e',
            textAlign: 'center',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '600',
        },
        controlsCard: {
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            marginBottom: '2rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
        },
        label: {
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#343a40',
        },
        select: {
            padding: '0.75rem',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '1rem',
            backgroundColor: '#fff',
        },
        toppersList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
        },
        loadingMessage: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#6c757d',
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Toppers of the Class</h3>

            {/* Class Selection */}
            <div style={styles.controlsCard}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Select Class</label>
                    <select
                        style={styles.select}
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="10th A">10th A</option>
                        <option value="10th B">10th B</option>
                        <option value="9th A">9th A</option>
                    </select>
                </div>
            </div>

            {/* Toppers List */}
            {loading ? (
                <p style={styles.loadingMessage}>Fetching toppers...</p>
            ) : (
                <div style={styles.toppersList}>
                    {toppers.length > 0 ? (
                        toppers.map((topper, index) => (
                            <TopperCard key={topper.studentId} topper={topper} rank={index + 1} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#6c757d', gridColumn: '1 / -1' }}>No toppers found for this class.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Toppers;