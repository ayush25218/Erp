import React, { useState } from 'react';
import './Admission.css';

const Applications = () => {
    const [applications, setApplications] = useState([
        {
            id: 1,
            studentName: 'Rahul Sharma',
            appliedDate: '2023-05-15',
            grade: 'Grade 5',
            status: 'Pending',
            contact: '9876543210'
        },
        {
            id: 2,
            studentName: 'Priya Patel',
            appliedDate: '2023-05-18',
            grade: 'Grade 3',
            status: 'Approved',
            contact: '8765432109'
        },
        // More sample data...
    ]);

    const [filter, setFilter] = useState('all');

    const filteredApplications = filter === 'all'
        ? applications
        : applications.filter(app => app.status.toLowerCase() === filter);

    const updateStatus = (id, newStatus) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    return (
        <div className="applications-section">
            <div className="section-header">
                <h2>Admission Applications</h2>
                <div className="filters">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Applications</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button className="btn btn-primary">Export to Excel</button>
                </div>
            </div>

            <div className="applications-table-container">
                <table className="applications-table">
                    <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Student Name</th>
                        <th>Applied Date</th>
                        <th>Grade</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredApplications.map(application => (
                        <tr key={application.id}>
                            <td>#{application.id}</td>
                            <td>{application.studentName}</td>
                            <td>{application.appliedDate}</td>
                            <td>{application.grade}</td>
                            <td>{application.contact}</td>
                            <td>
                  <span className={`status-badge ${application.status.toLowerCase()}`}>
                    {application.status}
                  </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="btn btn-sm btn-view"
                                        onClick={() => {/* View details logic */}}
                                    >
                                        View
                                    </button>
                                    {application.status === 'Pending' && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-approve"
                                                onClick={() => updateStatus(application.id, 'Approved')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-sm btn-reject"
                                                onClick={() => updateStatus(application.id, 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-controls">
                <button className="btn btn-pagination">Previous</button>
                <span>Page 1 of 5</span>
                <button className="btn btn-pagination">Next</button>
            </div>
        </div>
    );
};

export default Applications;