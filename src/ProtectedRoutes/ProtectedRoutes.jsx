import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { tokenContext } from "../Context/TokenContext";
import { clearAuthStorage, getDecodedToken } from "../utils/auth";

export default function ProtectedRoutes({ children }) {
  let { setToken } = useContext(tokenContext);
  // covers a missing, malformed or expired token
  let isAuthenticated = Boolean(getDecodedToken());

  useEffect(() => {
    if (!isAuthenticated) {
      clearAuthStorage();
      setToken(null);
    }
  }, [isAuthenticated, setToken]);

  if (!isAuthenticated) return <Navigate to="/auth/signin" />;

  return children;
}
