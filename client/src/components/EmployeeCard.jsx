import { motion } from "framer-motion";

export default function EmployeeCard({ employee, theme }) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`rounded-3xl border p-6 text-center shadow-lg ${isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white"}`}
    >
      <img
        src={
          employee.image
            ? `http://localhost:5000/uploads/${employee.image}`
            : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
        }
        alt={employee.name}
        className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-blue-500/20"
      />

      <h3 className="mt-4 text-xl font-semibold">{employee.name}</h3>
      <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>{employee.email}</p>
      <div className="mt-4 space-y-1 text-sm">
        <p className="font-medium text-blue-500">{employee.role}</p>
        <p className={isDark ? "text-slate-400" : "text-slate-500"}>{employee.department}</p>
        <p className={isDark ? "text-slate-400" : "text-slate-500"}>
          Joined {new Date(employee.joiningDate).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}