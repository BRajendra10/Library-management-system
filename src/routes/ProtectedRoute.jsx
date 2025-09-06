import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { login } = useSelector((state) => state.login);

  if (login.membershipType === "student") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;