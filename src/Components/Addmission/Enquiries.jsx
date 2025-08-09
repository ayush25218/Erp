import React, { useState, useEffect } from 'react';
import './Admission.css';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newEnquiry, setNewEnquiry] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Admission Process'
    });
    const [errors, setErrors] = useState({});

    // Load sample data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            const sampleData = [
                {
                    id: 1,
                    name: 'Anil Kumar',
                    email: 'anil@example.com',
                    phone: '9876543210',
                    enquiryDate: new Date().toISOString().split('T')[0],
                    subject: 'Admission Process',
                    status: 'New',
                    notes: ''
                },
                {
                    id: 2,
                    name: 'Sunita Reddy',
                    email: 'sunita@example.com',
                    phone: '8765432109',
                    enquiryDate: '2023-05-12',
                    subject: 'Fee Structure',
                    status: 'Follow Up',
                    notes: 'Requested fee details via email\nWill call back next week'
                },
                {
                    id: 3,
                    name: 'Rajesh Patel',
                    email: 'rajesh@example.com',
                    phone: '7654321098',
                    enquiryDate: '2023-05-15',
                    subject: 'School Tour',
                    status: 'New',
                    notes: ''
                },
                {
                    id: 4,
                    name: 'Priya Sharma',
                    email: 'priya@example.com',
                    phone: '6543210987',
                    enquiryDate: '2023-05-08',
                    subject: 'Scholarship',
                    status: 'Resolved',
                    notes: 'Provided scholarship details\nApplication submitted'
                }
            ];

            setEnquiries(sampleData);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const filteredEnquiries = enquiries.filter(enquiry => {
        const matchesTab = activeTab === 'all' ||
            enquiry.status.toLowerCase().replace(' ', '-') === activeTab;
        const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enquiry.phone.includes(searchTerm) ||
            enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const updateStatus = (id, newStatus) => {
        setEnquiries(enquiries.map(e =>
            e.id === id ? { ...e, status: newStatus } : e
        ));

        if (selectedEnquiry?.id === id) {
            setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
    };

    const addNote = () => {
        if (!selectedEnquiry || !noteText.trim()) return;

        const updatedEnquiries = enquiries.map(e =>
            e.id === selectedEnquiry.id
                ? { ...e, notes: e.notes ? `${e.notes}\n${new Date().toLocaleDateString()}: ${noteText}` : `${new Date().toLocaleDateString()}: ${noteText}` }
                : e
        );

        setEnquiries(updatedEnquiries);
        setSelectedEnquiry(updatedEnquiries.find(e => e.id === selectedEnquiry.id));
        setNoteText('');
    };

    const validateEnquiry = () => {
        const newErrors = {};
        if (!newEnquiry.name.trim()) newErrors.name = 'Name is required';
        if (!newEnquiry.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEnquiry.email)) newErrors.email = 'Invalid email';
        if (!newEnquiry.phone.trim()) newErrors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(newEnquiry.phone)) newErrors.phone = 'Invalid phone number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitEnquiry = (e) => {
        e.preventDefault();
        if (!validateEnquiry()) return;

        const enquiry = {
            id: enquiries.length + 1,
            name: newEnquiry.name,
            email: newEnquiry.email,
            phone: newEnquiry.phone,
            enquiryDate: new Date().toISOString().split('T')[0],
            subject: newEnquiry.subject,
            status: 'New',
            notes: ''
        };

        setEnquiries([enquiry, ...enquiries]);
        setNewEnquiry({
            name: '',
            email: '',
            phone: '',
            subject: 'Admission Process'
        });
        setShowModal(false);
    };

    return (
        <div className="enquiries-container">
            <div className="enquiries-header">
                <h2>Admission Enquiries</h2>
                <p>Manage and track all admission-related inquiries</p>

                <div className="header-actions">
                    <div className="search-box">
                        <svg className="search-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search enquiries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <svg className="btn-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                        New Enquiry
                    </button>
                </div>
            </div>

            <div className="enquiry-tabs">
                {['all', 'new', 'follow-up', 'resolved'].map((tab) => {
                    const label = tab === 'all' ? 'All' :
                        tab === 'follow-up' ? 'Follow Up' :
                            tab.charAt(0).toUpperCase() + tab.slice(1);

                    return (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {label}
                            <span className="tab-count">
                                {tab === 'all' ? enquiries.length :
                                    enquiries.filter(e => e.status.toLowerCase().replace(' ', '-') === tab).length}
                            </span>
                        </button>
                    );
                })}
            </div>

            {isLoading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading enquiries...</p>
                </div>
            ) : (
                <div className="enquiry-content">
                    <div className={`enquiry-list ${selectedEnquiry ? 'with-details' : ''}`}>
                        {filteredEnquiries.length === 0 ? (
                            <div className="empty-state">
                                <svg className="empty-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M9,3A6,6 0 0,1 15,3C18,3 21,5 21,8C21,11.31 18,13 15,16C12,13 9,11.31 9,8C9,5 9,3 9,3M4.27,21L3,22L4.12,16.25L4.27,21Z" />
                                </svg>
                                <h3>No enquiries found</h3>
                                <p>Try changing your search or filter criteria</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setActiveTab('all');
                                        setSearchTerm('');
                                    }}
                                >
                                    Reset filters
                                </button>
                            </div>
                        ) : (
                            <table className="enquiries-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Date</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredEnquiries.map(enquiry => (
                                    <tr
                                        key={enquiry.id}
                                        className={selectedEnquiry?.id === enquiry.id ? 'selected' : ''}
                                    >
                                        <td>
                                            <button
                                                className="name-button"
                                                onClick={() => setSelectedEnquiry(enquiry)}
                                            >
                                                <div className="enquiry-name">
                                                    {enquiry.name}
                                                    {enquiry.notes && (
                                                        <svg className="note-indicator" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M15,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9L15,3M19,19H5V5H14V10H19M17,14H7V12H17M14,17H7V15H14" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </button>
                                        </td>
                                        <td>
                                            <div className="contact-info">
                                                <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                                                <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                                            </div>
                                        </td>
                                        <td>{new Date(enquiry.enquiryDate).toLocaleDateString()}</td>
                                        <td>{enquiry.subject}</td>
                                        <td>
                                            <div className={`status-badge ${enquiry.status.toLowerCase().replace(' ', '-')}`}>
                                                {enquiry.status}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {selectedEnquiry && (
                        <div className="enquiry-details">
                            <div className="details-header">
                                <h3>Enquiry Details</h3>
                                <button
                                    className="btn btn-icon"
                                    onClick={() => setSelectedEnquiry(null)}
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Name</label>
                                    <span>{selectedEnquiry.name}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Email</label>
                                    <a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a>
                                </div>
                                <div className="detail-item">
                                    <label>Phone</label>
                                    <a href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a>
                                </div>
                                <div className="detail-item">
                                    <label>Date</label>
                                    <span>{new Date(selectedEnquiry.enquiryDate).toLocaleDateString()}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Subject</label>
                                    <span>{selectedEnquiry.subject}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Status</label>
                                    <div className="status-select-container">
                                        <select
                                            value={selectedEnquiry.status}
                                            onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value)}
                                            className={`status-select ${selectedEnquiry.status.toLowerCase().replace(' ', '-')}`}
                                        >
                                            <option value="New">New</option>
                                            <option value="Follow Up">Follow Up</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                        <svg className="dropdown-icon" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="notes-section">
                                <h4>Notes</h4>
                                {selectedEnquiry.notes ? (
                                    <div className="notes-display">
                                        {selectedEnquiry.notes.split('\n').map((note, i) => (
                                            <div key={i} className="note-item">
                                                <div className="note-content">{note}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-notes">
                                        <svg viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M9,3A6,6 0 0,1 15,3C18,3 21,5 21,8C21,11.31 18,13 15,16C12,13 9,11.31 9,8C9,5 9,3 9,3M4.27,21L3,22L4.12,16.25L4.27,21Z" />
                                        </svg>
                                        <p>No notes added yet</p>
                                    </div>
                                )}

                                <div className="add-note">
                                    <textarea
                                        placeholder="Add a note about this enquiry..."
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        rows="3"
                                    ></textarea>
                                    <button
                                        className="btn btn-primary"
                                        onClick={addNote}
                                        disabled={!noteText.trim()}
                                    >
                                        Add Note
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* New Enquiry Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>New Admission Enquiry</h3>
                            <button
                                className="btn btn-icon"
                                onClick={() => {
                                    setShowModal(false);
                                    setErrors({});
                                }}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitEnquiry}>
                            <div className="form-group">
                                <label>Name*</label>
                                <input
                                    type="text"
                                    value={newEnquiry.name}
                                    onChange={(e) => setNewEnquiry({...newEnquiry, name: e.target.value})}
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label>Email*</label>
                                <input
                                    type="email"
                                    value={newEnquiry.email}
                                    onChange={(e) => setNewEnquiry({...newEnquiry, email: e.target.value})}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label>Phone*</label>
                                <input
                                    type="tel"
                                    value={newEnquiry.phone}
                                    onChange={(e) => setNewEnquiry({...newEnquiry, phone: e.target.value})}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <select
                                    value={newEnquiry.subject}
                                    onChange={(e) => setNewEnquiry({...newEnquiry, subject: e.target.value})}
                                >
                                    <option value="Admission Process">Admission Process</option>
                                    <option value="Fee Structure">Fee Structure</option>
                                    <option value="School Tour">School Tour</option>
                                    <option value="Scholarship">Scholarship</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowModal(false);
                                        setErrors({});
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Enquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enquiries;