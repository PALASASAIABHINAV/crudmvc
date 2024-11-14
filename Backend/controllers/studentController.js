const Student = require("../models/Student");
const XLSX = require("xlsx");
const path = require("path");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching students", 
      error: error.message 
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, email, grade } = req.body;

    // Validate input
    if (!name || !email || !grade) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "A student with this email already exists"
      });
    }

    const student = new Student({ name, email, grade });
    const savedStudent = await student.save();
    
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: savedStudent
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(400).json({ 
      success: false, 
      message: "Error creating student", 
      error: error.message 
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting student", 
      error: error.message 
    });
  }
};

exports.bulkUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(sheet);

    const validData = rawData.map((row) => ({
      name: row.name || row.Name || row.NAME,
      email: row.email || row.Email || row.EMAIL,
      grade: row.grade || row.Grade || row.GRADE,
    }));

    const invalidRows = validData.filter(
      (row) => !row.name || !row.email || !row.grade
    );

    if (invalidRows.length > 0) {
      return res.status(400).json({
        message: "Invalid data format",
        invalidRows: invalidRows,
      });
    }

    const students = await Student.insertMany(validData);
    res.status(201).json({
      message: "",
      count: students.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(400).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};
