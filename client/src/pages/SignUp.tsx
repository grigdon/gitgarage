import { useNavigate } from "react-router-dom";
import "../pages_css/Login.css"; // Reuse login styles

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Redirect back to login after "sign up"
        navigate("/login");
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" className="form-input" required />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input id="email" type="text" className="form-input" required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" className="form-input" required />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" className="form-input" required />
                </div>

                <button className="btn-login" type="submit">Sign Up</button>
            </form>
        </div>
    );
}
