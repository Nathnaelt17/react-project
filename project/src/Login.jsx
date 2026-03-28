import { Link } from "react-router-dom";
import { useState } from "react";


function Login() {
  const AuthApp = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <Login /> : <Signup />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};
  return (
    <div>   
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