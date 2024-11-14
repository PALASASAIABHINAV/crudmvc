const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Faculty", facultySchema);
