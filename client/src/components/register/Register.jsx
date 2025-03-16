export default function Register() {
    return (
        <div className="auth-container">
            <section id="register-page" className="content auth">
                <form id="register">
                    <div className="container">
                        <div className="brand-logo"></div>
                        <h1>Register</h1>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" />

                        <label htmlFor="pass">Password:</label>
                        <input type="password" name="password" id="register-password" />

                        <label htmlFor="con-pass">Confirm Password:</label>
                        <input type="password" name="confirm-password" id="confirm-password" />

                        <input className="btn submit" type="submit" value="Register" />
                    </div>
                </form>
            </section>
        </div>
    );
}
