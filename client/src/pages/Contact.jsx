import Navbar from "../components/Navbar";

export default function Contact({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className={`rounded-3xl border p-8 shadow-xl ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Contact</p>
          <h1 className="text-4xl font-bold">We would love to hear from you.</h1>
          <p className={`mt-4 text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Email us at hello@cardicx.com or connect through our support channel for onboarding and enterprise requests.
          </p>
        </div>
      </main>
    </div>
  );
}