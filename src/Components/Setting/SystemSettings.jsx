// src/Components/Settings/SystemSettings.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSun, faMoon, faPalette, faLanguage, faBell } from "@fortawesome/free-solid-svg-icons";

// Array of vibrant gradients
const gradients = [
    'linear-gradient(45deg, #10B981, #3B82F6)', // Emerald to Blue
    'linear-gradient(45deg, #EC4899, #8B5CF6)', // Pink to Violet
    'linear-gradient(45deg, #F59E0B, #EF4444)', // Amber to Red
    'linear-gradient(45deg, #60A5FA, #34D399)', // Blue to Green
    'linear-gradient(45deg, #F97316, #FBBF24)', // Orange to Amber
];

const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

const containerStyle = (gradient) => ({
    background: gradient,
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '3rem',
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    transition: 'background 0.5s ease',
    minHeight: '400px',
});

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    paddingBottom: '1rem',
};

const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
};

const settingsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
};

const settingCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
};

const settingItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const settingLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontWeight: '600',
};

const toggleSwitchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
};

const toggleInputStyle = {
    opacity: 0,
    width: 0,
    height: 0,
};

const sliderStyle = (checked) => ({
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: checked ? '#34D399' : '#ccc',
    transition: '.4s',
    borderRadius: '34px',
    '&:before': {
        position: 'absolute',
        content: '""',
        height: '26px',
        width: '26px',
        left: '4px',
        bottom: '4px',
        backgroundColor: 'white',
        transition: '.4s',
        borderRadius: '50%',
        transform: checked ? 'translateX(26px)' : 'translateX(0)',
    },
});

const selectStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
};

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        darkMode: false,
        notifications: true,
        language: 'English',
    });
    const [gradient, setGradient] = useState(getRandomGradient());

    const handleToggle = (settingName) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [settingName]: !prevSettings[settingName],
        }));
    };

    const handleSelectChange = (e) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            language: e.target.value,
        }));
    };

    React.useEffect(() => {
        setGradient(getRandomGradient());
    }, []);

    return (
        <div style={containerStyle(gradient)}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <FontAwesomeIcon icon={faCog} />
                    System Settings
                </div>
            </div>
            <div style={settingsGridStyle}>
                <div style={settingCardStyle}>
                    <h4 style={{ margin: 0 }}>General Settings</h4>
                    <div style={settingItemStyle}>
                        <div style={settingLabelStyle}>
                            <FontAwesomeIcon icon={settings.darkMode ? faMoon : faSun} />
                            <span>Dark Mode</span>
                        </div>
                        <label style={toggleSwitchStyle}>
                            <input type="checkbox" checked={settings.darkMode} onChange={() => handleToggle('darkMode')} style={toggleInputStyle} />
                            <span style={sliderStyle(settings.darkMode)} />
                        </label>
                    </div>
                    <div style={settingItemStyle}>
                        <div style={settingLabelStyle}>
                            <FontAwesomeIcon icon={faPalette} />
                            <span>Theme Color</span>
                        </div>
                        <button
                            onClick={() => setGradient(getRandomGradient())}
                            style={{ padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Change Theme
                        </button>
                    </div>
                </div>

                <div style={settingCardStyle}>
                    <h4 style={{ margin: 0 }}>Notification Settings</h4>
                    <div style={settingItemStyle}>
                        <div style={settingLabelStyle}>
                            <FontAwesomeIcon icon={faBell} />
                            <span>Enable Notifications</span>
                        </div>
                        <label style={toggleSwitchStyle}>
                            <input type="checkbox" checked={settings.notifications} onChange={() => handleToggle('notifications')} style={toggleInputStyle} />
                            <span style={sliderStyle(settings.notifications)} />
                        </label>
                    </div>
                </div>

                <div style={settingCardStyle}>
                    <h4 style={{ margin: 0 }}>Localization</h4>
                    <div style={settingItemStyle}>
                        <div style={settingLabelStyle}>
                            <FontAwesomeIcon icon={faLanguage} />
                            <span>Language</span>
                        </div>
                        <select value={settings.language} onChange={handleSelectChange} style={selectStyle}>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;