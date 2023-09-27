import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate ,useLocation} from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/" state={{path:location.pathname}} />;
  }else{
    return children;
  }
 
};