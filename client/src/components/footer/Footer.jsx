import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="footer-left">
                <p>1234 Street Name, City, Country</p>
                <p>+1 234 567 890</p>
                <p>contact@example.com</p>
            </div>
            <div className="footer-right">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedin /></a>
            </div>
        </footer>
    );
}
