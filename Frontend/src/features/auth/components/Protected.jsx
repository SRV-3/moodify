import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return children;
}

export default Protected;
