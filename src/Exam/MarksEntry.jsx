// src/Components/Exam/MarksEntry.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faSave } from '@fortawesome/free-solid-svg-icons';

const MarksEntry = () => {
    // Dummy data
    const dummyClasses = ['10th A', '10th B', '9th A'];
    const dummySubjects = ['Mathematics', 'Science', 'English', 'History'];
    const dummyExams = ['Mid-Term', 'Final Exam'];

    const studentsByClass = {
        '10th A': [
            { id: 101, rollNo: '10A01', name: 'Rahul Sharma' },
            { id: 102, rollNo: '10A02', name: 'Alok Kumar' },
            { id: 103, rollNo: '10A03', name: 'Priya Patel' },
        ],
        '10th B': [
            { id: 201, rollNo: '10B01', name: 'Sonia Singh' },
            { id: 202, rollNo: '10B02', name: 'Vikram Gupta' },
        ],
        '9th A': [
            { id: 301, rollNo: '9A01', name: 'Amit Singh' },
            { id: 302, rollNo: '9A02', name: 'Neha Joshi' },
        ],
    };

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [marksData, setMarksData] = useState([]);
    const [isSaved, setIsSaved] = useState(false);

    const handleFetchStudents = () => {
        if (selectedClass && selectedExam && selectedSubject) {
            const students = studentsByClass[selectedClass] || [];
            const newMarksData = students.map(student => {
                // Check if marks already exist for this student, exam, and subject
                const existingMarks = marksData.find(m => m.studentId === student.id && m.exam === selectedExam && m.subject === selectedSubject);
                return existingMarks ? existingMarks : {
                    studentId: student.id,
                    rollNo: student.rollNo,
                    name: student.name,
                    class: selectedClass,
                    exam: selectedExam,
                    subject: selectedSubject,
                    marksObtained: '',
                    maxMarks: 100,
                };
            });
            setMarksData(newMarksData);
            setIsSaved(false); // Reset save status
        }
    };

    const handleMarksChange = (studentId, value) => {
        setMarksData(marksData.map(student =>
            student.studentId === studentId ? { ...student, marksObtained: value } : student
        ));
    };

    const handleSave = () => {
        // Here you would typically send marksData to your backend API
        // For now, we just log it and set a saved state
        console.log("Saving marks:", marksData);
        alert('Marks saved successfully!');
        setIsSaved(true);
    };

    const handlePrintAll = () => {
        const printContent = marksData.map(m => `
            <tr>
                <td>${m.rollNo}</td>
                <td>${m.name}</td>
                <td>${m.subject}</td>
                <td>${m.marksObtained} / ${m.maxMarks}</td>
                <td>${((m.marksObtained / m.maxMarks) * 100).toFixed(2)}%</td>
            </tr>
        `).join('');

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Marks Report for ${selectedClass}</title>
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
                    <h2>School ERP Marks Report</h2>
                    <h3>Class: ${selectedClass} | Exam: ${selectedExam} | Subject: ${selectedSubject}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${printContent}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const handlePrintIndividual = (student) => {
        const percentage = ((student.marksObtained / student.maxMarks) * 100).toFixed(2);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${student.name}'s Marksheet</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 2rem; }
                        .container { max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 2rem; border-radius: 8px; }
                        h2, h3, h4 { text-align: center; }
                        p { margin: 0.5rem 0; }
                        .marks-detail { margin-top: 1.5rem; border-top: 1px dashed #ccc; padding-top: 1rem; }
                        .marks-detail strong { display: inline-block; width: 150px; }
                        @media print {
                            body { -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Marksheet</h2>
                        <h3>${selectedExam}</h3>
                        <p><strong>Student Name:</strong> ${student.name}</p>
                        <p><strong>Roll No:</strong> ${student.rollNo}</p>
                        <p><strong>Class:</strong> ${student.class}</p>
                        <div class="marks-detail">
                            <p><strong>Subject:</strong> ${student.subject}</p>
                            <p><strong>Marks Obtained:</strong> ${student.marksObtained} / ${student.maxMarks}</p>
                            <p><strong>Percentage:</strong> ${percentage}%</p>
                        </div>
                    </div>
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
        },
        controls: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-end',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
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
            alignSelf: 'flex-end',
        },
        marksTableCard: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            overflowX: 'auto',
            padding: '1.5rem',
        },
        tableHeaderSection: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px',
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
        tableInput: {
            width: '80px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        saveButton: {
            backgroundColor: '#28a745',
            padding: '0.75rem 1.5rem',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s',
        },
        printButton: {
            backgroundColor: '#17a2b8',
            padding: '0.5rem 1rem',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s',
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.header}>Marks Entry</h3>

            {/* Control Form */}
            <div style={styles.controlsCard}>
                <div style={styles.controls}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Class</label>
                        <select
                            style={styles.select}
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {dummyClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)}
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
                            {dummyExams.map(exam => <option key={exam} value={exam}>{exam}</option>)}
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Subject</label>
                        <select
                            style={styles.select}
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                            {dummySubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                        </select>
                    </div>
                    <button
                        style={styles.fetchButton}
                        onClick={handleFetchStudents}
                        disabled={!selectedClass || !selectedExam || !selectedSubject}
                    >
                        Fetch Students
                    </button>
                </div>
            </div>

            {/* Marks Entry and Report Table */}
            {marksData.length > 0 && (
                <div style={styles.marksTableCard}>
                    <div style={styles.tableHeaderSection}>
                        <h4 style={{ margin: 0, color: '#1a237e' }}>
                            Marks for {selectedClass} - {selectedSubject}
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button style={{ ...styles.saveButton }} onClick={handleSave}>
                                <FontAwesomeIcon icon={faSave} /> Save Marks
                            </button>
                            <button style={{ ...styles.printButton, backgroundColor: isSaved ? '#17a2b8' : '#6c757d', cursor: isSaved ? 'pointer' : 'not-allowed' }} onClick={handlePrintAll} disabled={!isSaved}>
                                <FontAwesomeIcon icon={faPrint} /> Print All
                            </button>
                        </div>
                    </div>
                    <table style={styles.table}>
                        <thead>
                        <tr style={styles.tableHeadRow}>
                            <th style={styles.tableCell}>Roll No</th>
                            <th style={styles.tableCell}>Student Name</th>
                            <th style={styles.tableCell}>Marks Obtained</th>
                            <th style={styles.tableCell}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {marksData.map(student => (
                            <tr key={student.studentId}>
                                <td style={styles.tableCell}>{student.rollNo}</td>
                                <td style={styles.tableCell}>{student.name}</td>
                                <td style={styles.tableCell}>
                                    <input
                                        type="number"
                                        value={student.marksObtained}
                                        onChange={(e) => handleMarksChange(student.studentId, e.target.value)}
                                        style={styles.tableInput}
                                    />
                                    &nbsp; / {student.maxMarks}
                                </td>
                                <td style={styles.tableCell}>
                                    <button style={{ ...styles.printButton, backgroundColor: isSaved ? '#17a2b8' : '#6c757d', cursor: isSaved ? 'pointer' : 'not-allowed' }} onClick={() => handlePrintIndividual(student)} disabled={!isSaved}>
                                        <FontAwesomeIcon icon={faPrint} /> Print
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MarksEntry;