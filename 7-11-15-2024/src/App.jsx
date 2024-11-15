import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { isTokenExpired } from "../utils/auth";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      {isAuthenticated && <Navbar onLogout={logout} />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
        {/* <Route
          path=""
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route> */}
      </Routes>
    </>
  );
}

export default App;
