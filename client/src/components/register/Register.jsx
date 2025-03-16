import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ⚡ Добави валидация ако е нужно
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // 👉 Симулираме успешна регистрация
        console.log("User registered:", formData);

        // ✅ Пренасочване към Login
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <section id="register-page" className="auth">
                <form id="register" onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>Register</h1>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                        <label htmlFor="pass">Password:</label>
                        <input type="password" name="password" id="register-password" value={formData.password} onChange={handleChange} required />

                        <label htmlFor="con-pass">Confirm Password:</label>
                        <input type="password" name="confirmPassword" id="confirm-password" value={formData.confirmPassword} onChange={handleChange} required />

                        <input className="btn submit" type="submit" value="Register" />

                        <p className="field">
                            <span>If you already have a profile, click <span onClick={() => navigate("/login")} className="link">here</span></span>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
}
