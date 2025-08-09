import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaHistory, FaCheckCircle, FaRupeeSign, FaSpinner } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Dummy data for initial fee structure
const initialFeeStructure = [
    { id: '1', name: 'Tution Fee', amount: 25000 },
    { id: '2', name: 'Library Fee', amount: 2500 },
    { id: '3', name: 'Transport Fee', amount: 15000 },
    { id: '4', name: 'Exam Fee', amount: 5000 },
];

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        fontFamily: 'sans-serif',
    },
    card: {
        maxWidth: '64rem',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
    },
    heading: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1f2937',
        marginBottom: '1.5rem',
    },
    subheading: {
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    actionButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontWeight: '600',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        border: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    addNewButton: {
        backgroundColor: '#2563eb',
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#10b981',
        color: '#fff',
    },
    historyButton: {
        backgroundColor: '#6b7280',
        color: '#fff',
    },
    successMessage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        marginBottom: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: '#d1fae5',
        color: '#065f46',
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#eff6ff',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem',
    },
    formInput: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        outline: 'none',
        transition: 'all 0.2s',
    },
    feeItem: {
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
        cursor: 'grab',
        transition: 'all 0.2s',
    },
    feeItemText: {
        fontSize: '1.125rem',
        fontWeight: '500',
        color: '#374151',
    },
    feeAmountText: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    iconButton: {
        padding: '0.5rem',
        borderRadius: '9999px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    editButton: {
        color: '#2563eb',
    },
    deleteButton: {
        color: '#ef4444',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '32rem',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
    },
    modalCloseButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
};

const getRandomColor = () => {
    const colors = ['#fde68a', '#dcfce7', '#e0f2fe', '#fce7f3', '#fee2e2'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const SortableItem = ({ item, handleEdit, handleDelete, isEditing, setEditingItem, handleSave, randomColor }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const [isHovered, setIsHovered] = useState(false);
    const [tempEditItem, setTempEditItem] = useState({ name: item.name, amount: item.amount });

    useEffect(() => {
        if (isEditing) {
            setTempEditItem({ name: setEditingItem.name, amount: setEditingItem.amount });
        }
    }, [isEditing, setEditingItem]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...styles.feeItem,
        backgroundColor: isHovered ? randomColor : '#fff',
        borderLeft: `8px solid ${randomColor}`,
    };

    const handleSaveWrapper = () => {
        handleSave(item.id, tempEditItem);
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEditing && setEditingItem.id === item.id ? (
                <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={tempEditItem.name}
                        onChange={(e) => setTempEditItem({ ...tempEditItem, name: e.target.value })}
                        style={styles.formInput}
                    />
                    <input
                        type="number"
                        value={tempEditItem.amount}
                        onChange={(e) => setTempEditItem({ ...tempEditItem, amount: e.target.value })}
                        style={styles.formInput}
                    />
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={styles.feeItemText}>{item.name}</span>
                    <span style={styles.feeAmountText}>
            <FaRupeeSign style={{ fontSize: '1rem', marginRight: '0.25rem' }} />{item.amount}
          </span>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                {isEditing && setEditingItem.id === item.id ? (
                    <>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSaveWrapper} style={{ ...styles.iconButton, backgroundColor: '#10b981', color: '#fff' }}>
                            <FaSave />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(null)} style={{ ...styles.iconButton, backgroundColor: '#ef4444', color: '#fff' }}>
                            <FaTimes />
                        </motion.button>
                    </>
                ) : (
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(item)} style={{ ...styles.iconButton, ...styles.editButton }}>
                        <FaEdit />
                    </motion.button>
                )}
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(item.id)} style={{ ...styles.iconButton, ...styles.deleteButton }}>
                    <FaTrash />
                </motion.button>
            </div>
        </motion.div>
    );
};

