import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages_css/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //Current default username/password is 'root'/0000
        if (username === "root" && password === "0000") {
            navigate("/home");
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-login">Login</button>
            

            {/* 👇 Sign Up link here */}
            <p className="signup-link">
                Don’t have an account? <a href="#/signup">Sign Up</a>
            </p>
            </form>
        </div>
    );
};

export default Login;
