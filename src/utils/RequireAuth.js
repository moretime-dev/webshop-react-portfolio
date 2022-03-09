import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../store/auth-context";

const RequireAuth = ({ allowedRoles }) => {
  const [currentUserRole, currentUserIsLoggedIn] = useContext(AuthContext);

  return currentUserRole === allowedRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/not-found" />
  );
};

export default RequireAuth;
