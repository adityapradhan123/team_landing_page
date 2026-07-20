import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../services/employee.service";

const emptyForm = {
  name: "",
  email: "",
  role: "",
  department: "",
  joiningDate: "",
  image: null,
};

export default function Dashboard({ theme, toggleTheme }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/admin");
      return;
    }

    loadEmployees();
  }, [navigate]);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("role", form.role);
    formData.append("department", form.department);
    formData.append("joiningDate", form.joiningDate);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await createEmployee(formData);
      }

      setForm(emptyForm);
      setEditingId(null);
      loadEmployees();
    } catch (error) {
      alert("Unable to save employee");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(employee) {
    setEditingId(employee._id);
    setForm({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      joiningDate: employee.joiningDate?.slice(0, 10) || "",
      image: null,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      alert("Unable to delete employee");
    }
  }

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.role} ${employee.department}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Admin dashboard</p>
            <h1 className="text-3xl font-semibold">Manage employee records</h1>
          </div>

          <div className={`rounded-2xl border px-4 py-3 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
            <p className="text-sm">Search employees instantly</p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className={`rounded-3xl border p-6 shadow-lg ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Employee directory</h2>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or role"
                className={`rounded-2xl border px-3 py-2 outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}
              />
            </div>

            {loading ? (
              <p className={isDark ? "text-slate-300" : "text-slate-600"}>Loading employees...</p>
            ) : (
              <div className="space-y-3">
                {filteredEmployees.map((employee) => (
                  <div key={employee._id} className={`flex items-center justify-between rounded-2xl border p-4 ${isDark ? "border-slate-800 bg-slate-950/70" : "border-slate-100 bg-slate-50"}`}>
                    <div>
                      <p className="font-semibold">{employee.name}</p>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{employee.role} • {employee.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(employee)} className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white">Edit</button>
                      <button onClick={() => handleDelete(employee._id)} className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={`rounded-3xl border p-6 shadow-lg ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"}`}>
            <h2 className="text-xl font-semibold">{editingId ? "Edit employee" : "Add employee"}</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
              <input name="role" value={form.role} onChange={handleChange} required placeholder="Role" className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
              <input name="department" value={form.department} onChange={handleChange} required placeholder="Department" className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
              <input name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} required className={`w-full rounded-2xl border px-4 py-3 outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
              <input type="file" accept="image/*" onChange={handleFileChange} className={`w-full rounded-2xl border px-4 py-3 ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />

              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60">
                  {submitting ? "Saving..." : editingId ? "Update employee" : "Add employee"}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className={`rounded-2xl border px-4 py-3 ${isDark ? "border-slate-700 text-slate-100" : "border-slate-200 text-slate-700"}`}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}