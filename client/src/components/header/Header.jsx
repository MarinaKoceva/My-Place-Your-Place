import { Link, useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Изчистваме логина
        navigate("/"); // Пренасочваме към Home
    };

    return (
        <header>
            <h1><Link className="home" to="/">My Place Your Place</Link></h1>
            <nav>
                {isLoggedIn ? (
                    <div className="nav-links">
                        <Link to="/place">All destinations</Link>
                        <Link to="/place/create">Create Place</Link>
                        <Link to="/howItWorks">How It Works</Link>
                        <Link to="/profile">Profile</Link> {/* Добавен Profile линк */}
                        <span onClick={handleLogout} className="link logout">Logout</span>
                    </div>
                ) : (
                    <div className="nav-links">
                        <Link to="/place">All destinations</Link>
                        <Link to="/howItWorks">How It Works</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
