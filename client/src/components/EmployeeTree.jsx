import { useEffect, useState } from "react";
import { getEmployees } from "../services/employee.service";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeTree({ theme }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDark = theme === "dark";

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const leadership = employees.filter((employee) => /ceo|lead|manager|director/i.test(employee.role));
  const teams = employees.filter((employee) => !/ceo|lead|manager|director/i.test(employee.role));

  return (
    <div className="mt-10">
      <div className={`mb-6 rounded-2xl border p-4 ${isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Hierarchy view</p>
        <p className={`mt-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          A tree-inspired layout shows leadership above the wider team structure.
        </p>
      </div>

      {loading ? (
        <p className={`text-center ${isDark ? "text-slate-300" : "text-slate-600"}`}>Loading employees...</p>
      ) : (
        <div className="space-y-8">
          <div className={`rounded-3xl border p-6 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <h3 className="text-lg font-semibold">Organization root</h3>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-4">
                <div className={`rounded-2xl border p-4 ${isDark ? "border-slate-800 bg-slate-950/70" : "border-slate-100 bg-slate-50"}`}>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Leadership</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {leadership.map((emp) => (
                      <EmployeeCard key={emp._id} employee={emp} theme={theme} />
                    ))}
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${isDark ? "border-slate-800 bg-slate-950/70" : "border-slate-100 bg-slate-50"}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">Operational teams</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {teams.map((emp) => (
                    <EmployeeCard key={emp._id} employee={emp} theme={theme} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}