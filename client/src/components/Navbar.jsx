import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/roles", label: "Roles" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(Boolean(localStorage.getItem("token")));

    window.addEventListener("auth:changed", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("auth:changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/");
  }

  return (
    <nav className={`border-b ${isDark ? "border-slate-800 bg-slate-900/95" : "border-slate-200 bg-white/90"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-semibold tracking-wide text-blue-500">
          CardicX
        </NavLink>

        <div className="flex items-center gap-3 sm:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-blue-500" : isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${isDark ? "bg-red-600 text-white hover:bg-red-500" : "bg-red-600 text-white hover:bg-red-500"}`}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/admin"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              Admin Login
            </NavLink>
          )}

          <button
            onClick={toggleTheme}
            className={`rounded-full p-2 transition ${isDark ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}