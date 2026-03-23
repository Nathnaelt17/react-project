function signup() {
    return (
        <div>
            <h1>signup</h1>

        <label htmlFor="name"></label>
        <input type="text" name="name" id="name" placeholder="Enter user full name" />
        <br />
        <label htmlFor="email"></label>
        <input type="email" name="email" id="email" placeholder="Enter email address" />
        <br />
        <label htmlFor="phone"></label>
        <input type="tel" name="phone" id="phone" placeholder="Enter phone number" />
        <br/>

        <br/>
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" placeholder="Enter password" />
        <br />
        <button type="submit">Login</button>

        </div>
    )
}
export default signup; 