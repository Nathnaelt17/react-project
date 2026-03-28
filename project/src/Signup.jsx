import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

    const handleSignup = (e) => {
    e.preventDefault();
    navigate("/landing-page"); 
  };


    return (
        <div className="signup">   
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
              <label htmlFor="name"> Full name:</label>  
            <input type="text" value={name} id="name" name="name" placeholder="Name" pattern="[A-Za-z]{3,100}" required onChange={(e) => setName(e.target.value)} />
            <br />

            <label htmlFor="username"> Username:</label>
            <input type="text" value={username} id="username" name="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
            <br />

           <label for="email">Email:</label>
<input  type="email"  value={email}  id="email"  name="email"  placeholder="Email"  required pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$" 
 title="Use a valid company email "
 onChange={(e) => setEmail(e.target.value)}
/>
            <br />

            <label htmlFor="phone"> Phone:</label>
            <input type="tel" value={phone} id="phone" name="phone" placeholder="Phone" pattern="[0-9]{10}" title="must contain a 10 digit number" 
            required onChange={(e) => setPhone(e.target.value)} />
            <br/>

            <label htmlFor="address"> Address:</label>
            <input type="text" value={address} id="address" name="address" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
            <br/>

            <lable htmlfor="dob"> Date of Birth:</lable>
            <input type="date" value={dob} id="dob" name="dob" required onChange={(e) => setDob(e.target.value)}/>
            <br/>

            <label for="password">Password:</label>
<input type="password" value={password} id="password" name="password" placeholder="Password"required
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$"
  title="At least 8 characters, including uppercase, lowercase, number, and special character"
  onChange={(e) => setPassword(e.target.value)}/>
            <br />
        
             <button type="submit">Sign Up</button>
        </form>
        </div>
    );
}

export default Signup;