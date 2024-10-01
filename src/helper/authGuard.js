import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, restrictedPaths }) => {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    return JSON.parse(localStorage.getItem("userData")) || null;
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      // Check if the changed item is "userData"
      if (event.key === "userData") {
        const newUserData = JSON.parse(event.newValue);
        setUser(newUserData);
      } else {
        setUser(null);
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If user is logged in, render the children (protected route)
  return children;
};

export default AuthGuard;
