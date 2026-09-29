import React from "react";
import { Navigate } from "react-router-dom";
import { getDecodedToken } from "../utils/auth";

export default function ProtectedAuth({ children }) {
  // an expired token should not keep the user out of the sign in page
  if (!getDecodedToken()) return children;

  return <Navigate to="/"></Navigate>;
}
