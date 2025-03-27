import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{
            textAlign: "center",
            padding: "100px 20px",
            color: "white", // 👈 това трябва да направи ВСИЧКИ текстове бели
            textShadow: "1px 1px 5px rgba(0,0,0,0.5)"
        }}>
            <h1 style={{ fontSize: "80px", marginBottom: "20px", color: "white" }}>404</h1>
            <h2 style={{ color: "white" }}>Oops! Page not found.</h2>
            <p tyle={{ color: "white" }}>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" style={{
                marginTop: "20px",
                display: "inline-block",
                padding: "10px 25px",
                backgroundColor: "#ff9800",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "16px"
            }}>
                Go to Home</Link>
        </div>
    );
}
