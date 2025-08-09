import React, { useState, useEffect } from 'react';

const styles = `
/* General Setup and Animated Background */
:root {
    --primary-color: #007bff;
    --primary-hover: #0056b3;
    --light-bg: #ffffff;
    --border-color: #dee2e6;
    --text-color: #495057;
    --header-color: #343a40;
}

body {
    font-family: 'Poppins', sans-serif;
    color: var(--text-color);
    /* Animated Gradient Background */
    background: linear-gradient(135deg, #e0f7fa, #f0e6ff, #e3eeff);
    padding: 0;
    margin: 0;
}

@keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Main Certificate Section Container */
.certification-section {
    max-width: none;
    width: 100%;
    margin: 0;
    border-radius: 0;
}

.cert-header {
    text-align: center;
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid var(--border-color);
}

.cert-header h1 {
    color: var(--header-color);
    margin-bottom: 0.5rem;
}
.cert-content-area {
    padding: 2rem;
    min-height: calc(100vh - 120px);
}

/* Tab Navigation */
.cert-nav {
    display: flex;
    justify-content: stretch;
    background-color: #f8f9fa;
}

.tab-link {
    flex: 1;
    padding: 1rem 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--text-color);
    transition: all 0.3s ease;
}

.tab-link:hover {
    background-color: #e9ecef;
    color: var(--primary-color);
}

.tab-link.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
    background-color: var(--light-bg);
}

.tab-link i {
    margin-right: 8px;
}

/* Tab Content */
.cert-content-area {
    padding: 2rem;
}

.tab-content {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.tab-content h2 {
    margin-bottom: 1.5rem;
    color: var(--header-color);
    font-weight: 600;
}

/* Form Styling */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

/* Certificate Preview Styling */
.certificate-preview {
    border: 2px solid #ddd;
    padding: 2rem;
    margin-top: 2rem;
    background-color: #fff;
    position: relative;
}

.certificate-preview::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" opacity="0.05"><text x="0" y="50" font-family="Arial" font-size="20" transform="rotate(-45 10,50)">SAMPLE</text></svg>') repeat;
    pointer-events: none;
}

.certificate-header {
    text-align: center;
    margin-bottom: 2rem;
}

.certificate-header h2 {
    color: var(--header-color);
    margin-bottom: 0.5rem;
}

.certificate-body {
    line-height: 1.6;
}

.certificate-footer {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
}

.signature {
    width: 40%;
    text-align: center;
}

/* Print Button Section */
.print-section {
    text-align: right;
    margin-top: 2rem;
}

.print-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.8rem 1.8rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.print-btn i {
    margin-right: 8px;
}

.print-btn:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
    body {
        padding: 1rem;
        min-height: auto;
    }
    
    .cert-nav {
        flex-direction: column;
    }
    
    .tab-link {
        border-bottom: 1px solid var(--border-color);
        text-align: left;
        padding: 1rem;
    }
    
    .tab-link.active {
        border-left: 3px solid var(--primary-color);
        border-bottom: 1px solid var(--border-color);
    }
    
    .cert-content-area {
        padding: 1.5rem;
    }
    
    .certificate-footer {
        flex-direction: column;
    }
    
    .signature {
        width: 100%;
        margin-bottom: 1.5rem;
    }
}

@media (max-width: 480px) {
    body {
        padding: 0.5rem;
    }
    
    .cert-header {
        padding: 1.5rem 1rem 0.5rem;
    }
    
    .cert-content-area {
        padding: 1rem;
    }
    
    .certificate-preview {
        padding: 1rem;
    }
}

/* Print Specific Styles */
@media print {
    body * {
        visibility: hidden; /* Hide all content by default */
        background-color: #fff !important;
        color: #000 !important;
    }

    .certificate-preview, 
    .certificate-preview * {
        visibility: visible; /* Show only the certificate preview and its children */
    }

    .certificate-preview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 20px;
        box-shadow: none;
        border: none;
        box-sizing: border-box;
    }

    .certificate-preview::before {
        display: none;
    }
}
`;

