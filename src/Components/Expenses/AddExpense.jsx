import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTag, FaDollarSign, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

// Pre-defined categories for the dropdown
const expenseCategories = [
    'Travel',
    'Office Supplies',
    'Food & Beverages',
    'Utilities',
    'Marketing',
    'Software Subscriptions',
    'Maintenance',
    'Miscellaneous',
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem',
    },
    header: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    subheading: {
        color: '#6b7280',
        marginBottom: '2rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        display: 'block',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    inputContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        color: '#9ca3af',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    select: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        resize: 'vertical',
        minHeight: '100px',
        transition: 'border-color 0.2s',
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        marginTop: '1rem',
        transition: 'background-color 0.2s',
    },
};

const AddExpense = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: expenseCategories[0],
        amount: '',
        date: new Date().toISOString().slice(0, 10),
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Expense Added:', formData);
        alert('Expense added successfully!');

        // Reset form after submission
        setFormData({
            name: '',
            category: expenseCategories[0],
            amount: '',
            date: new Date().toISOString().slice(0, 10),
            description: '',
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Add New Expense</h1>
                <p style={styles.subheading}>Fill out the form below to record a new business expense.</p>

                <form style={styles.form} onSubmit={handleSubmit}>
                    {/* Expense Name */}
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="name">Expense Name</label>
                        <div style={styles.inputContainer}>
                            <FaFileAlt style={styles.inputIcon} />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="e.g., Travel allowance for client meeting"
                                required
                            />
                        </div>
                    </div>

                    {/* Category and Amount */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="category">Category</label>
                            <div style={styles.inputContainer}>
                                <FaTag style={styles.inputIcon} />
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={{ ...styles.select, paddingLeft: '3rem' }}
                                    required
                                >
                                    {expenseCategories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="amount">Amount (₹)</label>
                            <div style={styles.inputContainer}>
                                <FaDollarSign style={styles.inputIcon} />
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    style={styles.input}
                                    placeholder="e.g., 5000"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date */}
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="date">Date</label>
                        <div style={styles.inputContainer}>
                            <FaCalendarAlt style={styles.inputIcon} />
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={styles.textarea}
                            placeholder="Provide more details about the expense..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        style={styles.submitButton}
                    >
                        <FaPlus />
                        <span>Add Expense</span>
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddExpense;