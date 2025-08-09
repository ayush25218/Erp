import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaCoins, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Dummy data for salary structures
const initialStructures = [
    {
        id: 1,
        name: 'Teacher Basic',
        designation: 'Teacher',
        status: 'Active',
        basic: 45000,
        allowances: [{ name: 'HRA', value: 15000 }, { name: 'DA', value: 8000 }],
        deductions: [{ name: 'EPF', value: 5000 }],
    },
    {
        id: 2,
        name: 'Admin Staff',
        designation: 'Librarian',
        status: 'Active',
        basic: 30000,
        allowances: [{ name: 'HRA', value: 10000 }],
        deductions: [{ name: 'EPF', value: 3000 }],
    },
    {
        id: 3,
        name: 'Support Staff',
        designation: 'Security Guard',
        status: 'Inactive',
        basic: 20000,
        allowances: [{ name: 'Conveyance', value: 2000 }],
        deductions: [],
    },
];

// Helper function to calculate totals
const calculateTotals = (structure) => {
    const totalAllowances = structure.allowances.reduce((sum, item) => sum + item.value, 0);
    const totalDeductions = structure.deductions.reduce((sum, item) => sum + item.value, 0);
    const grossPay = structure.basic + totalAllowances;
    const netPay = grossPay - totalDeductions;
    return { grossPay, netPay };
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
    },
    header: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem',
    },
    subheading: {
        color: '#6b7280',
        marginBottom: '2rem',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
        '@media (min-width: 768px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        borderRadius: '9999px',
        border: '1px solid #d1d5db',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none',
        fontSize: '1rem',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#2563eb',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.2s',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    structureCard: {
        backgroundColor: '#f9fafb',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderLeft: '4px solid #3b82f6',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    structureHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    structureTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontWeight: 'bold',
        fontSize: '0.875rem',
        display: 'inline-block',
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    totalSection: {
        borderTop: '1px dashed #d1d5db',
        marginTop: '1rem',
        paddingTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontWeight: 'bold',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 100,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '1rem',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    itemGroup: {
        border: '1px dashed #d1d5db',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1rem',
    },
    itemRow: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '0.5rem',
    },
    itemInput: {
        flex: 1,
    },
    removeButton: {
        background: 'none',
        border: 'none',
        color: '#ef4444',
        cursor: 'pointer',
    },
    addButtonItem: {
        background: 'none',
        border: '1px dashed #9ca3af',
        borderRadius: '0.5rem',
        color: '#6b7280',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        width: '100%',
    },
    formButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#10b981',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#ef4444',
        color: '#fff',
        borderRadius: '0.75rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
    }
};

const SalaryStructure = () => {
    const [structures, setStructures] = useState(initialStructures);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStructure, setCurrentStructure] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        basic: '',
        status: 'Active',
        allowances: [],
        deductions: [],
    });

    const openAddModal = () => {
        setCurrentStructure(null);
        setFormData({
            name: '',
            designation: '',
            basic: '',
            status: 'Active',
            allowances: [],
            deductions: [],
        });
        setIsModalOpen(true);
    };

    const openEditModal = (structure) => {
        setCurrentStructure(structure);
        setFormData({
            ...structure,
            basic: String(structure.basic),
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (type, index, field, value) => {
        const items = [...formData[type]];
        items[index][field] = value;
        setFormData(prev => ({ ...prev, [type]: items }));
    };

    const handleAddItem = (type) => {
        setFormData(prev => ({
            ...prev,
            [type]: [...prev[type], { name: '', value: '' }],
        }));
    };

    const handleRemoveItem = (type, index) => {
        const items = [...formData[type]];
        items.splice(index, 1);
        setFormData(prev => ({ ...prev, [type]: items }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStructure) {
            setStructures(prev => prev.map(s =>
                s.id === currentStructure.id ? { ...formData, basic: Number(formData.basic), id: s.id } : s
            ));
        } else {
            const newId = structures.length > 0 ? Math.max(...structures.map(s => s.id)) + 1 : 1;
            setStructures(prev => [...prev, { ...formData, id: newId, basic: Number(formData.basic) }]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this salary structure?')) {
            setStructures(prev => prev.filter(s => s.id !== id));
        }
    };

    const filteredStructures = structures.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.header}>Salary Structures</h1>
                <p style={styles.subheading}>Define and manage salary components, allowances, and deductions for different roles.</p>

                {/* Toolbar */}
                <div style={{ ...styles.toolbar }}>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by structure name or designation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openAddModal}
                        style={styles.addButton}
                    >
                        <FaPlus />
                        <span>Add New Structure</span>
                    </motion.button>
                </div>

                {/* Structures Grid */}
                <div style={styles.grid}>
                    <AnimatePresence>
                        {filteredStructures.map(structure => {
                            const { grossPay, netPay } = calculateTotals(structure);
                            return (
                                <motion.div
                                    key={structure.id}
                                    style={styles.structureCard}
                                    whileHover={{ translateY: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <div style={styles.structureHeader}>
                                        <h3 style={styles.structureTitle}>{structure.name}</h3>
                                        <span
                                            style={{
                                                ...styles.statusBadge,
                                                backgroundColor: structure.status === 'Active' ? '#dcfce7' : '#fee2e2',
                                                color: structure.status === 'Active' ? '#10b981' : '#ef4444',
                                            }}
                                        >
                      {structure.status}
                    </span>
                                    </div>
                                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Designation: {structure.designation}</p>

                                    <div style={styles.detailItem}>
                                        <span style={{ fontWeight: '600' }}>Basic Pay:</span>
                                        <span>₹{structure.basic.toLocaleString()}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={{ color: '#10b981' }}>Total Allowances:</span>
                                        <span style={{ color: '#10b981' }}>₹{structure.allowances.reduce((sum, a) => sum + a.value, 0).toLocaleString()}</span>
                                    </div>
                                    <div style={styles.detailItem}>
                                        <span style={{ color: '#ef4444' }}>Total Deductions:</span>
                                        <span style={{ color: '#ef4444' }}>₹{structure.deductions.reduce((sum, d) => sum + d.value, 0).toLocaleString()}</span>
                                    </div>

                                    <div style={styles.totalSection}>
                                        <div style={styles.detailItem}>
                                            <span style={{ fontSize: '1.125rem' }}>Gross Pay:</span>
                                            <span style={{ fontSize: '1.125rem' }}>₹{grossPay.toLocaleString()}</span>
                                        </div>
                                        <div style={styles.detailItem}>
                                            <span style={{ fontSize: '1.125rem' }}>Net Pay:</span>
                                            <span style={{ fontSize: '1.125rem', color: '#2563eb' }}>₹{netPay.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                            onClick={() => openEditModal(structure)}
                                            style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}
                                        >
                                            <FaEdit />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDelete(structure.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <FaTrash />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Modal for Add/Edit Structure */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={closeModal} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <FaTimes size={24} color="#6b7280" />
                            </button>
                            <h2 style={styles.modalHeader}>
                                {currentStructure ? 'Edit Salary Structure' : 'Add New Salary Structure'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {/* Form fields */}
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SalaryStructure;