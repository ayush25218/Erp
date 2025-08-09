
"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCamera, faCheck, faKey } from "@fortawesome/free-solid-svg-icons";

export default function AccountSection() {
    const [activeTab, setActiveTab] = useState("profile");

    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@school.edu",
        phone: "+91 9876543210",
        address: "123 School Street, Education City",
        bio: "School Administrator",
        avatar: "https://i.pravatar.cc/150?img=3"
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const [message, setMessage] = useState({ type: "", text: "" });
    const [errors, setErrors] = useState({});

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const validatePasswordForm = () => {
        const newErrors = {};

        // Added more robust password validation for a better user experience
        if (!passwords.current) newErrors.current = "Current password is required";
        if (!passwords.new) newErrors.new = "New password is required";
        if (passwords.new.length < 8) newErrors.new = "Password must be at least 8 characters";
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(passwords.new)) newErrors.new = "Password must include 1 uppercase letter";
        // Check for at least one number
        if (!/[0-9]/.test(passwords.new)) newErrors.new = "Password must include 1 number";
        // Check for at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwords.new)) newErrors.new = "Password must include 1 special character";

        if (passwords.new !== passwords.confirm) newErrors.confirm = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitProfile = (e) => {
        e.preventDefault();
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const submitPassword = (e) => {
        e.preventDefault();
        if (!validatePasswordForm()) return;

        setMessage({ type: "success", text: "Password changed successfully!" });
        setPasswords({ current: "", new: "", confirm: "" });
        setErrors({}); // Clear errors on success
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const styles = {
        // --- Updated Modern & Responsive Styles ---
        // New color palette: Dark theme with a vibrant purple accent
        container: {
            maxWidth: "900px",
            margin: "2rem auto",
            padding: "2rem",
            backgroundColor: "#2D3748", // Dark surface color
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)", // Stronger, modern shadow
            fontFamily: "'Inter', sans-serif",
            color: "#E2E8F0" // Light text color
        },
        header: {
            marginBottom: "1.5rem",
            borderBottom: "1px solid #4A5568", // Subtle border
            paddingBottom: "1rem"
        },
        tabs: {
            display: "flex",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #4A5568"
        },
        tab: {
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            borderBottom: "3px solid transparent",
            transition: "all 0.3s ease", // Smooth transition for hover
            fontWeight: "500",
            color: "#A0AEC0", // Muted tab text
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
        },
        activeTab: {
            borderBottom: "3px solid #8B5CF6", // Vibrant purple accent
            color: "#8B5CF6", // Active text color
            fontWeight: "600"
        },
        form: {
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem" // Increased gap for better spacing
        },
        column: {
            flex: "1 1 45%",
            minWidth: "280px"
        },
        fullWidth: {
            flex: "1 1 100%"
        },
        formGroup: {
            marginBottom: "1.5rem", // Increased margin
            width: "100%"
        },
        label: {
            marginBottom: "0.5rem",
            display: "block",
            color: "#E2E8F0",
            fontWeight: "600"
        },
        input: {
            width: "100%",
            padding: "0.75rem",
            borderRadius: "10px",
            border: "1px solid #4A5568",
            backgroundColor: "#1A202C", // Dark input background
            color: "#E2E8F0", // Light input text
            fontSize: "1rem",
            transition: "border-color 0.3s ease-in-out",
            outline: "none",
            ":focus": {
                borderColor: "#8B5CF6", // Highlight with accent color on focus
                boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.5)"
            }
        },
        textarea: {
            minHeight: "120px",
            resize: "vertical"
        },
        avatarContainer: {
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap"
        },
        avatar: {
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "4px solid #8B5CF6", // Accent border
            objectFit: "cover"
        },
        hiddenFileInput: {
            display: "none"
        },
        button: {
            padding: "0.85rem 2rem", // Taller buttons
            borderRadius: "10px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
        },
        primaryButton: {
            backgroundColor: "#8B5CF6",
            color: "white",
            ":hover": {
                backgroundColor: "#7c3aed"
            }
        },
        secondaryButton: {
            backgroundColor: "#4A5568",
            color: "#E2E8F0",
            ":hover": {
                backgroundColor: "#667285"
            }
        },
        alert: {
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem"
        },
        successAlert: {
            backgroundColor: "#1F3D2F", // Dark green background
            color: "#A7F3D0", // Light green text
        },
        errorAlert: {
            backgroundColor: "#4C1D3C", // Dark red background
            color: "#FECACA", // Light red text
        },
        errorText: {
            fontSize: "0.875rem",
            color: "#F87171", // Soft red for errors
            marginTop: "0.5rem"
        },
        requirements: {
            backgroundColor: "#1A202C", // Dark background
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            border: "1px solid #4A5568"
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "700" }}>Account Settings</h2>
                <p style={{ color: "#A0AEC0" }}>Manage your profile and password securely</p>
            </div>

            <div style={styles.tabs}>
                <div
                    style={{ ...styles.tab, ...(activeTab === "profile" ? styles.activeTab : {}) }}
                    onClick={() => setActiveTab("profile")}
                >
                    <FontAwesomeIcon icon={faUserCircle} /> Profile
                </div>
                <div
                    style={{ ...styles.tab, ...(activeTab === "password" ? styles.activeTab : {}) }}
                    onClick={() => setActiveTab("password")}
                >
                    <FontAwesomeIcon icon={faKey} /> Password
                </div>
            </div>

            {message.text && (
                <div style={{
                    ...styles.alert,
                    ...(message.type === "success" ? styles.successAlert : styles.errorAlert)
                }}>
                    {message.text}
                </div>
            )}

            {activeTab === "profile" ? (
                <form style={styles.form} onSubmit={submitProfile}>
                    <div style={styles.fullWidth}>
                        <div style={styles.avatarContainer}>
                            <img src={profile.avatar} alt="avatar" style={styles.avatar} />
                            <div>
                                <button
                                    type="button"
                                    style={{ ...styles.button, ...styles.secondaryButton }}
                                    onClick={() => document.getElementById("avatarInput").click()}
                                >
                                    <FontAwesomeIcon icon={faCamera} /> Change Photo
                                </button>
                                <input
                                    type="file"
                                    id="avatarInput"
                                    style={styles.hiddenFileInput}
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                setProfile(prev => ({
                                                    ...prev,
                                                    avatar: event.target.result
                                                }));
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <p style={{ fontSize: "0.8rem", color: "#A0AEC0" }}>
                                    JPG or PNG. Max 2MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            style={styles.input}
                            value={profile.name}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            style={styles.input}
                            value={profile.email}
                            onChange={handleProfileChange}
                            disabled
                        />
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            style={styles.input}
                            value={profile.phone}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Address</label>
                        <input
                            type="text"
                            name="address"
                            style={styles.input}
                            value={profile.address}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Bio</label>
                        <textarea
                            name="bio"
                            style={{ ...styles.input, ...styles.textarea }}
                            value={profile.bio}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div style={{ ...styles.fullWidth, textAlign: "right" }}>
                        <button
                            type="submit"
                            style={{ ...styles.button, ...styles.primaryButton }}
                        >
                            <FontAwesomeIcon icon={faCheck} /> Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <form style={styles.form} onSubmit={submitPassword}>
                    <div style={styles.fullWidth}>
                        <label style={styles.label}>Current Password</label>
                        <input
                            type="password"
                            name="current"
                            style={styles.input}
                            value={passwords.current}
                            onChange={handlePasswordChange}
                        />
                        {errors.current && <p style={styles.errorText}>{errors.current}</p>}
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>New Password</label>
                        <input
                            type="password"
                            name="new"
                            style={styles.input}
                            value={passwords.new}
                            onChange={handlePasswordChange}
                        />
                        {errors.new && <p style={styles.errorText}>{errors.new}</p>}
                    </div>

                    <div style={styles.column}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirm"
                            style={styles.input}
                            value={passwords.confirm}
                            onChange={handlePasswordChange}
                        />
                        {errors.confirm && <p style={styles.errorText}>{errors.confirm}</p>}
                    </div>

                    <div style={styles.fullWidth}>
                        <div style={styles.requirements}>
                            <strong>Password must include:</strong>
                            <ul style={{ margin: "0.5rem 0 0 1rem", padding: 0 }}>
                                <li>At least 8 characters</li>
                                <li>1 uppercase letter</li>
                                <li>1 number</li>
                                <li>1 special character</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ ...styles.fullWidth, textAlign: "right" }}>
                        <button
                            type="submit"
                            style={{ ...styles.button, ...styles.primaryButton }}
                        >
                            <FontAwesomeIcon icon={faCheck} /> Change Password
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
