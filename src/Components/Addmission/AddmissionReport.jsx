// src/Components/Admission/AdmissionReport.jsx
import React from 'react';

export default function AdmissionReport() {
    // Sample admission report data
    const admissionData = [
        { id: 1, name: "Rahul Sharma", class: "10th", date: "2023-08-01", status: "Approved" },
        { id: 2, name: "Priya Patel", class: "9th", date: "2023-08-05", status: "Pending" },
        { id: 3, name: "Amit Singh", class: "11th", date: "2023-08-03", status: "Approved" },
        { id: 4, name: "Neha Gupta", class: "12th", date: "2023-08-10", status: "Rejected" },
        { id: 5, name: "Suresh Kumar", class: "8th", date: "2023-08-15", status: "Approved" }
    ];

    return (
        <div>
            <h3 style={{ marginBottom: "1.5rem" }}>Admission Report</h3>

            <div style={{ overflowX: "auto" }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <thead>
                    <tr style={{
                        background: "#4361ee",
                        color: "white"
                    }}>
                        <th style={{ padding: "0.75rem", textAlign: "left" }}>ID</th>
                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Student Name</th>
                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Class</th>
                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Admission Date</th>
                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Status</th>
                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admissionData.map((student) => (
                        <tr key={student.id} style={{
                            borderBottom: "1px solid #e5e7eb",
                            "&:hover": { background: "#f3f4f6" }
                        }}>
                            <td style={{ padding: "0.75rem" }}>{student.id}</td>
                            <td style={{ padding: "0.75rem" }}>{student.name}</td>
                            <td style={{ padding: "0.75rem" }}>{student.class}</td>
                            <td style={{ padding: "0.75rem" }}>{student.date}</td>
                            <td style={{
                                padding: "0.75rem",
                                color: student.status === "Approved" ? "green" :
                                    student.status === "Pending" ? "orange" : "red"
                            }}>
                                {student.status}
                            </td>
                            <td style={{ padding: "0.75rem" }}>
                                <button style={{
                                    background: "#4361ee",
                                    color: "white",
                                    border: "none",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    marginRight: "0.5rem"
                                }}>
                                    View
                                </button>
                                <button style={{
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <button style={{
                        background: "#4361ee",
                        color: "white",
                        border: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                    }}>
                        Export to Excel
                    </button>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button style={{
                        background: "#e5e7eb",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}>
                        Previous
                    </button>
                    <button style={{
                        background: "#4361ee",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}>
                        1
                    </button>
                    <button style={{
                        background: "#e5e7eb",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}>
                        2
                    </button>
                    <button style={{
                        background: "#e5e7eb",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}