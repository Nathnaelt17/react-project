import { useState } from "react";
    
function Signup() {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const user = { email, password };

    localStorage.setItem("user", JSON.stringify(user));
    alert("User registered!");
    };

    return (
        <div>   
            <h1>Signup</h1>
            <form>
              <label htmlFor="name"> Full name:</label>  
            <input type="text" id="name" name="name" placeholder="Name" pattern="[A-Za-z]{2,100}" required onChange={(e) => setName(e.target.value)} />
            <br />

            <label htmlFor="username"> Username:</label>
            <input type="text" id="username" name="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
            <br />

           <label for="email">Email:</label>
<input  type="email"  id="email"  name="email"  placeholder="Email"  required pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$"
 title="Use a valid company email "
 onChange={(e) => setEmail(e.target.value)}
/>
            <br />

            <label htmlFor="phone"> Phone:</label>
            <input type="number" id="phone" name="phone" placeholder="Phone" required onChange={(e) => setPhone(e.target.value)} />
            <br/>

            <label htmlFor="address"> Address:</label>
            <input type="text" id="address" name="address" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
            <br/>

            <lable htmlfor="dob"> Date of Birth:</lable>
            <input type="date" id="dob" name="dob" required onChange={(e) => setDob(e.target.value)}/>
            <br/>

            <label for="password">Password:</label>
<input type="password" id="password"  name="password" placeholder="Password" required 
pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$" title="At least 8 characters, including a letter, number, and special character"
 onChange={(e) => setPassword(e.target.value)}/>
            <br />
        
            <button onClick={handleSignup}>Sign Up</button>
        </form>
        </div>
    );
}

export default Signup;