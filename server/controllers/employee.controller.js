import Employee from "../models/Employee.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { name, email, role, department, joiningDate } = req.body;

    const exists = await Employee.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      role,
      department,
      joiningDate,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { name, email, role, department, joiningDate } = req.body;

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.name = name;
    employee.email = email;
    employee.role = role;
    employee.department = department;
    employee.joiningDate = joiningDate;

    if (req.file) {
      employee.image = req.file.filename;
    }

    await employee.save();

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      success: true,
      message: "Employee deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};