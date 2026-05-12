import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.userToken.userToken);
  const user = useSelector((state) => state.auth.user);
  if (token && user) {
    return <Navigate to="/" replace  />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
