import { Link } from "react-router";

export default function Header() {

    {/* Тук може да има условие за логнат потребител (примерно чрез контекст или стейт)*/ }
    const isLoggedIn = false; {/* Замени с реална логика за аутентикация*/ }

    return (
        <header>
            <h1><Link className="home" to="/">My Place Your Place</Link></h1>
            <nav>
                {isLoggedIn ? (
                    // Навигация за логнати потребители
                    < div className="nav-links">
                        <Link to="/place">All destinations</Link>
                        <Link to="/place/create">Create Place</Link>
                        <Link to="/howItWorks">How It Works</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                ) : (
                    // Навигация за гости
                    <div className="nav-links">
                        <Link to="/place">All destinations</Link>
                        <Link to="/howItWorks">How It Works</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}

            </nav>
        </header >
    );
}


