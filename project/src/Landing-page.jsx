import { FaRocket, FaSmile, FaCheckCircle } from "react-icons/fa";

function LandingPage() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firstName = user.name ? user.name.split(" ")[0] : "Guest";

  return (
    <div className="landing-page">
      <div className="landing-card">

        <div className="landing-hero">
          <h1>Welcome, {firstName}!</h1>
          <p>
            You have successfully signed in. Explore your dashboard, manage your profile, and enjoy the app.
          </p>
        </div>

       </div>
    </div>
  );
}


export default LandingPage;