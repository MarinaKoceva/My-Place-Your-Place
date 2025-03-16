import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ email, onUpdateBirthdate }) {
    const navigate = useNavigate();
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState({ day: "", month: "", year: "" });

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Profile updated:", { newEmail, password, birthdate });
        onUpdateBirthdate(birthdate); // Подаваме новата дата обратно
        alert("Profile updated!");
        navigate("/profile"); // Връщаме обратно към профила
    };

    return (
        <div className="profile-container">
            <section className="profile-card">
                <button onClick={() => navigate("/profile")} className="back-btn">←</button>

                <div className="profile-header">
                    <img src="/images/profil-pic1.gif" alt="Profile" className="profile-image" onError={(e) => e.target.src = "/images/default-avatar.png"} />
                    <h2>{email}</h2>
                </div>

                <div className="profile-email">
                    <label>New Email:</label>
                    <input
                        type="email"
                        placeholder="Enter new email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>

                <div className="profile-password">
                    <label>New Password:</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="password-note">Password should contain at least 6 characters</p>
                </div>

                <div className="profile-birthday">
                    <label>Birthday:</label>
                    <div className="birthday-select">
                        <select value={birthdate.day} onChange={(e) => setBirthdate({ ...birthdate, day: e.target.value })}>
                            <option value="">Day</option>
                            {[...Array(31)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select value={birthdate.month} onChange={(e) => setBirthdate({ ...birthdate, month: e.target.value })}>
                            <option value="">Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <select value={birthdate.year} onChange={(e) => setBirthdate({ ...birthdate, year: e.target.value })}>
                            <option value="">Year</option>
                            {[...Array(50)].map((_, i) => (
                                <option key={i} value={1990 + i}>{1990 + i}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="profile-buttons">
                    <button onClick={handleSave} className="btn save-btn">Save</button>
                </div>
            </section>
        </div>
    );
}
