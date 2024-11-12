import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check usernya login ga
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };
  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

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
