// src/components/ClassAndSectionManager.jsx

import React, { useState } from 'react';
import ClassList from './ClassList';
import SectionManager from './SectionManager';
import TeacherAssigner from './TeacherAssigner';
// Import your CSS modules here if needed

const ClassAndSectionManager = () => {
    // Centralized State
    const [classes, setClasses] = useState([
        { id: 1, name: 'Nursery', teacherId: 101, room: 'G-101', students: 90, sections: ['A', 'B', 'C'] },
        { id: 2, name: 'Kindergarten', teacherId: null, room: 'G-102', students: 60, sections: [] },
        { id: 3, name: 'Class I', teacherId: 102, room: '1-201', students: 120, sections: ['A', 'B', 'C', 'D'] },
    ]);

    const [teachers, setTeachers] = useState([
        { id: 101, name: 'Ms. Priya Sharma', assignedClassId: 1 },
        { id: 102, name: 'Ms. Neha Gupta', assignedClassId: 3 },
        { id: 103, name: 'Mr. Verma', assignedClassId: null },
        { id: 104, name: 'Ms. Pooja', assignedClassId: null },
    ]);

    const [activeSubmenu, setActiveSubmenu] = useState('classList'); // State to control which submenu is visible

    // Functions to update the shared state
    const handleAssignTeacher = (classId, teacherId) => {
        // 1. Update the class's teacherId
        setClasses(prevClasses =>
            prevClasses.map(cls =>
                cls.id === classId ? { ...cls, teacherId: teacherId ? parseInt(teacherId) : null } : cls
            )
        );

        // 2. Update the teacher's assignedClassId
        setTeachers(prevTeachers =>
            prevTeachers.map(t => {
                // First, unassign the teacher if they were already assigned to another class
                if (t.assignedClassId === classId) {
                    return { ...t, assignedClassId: null };
                }
                // Then, assign the new teacher
                if (t.id === parseInt(teacherId)) {
                    return { ...t, assignedClassId: classId };
                }
                return t;
            })
        );
    };

    const handleAddSection = (classId, newSectionName) => {
        setClasses(prevClasses =>
            prevClasses.map(cls =>
                cls.id === classId ? { ...cls, sections: [...cls.sections, newSectionName] } : cls
            )
        );
    };

    const handleAddNewClass = (newClassData) => {
        const newClassObj = {
            id: classes.length + 1,
            ...newClassData,
            teacherId: null,
            students: 0,
            sections: [],
        };
        setClasses(prevClasses => [...prevClasses, newClassObj]);
    };

    const renderSubmenu = () => {
        switch (activeSubmenu) {
            case 'classList':
                return <ClassList
                    classes={classes}
                    teachers={teachers}
                    onAssignTeacher={handleAssignTeacher}
                    onAddSection={handleAddSection}
                    onAddNewClass={handleAddNewClass}
                />;
            case 'sectionManager':
                return <SectionManager classes={classes} teachers={teachers} onAddSection={handleAddSection} />;
            case 'teacherAssigner':
                return <TeacherAssigner classes={classes} teachers={teachers} onAssignTeacher={handleAssignTeacher} />;
            default:
                return <ClassList />;
        }
    };

    return (
        <div>
            <div className="submenu-tabs">
                <button onClick={() => setActiveSubmenu('classList')} className={activeSubmenu === 'classList' ? 'active' : ''}>
                    Class List
                </button>
                <button onClick={() => setActiveSubmenu('sectionManager')} className={activeSubmenu === 'sectionManager' ? 'active' : ''}>
                    Manage Sections
                </button>
                <button onClick={() => setActiveSubmenu('teacherAssigner')} className={activeSubmenu === 'teacherAssigner' ? 'active' : ''}>
                    Assign Teachers
                </button>
            </div>

            <div className="submenu-content">
                {renderSubmenu()}
            </div>
        </div>
    );
};

export default ClassAndSectionManager;