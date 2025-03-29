import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ onUpdateProfile, profileData }) {
    const navigate = useNavigate();

    const [formState, setFormState] = useState(profileData); // 🟢 зареждаме данните

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("birthdate.")) {
            const field = name.split(".")[1];
            setFormState(prev => ({
                ...prev,
                birthdate: { ...prev.birthdate, [field]: value }
            }));
        } else {
            setFormState(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        onUpdateProfile(formState);
        alert("Profile updated!");
        navigate("/profile");
    };

    return (
        <div className="profile-container">
            <section className="profile-card">
                <button onClick={() => navigate("/profile")} className="back-btn">←</button>

                <div className="profile-header">
                    <img
                        src={formState.profilePicUrl || "/images/profil-pic1.gif"}
                        alt="Profile"
                        className="profile-image"
                        onError={(e) => e.target.src = "/images/default-avatar.png"}
                    />
                    <h2>{formState.fullName || "Full Name"}</h2>
                </div>

                <form onSubmit={handleSave}>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />

                    <label>Profile Picture URL:</label>
                    <input
                        type="url"
                        name="profilePicUrl"
                        value={formState.profilePicUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />

                    <label>Gender:</label>
                    <select name="gender" value={formState.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Мъж">Man</option>
                        <option value="Жена">Woman</option>
                        <option value="Друго">Other</option>
                    </select>

                    <label>Life Motto:</label>
                    <textarea
                        name="bio"
                        value={formState.bio}
                        onChange={handleChange}
                        placeholder="Enter your life motto..."
                    />

                    {/* 🔔 TOGGLE SWITCH ЗА NOTIFICATIONS */}
                    <label>Receive Notifications:</label>
                    <div className="switch">
                        <input
                            type="checkbox"
                            name="notificationsEnabled"
                            id="notificationsEnabled"
                            checked={formState.notificationsEnabled}
                            onChange={handleChange}
                        />
                        <span className="slider"></span>
                    </div>

                    <label>Preferred Language:</label>
                    <select
                        name="preferredLanguage"
                        value={formState.preferredLanguage}
                        onChange={handleChange}
                    >
                        <option value="">Select Language</option>
                        <option value="Български">Български</option>
                        <option value="English">English</option>
                        <option value="Deutsch">Deutsch</option>
                        <option value="Français">Français</option>
                    </select>

                    <label>Birthday:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={
                            formState.birthdate?.year && formState.birthdate?.month && formState.birthdate?.day
                                ? `${formState.birthdate.year}-${String(new Date(`${formState.birthdate.month} 1`).getMonth() + 1).padStart(2, '0')}-${String(formState.birthdate.day).padStart(2, '0')}`
                                : ""
                        }
                        onChange={(e) => {
                            const [year, month, day] = e.target.value.split("-");
                            setFormState(prev => ({
                                ...prev,
                                birthdate: {
                                    day,
                                    month: new Date(`${month}/01`).toLocaleString('en-US', { month: 'long' }),
                                    year
                                }
                            }));
                        }}
                    />

                    <div className="profile-buttons">
                        <button type="submit" className="btn save-btn">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
}     