const CertificationSection = () => {
    const [activeTab, setActiveTab] = useState('bonafide');
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        reason: '',
        className: '',
        session: '',
        course: '',
        year: '',
        certType: '',
        details: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace(/^(bonafide|transfer|character|other)-/, '');
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    const renderForm = () => {
        // Form rendering logic... (same as before)
        switch (activeTab) {
            case 'bonafide':
                return (
                    <form>
                        <div className="form-group">
                            <label htmlFor="bonafide-name">Full Name</label>
                            <input
                                type="text"
                                id="bonafide-name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bonafide-rollNumber">Roll Number / Student ID</label>
                            <input
                                type="text"
                                id="bonafide-rollNumber"
                                placeholder="Enter your roll number"
                                value={formData.rollNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bonafide-reason">Reason for Certificate</label>
                            <textarea
                                id="bonafide-reason"
                                rows="4"
                                placeholder="e.g., Passport Application, Bank Loan, etc."
                                value={formData.reason}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </form>
                );
            case 'transfer':
                return (
                    <form>
                        <div className="form-group">
                            <label htmlFor="transfer-name">Full Name</label>
                            <input
                                type="text"
                                id="transfer-name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="transfer-className">Last Attended Class</label>
                            <input
                                type="text"
                                id="transfer-className"
                                placeholder="e.g., Class 12, Section A"
                                value={formData.className}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="transfer-session">Academic Session</label>
                            <input
                                type="text"
                                id="transfer-session"
                                placeholder="e.g., 2024-2025"
                                value={formData.session}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                );
            case 'character':
                return (
                    <form>
                        <div className="form-group">
                            <label htmlFor="character-name">Full Name</label>
                            <input
                                type="text"
                                id="character-name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="character-course">Course / Program Completed</label>
                            <input
                                type="text"
                                id="character-course"
                                placeholder="e.g., B.Tech in Computer Science"
                                value={formData.course}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="character-year">Year of Completion</label>
                            <input
                                type="number"
                                id="character-year"
                                placeholder="e.g., 2025"
                                value={formData.year}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                );
            case 'other':
                return (
                    <form>
                        <div className="form-group">
                            <label htmlFor="other-name">Full Name</label>
                            <input
                                type="text"
                                id="other-name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="other-certType">Type of Certificate Required</label>
                            <input
                                type="text"
                                id="other-certType"
                                placeholder="e.g., Migration Certificate, Provisional Degree"
                                value={formData.certType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="other-details">Additional Details</label>
                            <textarea
                                id="other-details"
                                rows="4"
                                placeholder="Provide any specific details or requirements."
                                value={formData.details}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    const renderCertificate = () => {
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        switch (activeTab) {
            case 'bonafide':
                return (
                    <div className="certificate-preview">
                        <div className="certificate-header">
                            <h2>BONAFIDE CERTIFICATE</h2>
                            <p>(OFFICIAL CERTIFICATION)</p>
                        </div>
                        <div className="certificate-body">
                            <p>This is to certify that <strong>{formData.name || '[Student Name]'}</strong> (Roll No: <strong>{formData.rollNumber || '[Roll Number]'}</strong>) is a bonafide student of our institution.</p>
                            <p>This certificate is issued for the purpose of <strong>{formData.reason || '[Purpose]'}</strong>.</p>
                            <p>Date: {dateStr}</p>
                        </div>
                        <div className="certificate-footer">
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Student Signature</p>
                            </div>
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Principal/Registrar</p>
                            </div>
                        </div>
                    </div>
                );
            case 'transfer':
                return (
                    <div className="certificate-preview">
                        <div className="certificate-header">
                            <h2>TRANSFER CERTIFICATE</h2>
                            <p>(SCHOOL LEAVING CERTIFICATE)</p>
                        </div>
                        <div className="certificate-body">
                            <p>This is to certify that <strong>{formData.name || '[Student Name]'}</strong> was a student of this institution in <strong>{formData.className || '[Class]'}</strong> during the academic session <strong>{formData.session || '[Session]'}</strong>.</p>
                            <p>The student has left the institution on {dateStr} and all dues have been cleared.</p>
                            <p>This certificate is issued as requested by the student/parent.</p>
                        </div>
                        <div className="certificate-footer">
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Student/Parent Signature</p>
                            </div>
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Principal</p>
                            </div>
                        </div>
                    </div>
                );
            case 'character':
                return (
                    <div className="certificate-preview">
                        <div className="certificate-header">
                            <h2>CHARACTER CERTIFICATE</h2>
                            <p>(CONDUCT CERTIFICATE)</p>
                        </div>
                        <div className="certificate-body">
                            <p>This is to certify that <strong>{formData.name || '[Student Name]'}</strong> has successfully completed the <strong>{formData.course || '[Course Name]'}</strong> program in the year <strong>{formData.year || '[Year]'}</strong>.</p>
                            <p>During the period of study at this institution, the student's conduct and character were found to be good and satisfactory.</p>
                            <p>Date: {dateStr}</p>
                        </div>
                        <div className="certificate-footer">
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Student Signature</p>
                            </div>
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Principal/Director</p>
                            </div>
                        </div>
                    </div>
                );
            case 'other':
                return (
                    <div className="certificate-preview">
                        <div className="certificate-header">
                            <h2>CERTIFICATE</h2>
                            <p>(OFFICIAL DOCUMENT)</p>
                        </div>
                        <div className="certificate-body">
                            <p>This is to certify that <strong>{formData.name || '[Student Name]'}</strong> has requested for a <strong>{formData.certType || '[Certificate Type]'}</strong> from our institution.</p>
                            <p>Additional details provided: <strong>{formData.details || '[Details]'}</strong></p>
                            <p>This certificate is issued on {dateStr} as per the request of the student.</p>
                        </div>
                        <div className="certificate-footer">
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Student Signature</p>
                            </div>
                            <div className="signature">
                                <p>_________________________</p>
                                <p>Authorized Signatory</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <style>{styles}</style>
            <section className="certification-section">
                <header className="cert-header">
                    <h1>Certificate Applications</h1>
                    <p>Select the certificate you wish to apply for and fill out the required details.</p>
                </header>

                <nav className="cert-nav">
                    <button className={`tab-link ${activeTab === 'bonafide' ? 'active' : ''}`} onClick={() => setActiveTab('bonafide')}>
                        <i className="fas fa-user-check"></i> Bonafide
                    </button>
                    <button className={`tab-link ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')}>
                        <i className="fas fa-exchange-alt"></i> Transfer
                    </button>
                    <button className={`tab-link ${activeTab === 'character' ? 'active' : ''}`} onClick={() => setActiveTab('character')}>
                        <i className="fas fa-award"></i> Character
                    </button>
                    <button className={`tab-link ${activeTab === 'other' ? 'active' : ''}`} onClick={() => setActiveTab('other')}>
                        <i className="fas fa-file-alt"></i> Other
                    </button>
                </nav>

                <div className="cert-content-area">
                    <div className="tab-content">
                        <h2>
                            {activeTab === 'bonafide' && 'Bonafide Certificate Request'}
                            {activeTab === 'transfer' && 'Transfer Certificate (TC) Request'}
                            {activeTab === 'character' && 'Character Certificate Request'}
                            {activeTab === 'other' && 'Other Certificate Request'}
                        </h2>
                        {renderForm()}
                        {renderCertificate()}
                        <div className="print-section">
                            <button type="button" className="print-btn" onClick={handlePrint}>
                                <i className="fas fa-print"></i> Print Certificate
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CertificationSection;