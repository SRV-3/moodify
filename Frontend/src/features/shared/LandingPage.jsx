import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/hooks/useAuth";
import "./landing.scss";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Welcome to Moodify</h1>
        <p>
          {user
            ? `Hello ${user?.username || "music lover"}! You are already logged in.`
            : "Create your mood playlist, discover songs, and get in the zone by logging in."}
        </p>

        {!user && (
          <div className="landing-cta">
            <Link to="/register" className="btn btn-secondary">
              Create an account
            </Link>
          </div>
        )}

        <button className="btn btn-primary" onClick={handleAction}>
          {user ? "Go to Home" : "Login to Continue"}
        </button>

        {!user && (
          <small className="landing-help-text">
            Already have an account? <Link to="/login">Log in here</Link>.
          </small>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
