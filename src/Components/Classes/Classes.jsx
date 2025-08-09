
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './Classes.module.css';
import { FiSearch, FiChevronDown, FiChevronUp, FiUsers, FiHome, FiPlus, FiEdit2, FiBarChart2, FiUser, FiX } from 'react-icons/fi';

const ClassCard = ({ cls, isExpanded, onToggleExpand, teachers, onAssignTeacher, onAddSection }) => {
    // Find the teacher object based on the class's teacherId
    const assignedTeacher = teachers.find(t => t.id === cls.teacherId);

    const handleTeacherChange = (e) => {
        // Call the parent's function to update the teacher
        onAssignTeacher(cls.id, e.target.value);
    };

    const handleAddSection = () => {
      const newSectionName = prompt("Enter new section name:");
      if (newSectionName) {
        // Call the parent's function to add a new section
        onAddSection(cls.id, newSectionName);
      }
    };

    return (
        <div className={`${styles.classCard} ${isExpanded ? styles.expanded : ''}`}>
            <div
                className={styles.classHeader}
                onClick={() => onToggleExpand(cls.id)}
                role="button"
                tabIndex="0"
                aria-expanded={isExpanded}
                onKeyDown={(e) => e.key === 'Enter' && onToggleExpand(cls.id)}
            >
                <div className={styles.classInfo}>
                    <h3>{cls.name}</h3>
                    <p>{assignedTeacher ? assignedTeacher.name : 'Teacher not assigned'}</p>
                </div>

                <div className={styles.classStats}>
                    <span className={styles.stat}>
                        <FiUsers className={styles.statIcon} />
                        {cls.students} Students
                    </span>
                    <span className={styles.stat}>
                        <FiHome className={styles.statIcon} />
                        {cls.room}
                    </span>
                </div>
                {isExpanded ? <FiChevronUp className={styles.expandIcon} /> : <FiChevronDown className={styles.expandIcon} />}
            </div>

            {isExpanded && (
                <div className={styles.classDetails}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailSection}>
                            <h4>Sections <button onClick={handleAddSection} className={styles.addSectionButton}><FiPlus /></button></h4>
                            <div className={styles.sections}>
                                {cls.sections && cls.sections.length > 0 ? (
                                    cls.sections.map((section, i) => (
                                        <span key={i} className={styles.sectionBadge}>{section}</span>
                                    ))
                                ) : (
                                    <p className={styles.noSections}>No sections added yet</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.detailSection}>
                            <h4>Assign Teacher</h4>
                            <select
                                value={cls.teacherId || ''}
                                onChange={handleTeacherChange}
                                className={styles.teacherSelect}
                            >
                                <option value="">-- Select Teacher --</option>
                                {/* Filter out teachers who are already assigned to another class */}
                                {teachers.filter(t => !t.assignedClassId || t.assignedClassId === cls.id).map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.actionButton}>
                            <FiUser className={styles.buttonIcon} />
                            View Students
                        </button>
                        <button className={styles.actionButton}>
                            <FiEdit2 className={styles.buttonIcon} />
                            Edit Class
                        </button>
                        <button className={styles.actionButton}>
                            <FiBarChart2 className={styles.buttonIcon} />
                            View Performance
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

ClassCard.propTypes = {
    cls: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggleExpand: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    onAssignTeacher: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
};

const ClassList = ({ classes, teachers, onAssignTeacher, onAddSection, onAddNewClass }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedClass, setExpandedClass] = useState(null);
    const [modalStep, setModalStep] = useState(null);
    const [newClass, setNewClass] = useState({ name: '', room: '' });

    // Use useMemo to filter classes based on search term and active filter
    const filteredClasses = useMemo(() => {
        // Map over classes to add the teacher's name for easy searching
        const classesWithTeacherName = classes.map(cls => ({
            ...cls,
            teacherName: teachers.find(t => t.id === cls.teacherId)?.name || 'Teacher not assigned',
        }));

        return classesWithTeacherName.filter(cls => {
            const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (cls.teacherName && cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase()));

            if (activeFilter === 'all') return matchesSearch;
            if (activeFilter === 'primary' && ['Nursery', 'Kindergarten', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V'].includes(cls.name))
                return matchesSearch;
            if (activeFilter === 'secondary' && ['Class VI', 'Class VII', 'Class VIII'].includes(cls.name))
                return matchesSearch;
            if (activeFilter === 'senior' && ['Class IX', 'Class X', 'Class XI', 'Class XII'].includes(cls.name))
                return matchesSearch;
            return false;
        });
    }, [activeFilter, searchTerm, classes, teachers]);

    const toggleExpand = (id) => setExpandedClass(expandedClass === id ? null : id);
    const openAddClassModal = () => setModalStep('addClass');
    const closeModal = () => setModalStep(null);

    const handleAddClassSubmit = (e) => {
      e.preventDefault();
      // Call the parent's function to add the new class
      onAddNewClass(newClass);
      closeModal();
    };

    const totalClasses = classes.length;
    const totalSections = classes.reduce((sum, cls) => sum + (cls.sections ? cls.sections.length : 0), 0);
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Classes & Sections</h1>
                    <p className={styles.subtitle}>Manage and view all class sections in the school</p>
                </div>
            </header>

            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search classes or teachers..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search classes"
                    />
                </div>
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All Classes
                    </button>
                    <button
                        className={`${styles.filterButton} ${activeFilter === 'primary' ? styles.active : ''}`}
                        onClick={() => setActiveFilter('primary')}
                    >
                        Primary
                    </button>
                    <button
                        className={`${styles.filterButton} ${activeFilter === 'secondary' ? styles.active : ''}`}
                        onClick={() => setActiveFilter('secondary')}
                    >
                        Secondary
                    </button>
                    <button
                        className={`${styles.filterButton} ${activeFilter === 'senior' ? styles.active : ''}`}
                        onClick={() => setActiveFilter('senior')}
                    >
                        Senior
                    </button>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Total Classes</h3>
                    <p>{totalClasses}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Sections</h3>
                    <p>{totalSections}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Students</h3>
                    <p>{totalStudents.toLocaleString()}</p>
                </div>
            </div>

            <div className={styles.mainActions}>
                <button className={styles.addClassButton} onClick={openAddClassModal}>
                    <FiPlus className={styles.addIcon} />
                    Add Class
                </button>
            </div>

            <div className={styles.classList}>
                {filteredClasses.length > 0 ? (
                    filteredClasses.map(cls => (
                        <ClassCard
                            key={cls.id}
                            cls={cls}
                            isExpanded={expandedClass === cls.id}
                            onToggleExpand={toggleExpand}
                            teachers={teachers}
                            onAssignTeacher={onAssignTeacher}
                            onAddSection={onAddSection}
                        />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>No classes found matching your criteria</p>
                        <button
                            className={styles.resetButton}
                            onClick={() => {
                                setSearchTerm('');
                                setActiveFilter('all');
                            }}
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>

            {modalStep === 'addClass' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>Add New Class</h2>
                            <button onClick={closeModal} className={styles.closeButton}>
                                <FiX />
                            </button>
                        </div>
                        <form onSubmit={handleAddClassSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="className">Class Name</label>
                                <input
                                    type="text"
                                    id="className"
                                    value={newClass.name}
                                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="classRoom">Room Number</label>
                                <input
                                    type="text"
                                    id="classRoom"
                                    value={newClass.room}
                                    onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={closeModal} className={styles.cancelButton}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitButton}>
                                    Add Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

ClassList.propTypes = {
    classes: PropTypes.array.isRequired,
    teachers: PropTypes.array.isRequired,
    onAssignTeacher: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
    onAddNewClass: PropTypes.func.isRequired,
};

export default ClassList;
