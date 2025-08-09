// src/Components/Attendance/AttendanceDashboard.jsx

import { useState } from 'react';
import StudentAttendanceReport from './StudentAttendanceReport';
import StaffAttendanceReport from './StaffAttendanceReport';

// Sample data (you can replace this with data fetched from an API)
const attendanceData = {
    daily: {
        students: {
            total: 100,
            present: 85,
            absent: 10,
            onLeave: 5,
            details: [
                { name: 'Rahul Sharma', class: '10th A', status: 'Present' },
                { name: 'Priya Patel', class: '9th B', status: 'Absent' },
                { name: 'Amit Singh', class: '11th C', status: 'Present' },
                { name: 'Neha Gupta', class: '10th A', status: 'On Leave' },
            ]
        },
        staff: {
            total: 30,
            present: 25,
            absent: 3,
            onLeave: 2,
            details: [
                { name: 'Dr. Sunita Verma', position: 'Principal', status: 'Present' },
                { name: 'Prof. Rajesh Kumar', position: 'Math Teacher', status: 'Absent' },
                { name: 'Ms. Neha Gupta', position: 'English Teacher', status: 'Present' },
            ]
        }
    },
    monthly: {
        students: {
            details: [
                { name: 'Rahul Sharma', present: 20, absent: 2, percentage: 91 },
                { name: 'Priya Patel', present: 18, absent: 4, percentage: 82 },
                { name: 'Amit Singh', present: 21, absent: 1, percentage: 95 },
            ]
        },
        staff: {
            details: [
                { name: 'Dr. Sunita Verma', position: 'Principal', present: 22, absent: 0, percentage: 100 },
                { name: 'Prof. Rajesh Kumar', position: 'Math Teacher', present: 19, absent: 3, percentage: 86 },
                { name: 'Ms. Neha Gupta', position: 'English Teacher', present: 21, absent: 1, percentage: 95 },
            ]
        }
    }
};

const buttonStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: isActive ? '#4361ee' : 'white',
    color: isActive ? 'white' : '#6b7280',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background 0.2s, color 0.2s',
    borderRight: '1px solid #e2e8f0'
});

const AttendanceDashboard = () => {
    const [activeAttendanceType, setActiveAttendanceType] = useState('student');
    const [activeReportType, setActiveReportType] = useState('daily');

    return (
        <div style={{ backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>Attendance Management</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <button
                            onClick={() => setActiveAttendanceType('student')}
                            style={buttonStyle(activeAttendanceType === 'student')}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setActiveAttendanceType('staff')}
                            style={buttonStyle(activeAttendanceType === 'staff')}
                        >
                            Staff
                        </button>
                    </div>
                    <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <button
                            onClick={() => setActiveReportType('daily')}
                            style={buttonStyle(activeReportType === 'daily')}
                        >
                            Daily
                        </button>
                        <button
                            onClick={() => setActiveReportType('monthly')}
                            style={buttonStyle(activeReportType === 'monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
            </div>

            {activeAttendanceType === 'student' ? (
                <StudentAttendanceReport dailyData={attendanceData.daily} monthlyData={attendanceData.monthly} reportType={activeReportType} />
            ) : (
                <StaffAttendanceReport dailyData={attendanceData.daily} monthlyData={attendanceData.monthly} reportType={activeReportType} />
            )}
        </div>
    );
};

export default AttendanceDashboard;