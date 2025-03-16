import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="footer-left">
                <p>7524 Salem Rd, Wonder Lake</p>
                <p>60097 Ilinois, USA</p>
                <p>+1 234 567 890</p>
                <p>contact@myplaceyourplace.com</p>
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
