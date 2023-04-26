import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProtectedRoutes = () => {
  const user = AuthService.getCurrentUser();
    
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />
    
};

export default ProtectedRoutes;