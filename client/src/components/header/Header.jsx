import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
    const { email } = useContext(UserContext);

    return (
        <header>
            <h1><Link className="home" to="/">My Place Your Place</Link></h1>
            <nav>
                {email
                    ? (
                        <div id="user">
                            <Link to="/places">All places</Link>
                            <Link to="/places/create">Create Place</Link>
                            <Link to="/howItWorks">How It Works</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    ) : (
                        <div id="guest">
                            <Link to="/places">All places</Link>
                            <Link to="/howItWorks">How It Works</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
            </nav>
        </header>
    );
}
