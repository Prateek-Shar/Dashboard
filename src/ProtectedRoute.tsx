import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = document.cookie.includes("SessionID");
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;