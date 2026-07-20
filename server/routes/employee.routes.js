import express from "express";
import multer from "multer";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Public
router.get("/", getEmployees);
router.get("/:id", getEmployee);

// Protected
router.post("/", authMiddleware, upload.single("image"), addEmployee);

router.put("/:id", authMiddleware, upload.single("image"), updateEmployee);

router.delete("/:id", authMiddleware, deleteEmployee);

export default router;