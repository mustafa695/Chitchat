import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    return JSON.parse(localStorage.getItem("userData"));
  });


  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If user is logged in, render the children (protected route)
  return children;
};

export default AuthGuard;
