import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import theme from "./theme/theme";
import ProjectDetails from "./pages/ProjectDetails";
import { DataProvider } from "./context/DataContext";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ check session on mount
  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
      const { timestamp } = JSON.parse(loginData);
      const now = Date.now();

      // 30 minutes = 1800000 ms
      if (now - timestamp < 30 * 60 * 1000) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("loginData"); // expired
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("loginData", JSON.stringify({ timestamp: Date.now() }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loginData");
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          {isLoggedIn ? (
            <DataProvider>
              <div style={{ display: "flex" }}>
                <Sidebar onLogout={handleLogout} />
                <div style={{ marginLeft: "220px", padding: "2rem", flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projectDetails" element={<ProjectDetails />} />
                  </Routes>
                </div>
              </div>
            </DataProvider>
          ) : (
            <Routes>
              <Route path="/*" element={<Login onLogin={handleLogin} />} />
            </Routes>
          )}
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
