import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);