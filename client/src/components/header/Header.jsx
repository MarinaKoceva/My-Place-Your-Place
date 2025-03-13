import { Link } from "react-router";

export default function Header() {
    return (
        <header>
            <h1><Link className="home" to="/">My Place Your Place</Link></h1>
            <nav>
                <Link to="/place">All destinations</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link to="/place/create">Create Place</Link>
                    <Link to="/place/howItWorks">How It Works</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}
