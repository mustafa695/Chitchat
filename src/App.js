import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { getMe } from "./api";
import AuthGuard from "./helper/authGuard";

const App = () => {
  const user =
    (window.localStorage != undefined &&
      JSON.parse(localStorage.getItem("userData"))) ||
    null;

  //Get Logged in user
  const fetchMe = async () => {
    try {
      const response = await getMe();
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(response.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/chat"
          element={
            <AuthGuard>
              <Chat />
            </AuthGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
