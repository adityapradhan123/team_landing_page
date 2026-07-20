import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/employees", employeeRoutes);

app.use("/api/admin", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;