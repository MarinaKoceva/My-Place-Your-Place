import { useContext } from "react";
import { useRegister } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext)

    const registerHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData);

        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            console.log('Password missmatch');

            return;
        }

        const authData = await register(email, password);

        userLoginHandler(authData);

        navigate("/");
    };

    return (
        <div className="auth-container">
            <section id="register-page" className="auth">
                <form id="register" onSubmit={registerHandler}>
                    <div className="container">
                        <h1>Register</h1>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="maria@abv.bg" />

                        <label htmlFor="pass">Password:</label>
                        <input type="password" name="password" id="register-password" />

                        <label htmlFor="con-pass">Confirm Password:</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" />

                        <input className="btn submit" type="submit" value="Register" />

                    </div>
                </form>
            </section>
        </div>
    );
}
