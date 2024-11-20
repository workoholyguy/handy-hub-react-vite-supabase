// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Use global AuthContext for user session
  return user ? children : <Navigate to="/" />; // Redirect unauthenticated users to Home
};

export default PrivateRoute;
