// src/components/SectionManager.jsx

import React, { useState } from 'react';
import styles from './Classes.module.css'; // Reusing your existing CSS

const SectionManager = ({ classes, onAddSection }) => {
    const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || null);
    const [newSectionName, setNewSectionName] = useState('');

    const selectedClass = classes.find(c => c.id === parseInt(selectedClassId));

    const handleAddSectionClick = () => {
        if (selectedClassId && newSectionName.trim()) {
            onAddSection(parseInt(selectedClassId), newSectionName.trim());
            setNewSectionName('');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Manage Sections</h2>
            <div className={styles.controls}>
                <div className={styles.formGroup}>
                    <label htmlFor="selectClass">Select a Class</label>
                    <select
                        id="selectClass"
                        className={styles.teacherSelect} // Reusing the same select style
                        value={selectedClassId || ''}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                    >
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="newSection">Add New Section</label>
                    <input
                        type="text"
                        id="newSection"
                        className={styles.searchInput} // Reusing the same input style
                        placeholder="e.g., D"
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                    />
                    <button onClick={handleAddSectionClick} className={styles.addClassButton}>Add Section</button>
                </div>
            </div>

            <div className={styles.classList}>
                {selectedClass && (
                    <div className={styles.statCard}>
                        <h3>Sections for {selectedClass.name}</h3>
                        <div className={styles.sections}>
                            {selectedClass.sections.length > 0 ?
                                selectedClass.sections.map((section, i) => <span key={i} className={styles.sectionBadge}>{section}</span>)
                                : <p>No sections defined.</p>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionManager;