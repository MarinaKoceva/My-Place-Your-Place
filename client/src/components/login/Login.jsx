import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const [error, setError] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());

        if (!values.email || !values.password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const authData = await login(values.email, values.password);
            userLoginHandler(authData);
            navigate("/places");
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={loginHandler}>
                <div className="container">
                    <h1>Login</h1>

                    {/* Съобщение за грешка */}
                    {error && <p className="auth-error">{error}</p>}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />

                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have a profile, click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}
