// src/Components/Exam/Result.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Result = () => {
    // Dummy Data - We'll use a single data structure to combine marks and grades
    const dummyGrades = [
        { gradeName: 'A+', percentageFrom: 90, percentageTo: 100, comment: 'Outstanding' },
        { gradeName: 'A', percentageFrom: 80, percentageTo: 89, comment: 'Excellent' },
        { gradeName: 'B+', percentageFrom: 70, percentageTo: 79, comment: 'Very Good' },
        { gradeName: 'B', percentageFrom: 60, percentageTo: 69, comment: 'Good' },
        { gradeName: 'C', percentageFrom: 50, percentageTo: 59, comment: 'Satisfactory' },
        { gradeName: 'D', percentageFrom: 40, percentageTo: 49, comment: 'Average' },
        { gradeName: 'E', percentageFrom: 0, percentageTo: 39, comment: 'Fail' },
    ];

    // This dummy data simulates marks fetched after selecting Class, Exam & Subject
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
    ];

    // Functions to calculate total marks, percentage and grade
    const calculateTotal = (marks) => marks.reduce((acc, curr) => acc + (parseInt(curr.marksObtained) || 0), 0);
    const calculatePercentage = (total, max) => (total / max * 100).toFixed(2);
    const getGrade = (percentage) => {
        const grade = dummyGrades.find(g => percentage >= g.percentageFrom && percentage <= g.percentageTo);
        return grade ? grade.gradeName : 'N/A';
    };

    const [selectedClass, setSelectedClass] = useState('10th A');
    const [selectedExam, setSelectedExam] = useState('Final Exam');
    const [results, setResults] = useState([]);

    const handleFetchResults = () => {
        const filteredResults = allStudentsResults.filter(
            res => res.class === selectedClass && res.exam === selectedExam
        );
        setResults(filteredResults);
    };

    const handlePrintIndividual = (student) => {
        const totalMarks = calculateTotal(student.marks);
        const maxTotalMarks = student.marks.length * 100;
        const percentage = calculatePercentage(totalMarks, maxTotalMarks);
        const grade = getGrade(percentage);

        const marksTable = student.marks.map(mark => `
            <tr>
                <td>${mark.subject}</td>
                <td>${mark.marksObtained}</td>
                <td>${mark.maxMarks}</td>
            </tr>
        `).join('');

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${student.name}'s Result</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 2rem; }
                        .container { max-width: 700px; margin: 0 auto; border: 1px solid #ccc; padding: 2rem; border-radius: 8px; }
                        h2, h3, h4 { text-align: center; }
                        .details { margin-bottom: 1.5rem; display: flex; justify-content: space-between; }
                        .marks-table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
                        .marks-table th, .marks-table td { border: 1px solid #ccc; padding: 10px; text-align: left; }
                        .summary { margin-top: 1.5rem; border-top: 2px solid #333; padding-top: 1rem; }
                        .summary p { margin: 0.5rem 0; font-size: 1.1rem; }
                        @media print {
                            body { -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>School Name Here</h2>
                        <h3>Result - ${student.exam}</h3>
                        <div class="details">
                            <p><strong>Name:</strong> ${student.name}</p>
                            <p><strong>Roll No:</strong> ${student.rollNo}</p>
                            <p><strong>Class:</strong> ${student.class}</p>
                        </div>
                        <table class="marks-table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks Obtained</th>
                                    <th>Max. Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${marksTable}
                            </tbody>
                        </table>
                        <div class="summary">
                            <p><strong>Total Marks:</strong> ${totalMarks} / ${maxTotalMarks}</p>
                            <p><strong>Percentage:</strong> ${percentage}%</p>
                            <p><strong>Final Grade:</strong> ${grade}</p>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handlePrintAll = () => {
        const tableRows = results.map(student => {
            const totalMarks = calculateTotal(student.marks);
            const maxTotalMarks = student.marks.length * 100;
            const percentage = calculatePercentage(totalMarks, maxTotalMarks);
            const grade = getGrade(percentage);
            return `
                <tr>
                    <td>${student.rollNo}</td>
                    <td>${student.name}</td>
                    ${student.marks.map(m => `<td>${m.marksObtained}</td>`).join('')}
                    <td>${totalMarks}</td>
                    <td>${percentage}%</td>
                    <td>${grade}</td>
                </tr>
            `;
        }).join('');

        const subjects = results[0]?.marks.map(m => m.subject) || [];
        const subjectHeaders = subjects.map(s => `<th>${s}</th>`).join('');

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Class ${selectedClass} Result</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 1rem; }
                        h2, h3 { text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                        @media print {
                            body { -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    <h2>Consolidated Result Sheet</h2>
                    <h3>Class: ${selectedClass} | Exam: ${selectedExam}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                ${subjectHeaders}
                                <th>Total Marks</th>
                                <th>Percentage</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

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
            alignItems: 'flex-end',
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
        fetchButton: {
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s',
        },
        resultCard: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            overflowX: 'auto',
            padding: '1.5rem',
        },
        actionButtons: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '1rem',
            gap: '1rem',
        },
        printButton: {
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#17a2b8',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '1000px',
        },
        tableHeadRow: {
            backgroundColor: '#e9ecef',
            color: '#495057',
            textAlign: 'left',
            fontWeight: '600',
        },
        tableCell: {
            padding: '12px 15px',
            borderBottom: '1px solid #dee2e6',
        },
        individualPrintButton: {
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Student Results</h3>

            {/* Filter Controls */}
            <div style={styles.controlsCard}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Class</label>
                    <select
                        style={styles.select}
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Select Class</option>
                        <option value="10th A">10th A</option>
                        <option value="10th B">10th B</option>
                        <option value="9th A">9th A</option>
                    </select>
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Exam</label>
                    <select
                        style={styles.select}
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                    >
                        <option value="">Select Exam</option>
                        <option value="Mid-Term">Mid-Term</option>
                        <option value="Final Exam">Final Exam</option>
                    </select>
                </div>
                <button
                    style={styles.fetchButton}
                    onClick={handleFetchResults}
                    disabled={!selectedClass || !selectedExam}
                >
                    Fetch Results
                </button>
            </div>

            {/* Results Table */}
            {results.length > 0 && (
                <div style={styles.resultCard}>
                    <div style={styles.actionButtons}>
                        <button style={styles.printButton} onClick={handlePrintAll}>
                            <FontAwesomeIcon icon={faPrint} /> Print All
                        </button>
                    </div>
                    <table style={styles.table}>
                        <thead>
                        <tr style={styles.tableHeadRow}>
                            <th style={styles.tableCell}>Roll No</th>
                            <th style={styles.tableCell}>Student Name</th>
                            {results[0].marks.map((mark, index) => (
                                <th key={index} style={styles.tableCell}>{mark.subject}</th>
                            ))}
                            <th style={styles.tableCell}>Total Marks</th>
                            <th style={styles.tableCell}>Percentage</th>
                            <th style={styles.tableCell}>Grade</th>
                            <th style={styles.tableCell}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map(student => {
                            const totalMarks = calculateTotal(student.marks);
                            const maxTotalMarks = student.marks.length * 100;
                            const percentage = calculatePercentage(totalMarks, maxTotalMarks);
                            const grade = getGrade(percentage);
                            return (
                                <tr key={student.studentId}>
                                    <td style={styles.tableCell}>{student.rollNo}</td>
                                    <td style={styles.tableCell}>{student.name}</td>
                                    {student.marks.map((mark, index) => (
                                        <td key={index} style={styles.tableCell}>{mark.marksObtained}</td>
                                    ))}
                                    <td style={styles.tableCell}>{totalMarks} / {maxTotalMarks}</td>
                                    <td style={styles.tableCell}>{percentage}%</td>
                                    <td style={styles.tableCell}>{grade}</td>
                                    <td style={styles.tableCell}>
                                        <button onClick={() => handlePrintIndividual(student)} style={styles.individualPrintButton}>
                                            <FontAwesomeIcon icon={faPrint} /> Print
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Result;