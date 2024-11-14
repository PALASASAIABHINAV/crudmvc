const Faculty = require("../models/Faculty");

exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json(faculty);
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching faculty", 
      error: error.message 
    });
  }
};

exports.createFaculty = async (req, res) => {
  try {
    const { name, email, salary } = req.body;

    // Validate input
    if (!name || !email || !salary) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Convert salary to number
    const numericSalary = Number(salary);
    if (isNaN(numericSalary)) {
      return res.status(400).json({
        success: false,
        message: "Salary must be a valid number"
      });
    }

    // Check if email already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "A faculty member with this email already exists"
      });
    }

    const faculty = new Faculty({ 
      name, 
      email, 
      salary: numericSalary 
    });
    
    const savedFaculty = await faculty.save();
    
    res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      data: savedFaculty
    });
  } catch (error) {
    console.error("Error creating faculty:", error);
    res.status(400).json({ 
      success: false, 
      message: "Error creating faculty", 
      error: error.message 
    });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const { name, email, salary } = req.body;

    // Validate input
    if (!name || !email || !salary) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Convert salary to number
    const numericSalary = Number(salary);
    if (isNaN(numericSalary)) {
      return res.status(400).json({
        success: false,
        message: "Salary must be a valid number"
      });
    }

    // Check if email exists for other faculty members
    const existingFaculty = await Faculty.findOne({ 
      email, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "This email is already in use by another faculty member"
      });
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id, 
      { name, email, salary: numericSalary },
      { new: true, runValidators: true }
    );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      data: faculty
    });
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(400).json({ 
      success: false, 
      message: "Error updating faculty", 
      error: error.message 
    });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (faculty) {
      res.status(200).json({
        success: true,
        data: faculty
      });
    } else {
      res.status(404).json({ 
        success: false,
        message: "Faculty not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting faculty", 
      error: error.message 
    });
  }
};
