import Navbar from "../components/Navbar";

const roles = [
  { title: "Founder & CEO", description: "Sets the company vision and leads major strategic decisions." },
  { title: "Engineering Lead", description: "Owns product delivery, team execution, and technical standards." },
  { title: "Operations Manager", description: "Coordinates people, processes, and company growth initiatives." },
  { title: "Customer Success", description: "Ensures clients receive excellent support and long-term value." },
];

export default function Roles({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Organizational roles</p>
          <h1 className="text-4xl font-bold">Building a strong, scalable team.</h1>
          <p className={`mt-4 text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Every role in the hierarchy is designed to keep communication, execution, and delivery aligned.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <div key={role.title} className={`rounded-2xl border p-6 shadow-sm ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
              <h2 className="text-xl font-semibold">{role.title}</h2>
              <p className={`mt-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{role.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}