const FeeStructure = () => {
    const [feeStructure, setFeeStructure] = useState(initialFeeStructure);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', amount: '' });
    const [editingItem, setEditingItem] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState({});

    useEffect(() => {
        const newColors = {};
        feeStructure.forEach(item => {
            newColors[item.id] = getRandomColor();
        });
        setColors(newColors);
    }, [feeStructure]);

    const handleAddNewFee = () => {
        if (newItem.name && newItem.amount) {
            const newId = (parseInt(feeStructure[feeStructure.length - 1]?.id || '0') + 1).toString();
            const updatedStructure = [...feeStructure, { ...newItem, id: newId }];
            setFeeStructure(updatedStructure);
            setNewItem({ name: '', amount: '' });
            setIsAddingNew(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleSaveEdit = (id, updatedData) => {
        const updatedStructure = feeStructure.map(item =>
            item.id === id ? { ...item, ...updatedData } : item
        );
        setFeeStructure(updatedStructure);
        setEditingItem(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this fee item?')) {
            const updatedStructure = feeStructure.filter(item => item.id !== id);
            setFeeStructure(updatedStructure);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = feeStructure.findIndex(item => item.id === active.id);
            const newIndex = feeStructure.findIndex(item => item.id === over.id);
            const updatedStructure = [...feeStructure];
            const [movedItem] = updatedStructure.splice(oldIndex, 1);
            updatedStructure.splice(newIndex, 0, movedItem);
            setFeeStructure(updatedStructure);
        }
    };

    const handleSaveChanges = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log("Saving changes to backend:", feeStructure);
            setHistory(prevHistory => [...prevHistory, { date: new Date().toLocaleString(), structure: feeStructure }]);
            setIsLoading(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div style={styles.container}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.card}>
                <h1 style={styles.heading}>Fee Structure Management</h1>
                <p style={styles.subheading}>Drag and drop items to reorder, click to edit, or add new fees below.</p>

                <div style={styles.buttonContainer}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsAddingNew(!isAddingNew)} style={{ ...styles.actionButton, ...styles.addNewButton }}>
                        <FaPlus />
                        <span>Add New Fee</span>
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSaveChanges} style={{ ...styles.actionButton, ...styles.saveButton }}>
                        {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowHistory(!showHistory)} style={{ ...styles.actionButton, ...styles.historyButton }}>
                        <FaHistory />
                        <span>History</span>
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isSaved && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.successMessage}>
                            <FaCheckCircle style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
                            <span>Changes Saved Successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isAddingNew && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={styles.formContainer}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>New Fee Item</h3>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <input type="text" placeholder="Fee Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} style={{ ...styles.formInput, flex: 1 }} />
                                <input type="number" placeholder="Amount" value={newItem.amount} onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })} style={{ ...styles.formInput, flex: 1 }} />
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddNewFee} style={{ ...styles.actionButton, ...styles.addNewButton, width: '100%', borderRadius: '0.5rem' }}>
                                Add Fee
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginBottom: '1rem' }}>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={feeStructure} strategy={verticalListSortingStrategy}>
                            {feeStructure.map((item) => (
                                <SortableItem key={item.id} item={item} handleEdit={handleEdit} handleDelete={handleDelete} isEditing={editingItem !== null} setEditingItem={editingItem} handleSave={handleSaveEdit} randomColor={colors[item.id]}/>
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>

                <AnimatePresence>
                    {showHistory && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.modalOverlay}>
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={styles.modalContent}>
                                <button onClick={() => setShowHistory(false)} style={styles.modalCloseButton}>
                                    <FaTimes size={20} />
                                </button>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Fee Structure History</h2>
                                {history.length > 0 ? (
                                    history.map((version, index) => (
                                        <div key={index} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem', ...(!version.id && { borderBottom: 'none' }) }}>
                                            <p style={{ fontWeight: '600', color: '#4b5563' }}>Saved on: {version.date}</p>
                                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                                {version.structure.map((item) => (
                                                    <li key={item.id}>{item.name}: ₹{item.amount}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: '#6b7280' }}>No history available.</p>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default FeeStructure;