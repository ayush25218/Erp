// src/components/TeacherAssigner.jsx

import React, { useState } from 'react';
import styles from './Classes.module.css'; // Reusing your existing CSS

const TeacherAssigner = ({ classes, teachers, onAssignTeacher }) => {
    const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || null);
    const [selectedClassId, setSelectedClassId] = useState(null);

    const handleAssignClick = () => {
        if (selectedTeacherId && selectedClassId) {
            onAssignTeacher(parseInt(selectedClassId), parseInt(selectedTeacherId));
            setSelectedClassId(null); // Reset selection after assignment
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Assign Class Teachers</h2>
            <div className={styles.controls} style={{ flexDirection: 'column' }}>
                <div className={styles.formGroup}>
                    <label htmlFor="selectTeacher">Select a Teacher</label>
                    <select
                        id="selectTeacher"
                        className={styles.teacherSelect}
                        value={selectedTeacherId || ''}
                        onChange={(e) => setSelectedTeacherId(e.target.value)}
                    >
                        {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="selectClassToAssign">Assign to Class</label>
                    <select
                        id="selectClassToAssign"
                        className={styles.teacherSelect}
                        value={selectedClassId || ''}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                    >
                        <option value="">-- Select Class --</option>
                        {/* Filter classes to show only those without a teacher, or the currently assigned one */}
                        {classes.filter(cls => !cls.teacherId || cls.teacherId === parseInt(selectedTeacherId)).map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAssignClick} className={styles.addClassButton}>
                    Assign Teacher
                </button>
            </div>
        </div>
    );
};

export default TeacherAssigner;