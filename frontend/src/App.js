import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProductTable from "./components/ProductTable";

function App() {
    const [loggedIn, setLoggedIn] = useState(() => {
        // Check localStorage on first load
        return localStorage.getItem("loggedIn") === "true";
    });

    useEffect(() => {
        localStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);

    return (
        <Router>
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
                <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
            </Routes>
        </Router>
    );
}

export default App;
