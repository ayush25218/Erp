import React, { useState } from 'react';
import './Admission.css';

const Admission = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        dob: '',
        gender: '',
        parentName: '',
        contact: '',
        email: '',
        address: '',
        previousSchool: '',
        gradeApplying: '',
        documents: []
    });

    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
            if (!formData.dob) newErrors.dob = 'Date of birth is required';
            if (!formData.gender) newErrors.gender = 'Gender is required';
            if (!formData.gradeApplying) newErrors.gradeApplying = 'Grade is required';
        }

        if (step === 2) {
            if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
            if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
            else if (!/^\d{10,15}$/.test(formData.contact)) newErrors.contact = 'Invalid contact number';
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Invalid email address';
            }
            if (!formData.address.trim()) newErrors.address = 'Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            documents: [...e.target.files]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Admission form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (submitSuccess) {
        return (
            <div className="admission-container success-container">
                <div className="success-card">
                    <svg className="success-icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                    </svg>
                    <h2>Application Submitted Successfully!</h2>
                    <p>Thank you for your application. We'll review your information and contact you soon.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSubmitSuccess(false);
                            setCurrentStep(1);
                        }}
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admission-container">
            <div className="form-header">
                <h2>New Student Admission</h2>
                <p>Please fill out the form below to register for admission</p>
            </div>

            <div className="step-indicator">
                {[1, 2, 3].map((step) => (
                    <div key={step} className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                        <div className="step-number">{step}</div>
                        <div className="step-label">
                            {step === 1 && 'Student Info'}
                            {step === 2 && 'Contact Info'}
                            {step === 3 && 'Documents'}
                        </div>
                    </div>
                ))}
                <div className="progress-bar" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
            </div>

            <form onSubmit={handleSubmit} className="admission-form">
                {/* Step 1: Student Details */}
                {currentStep === 1 && (
                    <div className="form-step">
                        <div className="form-row">
                            <div className={`form-group ${errors.studentName ? 'error' : ''}`}>
                                <label>Student Name*</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    placeholder="Enter student's full name"
                                />
                                {errors.studentName && <span className="error-message">{errors.studentName}</span>}
                            </div>

                            <div className={`form-group ${errors.dob ? 'error' : ''}`}>
                                <label>Date of Birth*</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                {errors.dob && <span className="error-message">{errors.dob}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className={`form-group ${errors.gender ? 'error' : ''}`}>
                                <label>Gender*</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                                {errors.gender && <span className="error-message">{errors.gender}</span>}
                            </div>

                            <div className={`form-group ${errors.gradeApplying ? 'error' : ''}`}>
                                <label>Grade Applying For*</label>
                                <select
                                    name="gradeApplying"
                                    value={formData.gradeApplying}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Grade</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i+1} value={`Grade ${i+1}`}>Grade {i+1}</option>
                                    ))}
                                </select>
                                {errors.gradeApplying && <span className="error-message">{errors.gradeApplying}</span>}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                            >
                                Continue
                                <svg className="btn-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                    <div className="form-step">
                        <div className={`form-group ${errors.parentName ? 'error' : ''}`}>
                            <label>Parent/Guardian Name*</label>
                            <input
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                placeholder="Enter parent/guardian's full name"
                            />
                            {errors.parentName && <span className="error-message">{errors.parentName}</span>}
                        </div>

                        <div className="form-row">
                            <div className={`form-group ${errors.contact ? 'error' : ''}`}>
                                <label>Contact Number*</label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                                {errors.contact && <span className="error-message">{errors.contact}</span>}
                            </div>

                            <div className={`form-group ${errors.email ? 'error' : ''}`}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                        </div>

                        <div className={`form-group ${errors.address ? 'error' : ''}`}>
                            <label>Address*</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter complete address"
                                rows="3"
                            ></textarea>
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={prevStep}
                            >
                                <svg className="btn-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                </svg>
                                Back
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                            >
                                Continue
                                <svg className="btn-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                    <div className="form-step">
                        <div className="form-group">
                            <label>Previous School (if any)</label>
                            <input
                                type="text"
                                name="previousSchool"
                                value={formData.previousSchool}
                                onChange={handleChange}
                                placeholder="Name of previous school attended"
                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Documents</label>
                            <div className={`file-upload ${errors.documents ? 'error' : ''}`}>
                                <label className="file-upload-label">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    <div className="file-upload-content">
                                        <svg className="upload-icon" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,13V15H16V13H8M8,17V19H13V17H8Z" />
                                        </svg>
                                        <p>Click to upload or drag and drop</p>
                                        <small>PDF, JPG, or PNG (Max. 5MB each)</small>
                                        {formData.documents.length > 0 && (
                                            <div className="file-preview">
                                                <strong>Selected files:</strong>
                                                <ul>
                                                    {Array.from(formData.documents).map((file, index) => (
                                                        <li key={index}>{file.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={prevStep}
                            >
                                <svg className="btn-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                </svg>
                                Back
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="spinner" viewBox="0 0 50 50">
                                            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Admission;