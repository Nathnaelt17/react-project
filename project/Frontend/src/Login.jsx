  import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("registeredUser");
    const storedUser = savedUser ? JSON.parse(savedUser) : null;

    const isDefaultUser = username === "admin" && password === "admin123";
    const isRegisteredUser = storedUser && storedUser.username === username && storedUser.password === password;

    if (isRegisteredUser || isDefaultUser) {
      navigate("/landing-page");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login">
      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-row">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="Username, Email or Phone"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-row">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="Password"
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login