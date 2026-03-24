function Signup() {
    return (
        <div>   
            <h1>Signup</h1>
            <form>
              <label htmlFor="name"> Full name:</label>  
            <input type="text" id="name" name="name" />
            <br />
            <label htmlFor="username"> Username:</label>
            <input type="text" id="username" name="username" placeholder="Username"/>
            <br />
            <label htmlFor="email"> Email:</label>
            <input type="email" id="email" name="email" placeholder="Email"/>
            <br />
            <label htmlFor="password"> Password:</label>
            <input type="password" id="password" name="password" placeholder="Password"/>
            <br />
            <input type="submit" value="Signup" />
        </form>
        </div>
    )
}

export default Signup