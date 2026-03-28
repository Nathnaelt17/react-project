import { Link } from "react-router-dom";


function Login() {

  return (
    <div className ="login">   
      <h1>Login</h1>
      <form>
      <input type="text" id="username" name="username" placeholder="Username, Email or Phone"/>
      <br />
      <input type="password" id="password" name="password" placeholder="Password"/>
      <br />
      <input type="submit" value="Login" />
    </form>

    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>

  );
}

export default Login