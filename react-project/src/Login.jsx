function Login() {
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

     <p>
        Don't have an account?{" "}
        <Link to="/signup.jsx">Sign up</Link>
      </p>
    </div>
  )
}

export default Login