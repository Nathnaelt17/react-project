function Login() {
    return (
        <div>
             <h1>Login</h1>

        <label htmlFor="name"></label>
        <input type="text" name="name" id="name" placeholder="Enter user name, email, or phone number" />
        <br />
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" placeholder="Enter password" />
        <br />
        <button type="submit">Login</button>



        </div>
    )
}
export default Login; 