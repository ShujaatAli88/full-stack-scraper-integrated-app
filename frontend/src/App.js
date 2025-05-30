import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProductTable from "./components/ProductTable";

function App() {
  // Check localStorage for login state on first load
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  return (
    <Router>
      {/* Only show Navbar if logged in */}
      {loggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
        <Route path="/dashboard" element={
          loggedIn ? (
            <>
              <Dashboard />
              <ProductTable />
            </>
          ) : (
            <Login onLogin={() => setLoggedIn(true)} />
          )
        } />
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
}

// Clear login state on every frontend reload (for dev only)
localStorage.removeItem("loggedIn");
localStorage.removeItem("userEmail");

export default App;
