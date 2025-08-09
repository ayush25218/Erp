// src/Components/Attendance/StudentAttendanceReport.jsx

const StudentAttendanceReport = ({ dailyData, monthlyData, reportType }) => {
    return (
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#4361ee' }}>Student Attendance</h3>
            {reportType === 'daily' && (
                <div>
                    <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Daily Report - {new Date().toLocaleDateString()}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                            <h5 style={{ fontSize: '2.5rem', color: '#0369a1' }}>{dailyData.students.present}</h5>
                            <p style={{ color: '#0369a1', fontWeight: '600' }}>Present</p>
                        </div>
                        <div style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                            <h5 style={{ fontSize: '2.5rem', color: '#92400e' }}>{dailyData.students.absent}</h5>
                            <p style={{ color: '#92400e', fontWeight: '600' }}>Absent</p>
                        </div>
                        <div style={{ backgroundColor: '#fce7f3', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                            <h5 style={{ fontSize: '2.5rem', color: '#be185d' }}>{dailyData.students.onLeave}</h5>
                            <p style={{ color: '#be185d', fontWeight: '600' }}>On Leave</p>
                        </div>
                        <div style={{ backgroundColor: '#d1fae5', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                            <h5 style={{ fontSize: '2.5rem', color: '#065f46' }}>{dailyData.students.total}</h5>
                            <p style={{ color: '#065f46', fontWeight: '600' }}>Total Students</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Detailed Report</h4>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', minWidth: '600px' }}>
                                <thead>
                                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Student Name</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Class</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dailyData.students.details.map((student, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem' }}>{student.name}</td>
                                        <td style={{ padding: '1rem' }}>{student.class}</td>
                                        <td style={{ padding: '1rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            backgroundColor: student.status === 'Present' ? '#d1fae5' : student.status === 'Absent' ? '#fee2e2' : '#fef3c7',
                            color: student.status === 'Present' ? '#065f46' : student.status === 'Absent' ? '#dc2626' : '#92400e'
                        }}>
                          {student.status}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {reportType === 'monthly' && (
                <div>
                    <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Monthly Report - August 2025</h4>
                    <div style={{
                        height: '300px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #e2e8f0'
                    }}>
                        <p style={{ color: '#64748b' }}>Graph representation of monthly student attendance trends will appear here.</p>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Attendance Summary</h4>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', minWidth: '600px' }}>
                                <thead>
                                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Student Name</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Total Present</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Total Absent</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Attendance %</th>
                                </tr>
                                </thead>
                                <tbody>
                                {monthlyData.students.details.map((student, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem' }}>{student.name}</td>
                                        <td style={{ padding: '1rem' }}>{student.present}</td>
                                        <td style={{ padding: '1rem' }}>{student.absent}</td>
                                        <td style={{ padding: '1rem' }}>
                        <span style={{
                            fontWeight: '600',
                            color: student.percentage > 85 ? '#065f46' : '#92400e'
                        }}>
                          {student.percentage}%
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentAttendanceReport;