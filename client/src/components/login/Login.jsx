import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
    const navigate = useNavigate();

    const loginAction = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        onLogin(email); // Запазваме email като индикация, че е логнат
        navigate("/place"); // Пренасочване към "All Destinations"
    };

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={loginAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" required />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" required />

                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have a profile, click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}
