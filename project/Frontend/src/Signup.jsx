import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaLock } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/landing-page");
  };

  return (
    <div className="signup">
      <div className="auth-card">
        <h1>Signup</h1>
        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <div className="input-row">
              <FaUserAlt className="input-icon" />
              <input type="text" value={name} id="name" name="name" placeholder="Name" pattern="[A-Za-z]{3,100}" required onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-row">
              <FaUserAlt className="input-icon" />
              <input type="text" value={username} id="username" name="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-row">
              <FaEnvelope className="input-icon" />
              <input type="email" value={email} id="email" name="email" placeholder="Email" required pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$" title="Use a valid email" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-row">
              <FaPhoneAlt className="input-icon" />
              <input type="tel" value={phone} id="phone" name="phone" placeholder="Phone" pattern="[0-9]{10}" title="must contain a 10 digit number" required onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="input-row">
              <FaMapMarkerAlt className="input-icon" />
              <input type="text" value={address} id="address" name="address" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <div className="input-row">
              <FaCalendarAlt className="input-icon" />
              <input type="date" value={dob} id="dob" name="dob" required onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-row">
              <FaLock className="input-icon" />
              <input type="password" value={password} id="password" name="password" placeholder="Password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$" title="At least 8 characters, including uppercase, lowercase, number, and special character" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;