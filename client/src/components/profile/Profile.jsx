import { useNavigate } from "react-router-dom";

export default function Profile({ email, birthdate, onLogout }) {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <section className="profile-card">
                {/* Хедър на профила */}
                <div className="profile-header">
                    <img src="/images/profil-pic1.gif" alt="Profile" className="profile-image" onError={(e) => e.target.src = "/images/default-avatar.png"} />
                    <div className="profile-info">
                        <h2>{email}</h2>
                        
                        {/* Показва рождената дата, ако е въведена */}
                        {birthdate?.day && birthdate?.month && birthdate?.year && (
                            <p className="profile-birthday">
                                🎂 {birthdate.day} {birthdate.month} {birthdate.year}
                            </p>
                        )}
                    </div>
                    <button onClick={() => navigate("/profile/edit")} className="edit-btn">✏️</button>
                </div>

                {/* Контейнер за бутоните */}
                <div className="profile-buttons">
                    <button onClick={onLogout} className="btn logout-btn">Log Out</button>
                </div>
            </section>
        </div>
    );
}
