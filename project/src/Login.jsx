import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/landing-page");
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
              <input type="text" id="username" name="username" required placeholder="Username, Email or Phone" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-row">
              <FaLock className="input-icon" />
              <input type="password" id="password" name="password" requiered placeholder="Password" />
            </div>
          </div>

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