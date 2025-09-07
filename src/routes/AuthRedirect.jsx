import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isLogedIn } = useSelector((state) => state.login);

  if (isLogedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
