import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <a href="https://moodify-9uoh.onrender.com/api/auth/login">Login Here</a>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;
