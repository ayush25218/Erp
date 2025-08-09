import React, { useState } from 'react';
import styles from './Setting.module.css';
import {
    FiSettings,
    FiLock,
    FiUsers,
    FiCalendar,
    FiBell,
    FiDatabase,
    FiShield
} from 'react-icons/fi';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');

    const settingsCategories = [
        {
            id: 'general',
            name: 'General Settings',
            icon: <FiSettings />,
            settings: [
                {
                    name: 'School Information',
                    description: 'Update school name, address, and contact details'
                },
                {
                    name: 'Academic Calendar',
                    description: 'Configure terms, holidays, and important dates'
                }
            ]
        },
        {
            id: 'security',
            name: 'Security',
            icon: <FiLock />,
            settings: [
                {
                    name: 'Password Policies',
                    description: 'Set password requirements and expiration'
                },
                {
                    name: 'Two-Factor Auth',
                    description: 'Enable additional security for logins'
                }
            ]
        }
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <FiSettings className={styles.headerIcon} />
                    System Settings
                </h1>
                <p className={styles.subtitle}>Configure application preferences and security</p>
            </header>

            <div className={styles.tabs}>
                {settingsCategories.map(category => (
                    <button
                        key={category.id}
                        className={`${styles.tab} ${activeTab === category.id ? styles.active : ''}`}
                        onClick={() => setActiveTab(category.id)}
                    >
                        {category.icon}
                        {category.name}
                    </button>
                ))}
            </div>

            <div className={styles.settingsContainer}>
                <h2 className={styles.sectionTitle}>
                    {settingsCategories.find(c => c.id === activeTab).name}
                </h2>

                <div className={styles.settingsGrid}>
                    {settingsCategories
                        .find(c => c.id === activeTab)
                        .settings.map((setting, index) => (
                            <div key={index} className={styles.settingCard}>
                                <h3>{setting.name}</h3>
                                <p>{setting.description}</p>
                                <button className={styles.configureButton}>
                                    Configure
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            <div className={styles.systemInfo}>
                <h3>System Information</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <FiDatabase className={styles.infoIcon} />
                        <span>Version 2.3.1</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FiShield className={styles.infoIcon} />
                        <span>Last updated: June 15, 2023</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;