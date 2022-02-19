import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [currentUserIsLoggedIn, setCurrentUserIsLoggedIn] = useState("");

  let currentUserFromLocalStorage =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    setCurrentUserRole(currentUserFromLocalStorage.currentUserRole);
    setCurrentUserIsLoggedIn(currentUserFromLocalStorage.currentUserIsLoggedIn);
  }, [
    currentUserFromLocalStorage.currentUserRole,
    currentUserFromLocalStorage.currentUserIsLoggedIn,
  ]);

  return (
    <AuthContext.Provider value={[currentUserRole, currentUserIsLoggedIn]}>
      {children}
    </AuthContext.Provider>
  );
};
