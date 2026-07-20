import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { login } from "../services/auth.service";

export default function AdminLogin({ theme, toggleTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ username, password });
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("auth:changed"));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Try admin / admin123");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-16">
        <form onSubmit={handleLogin} className={`w-full max-w-md rounded-3xl border p-8 shadow-xl ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Administrator</p>
          <h1 className="text-3xl font-semibold">Sign in to manage employees</h1>
          <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>Use the seeded admin account: admin / admin123.</p>

          <div className="mt-6 space-y-4">
            <input
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <button className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}