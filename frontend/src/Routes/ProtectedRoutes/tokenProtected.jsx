import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const TokenProtected = ({ children, isAdmin = false }) => {
    const token = useSelector((state) =>
      isAdmin ? state.adminToken.adminToken : state.userToken.userToken
    );
  
    if (!token) {
      return <Navigate to={isAdmin ? "/admin/login" : "/"} replace />;
    }
  
    return <>{children}</>;
  };

export default TokenProtected;
