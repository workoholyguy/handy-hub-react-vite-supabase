// PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
