import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/roles" element={<Roles theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/contact" element={<Contact theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/admin" element={<AdminLogin theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/dashboard" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
  );
}