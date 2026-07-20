import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import EmployeeTree from "../components/EmployeeTree";

export default function Home({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl border p-8 shadow-xl ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
                Employee hierarchy management
              </p>
              <h1 className="text-4xl font-bold sm:text-5xl">
                Visualize your company structure in real time.
              </h1>
              <p className={`mt-4 text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Track every team member, their roles, and their joining journey through an animated hierarchy view.
              </p>
            </div>

            <div className={`rounded-2xl border px-5 py-4 ${isDark ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"}`}>
              <p className="text-sm font-medium text-blue-500">Live directory</p>
              <p className="mt-1 text-3xl font-semibold">{new Date().getFullYear()}</p>
            </div>
          </div>
        </motion.section>

        <EmployeeTree theme={theme} />
      </main>
    </div>
  );
}