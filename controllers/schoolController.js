import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all previous schools
const getPreviousSchools = async (req, res) => {
  try {
    const previousSchools = await prisma.previousSchool.findMany();
    res.status(200).json({
      message: "Previous schools retrieved successfully",
      previousSchools,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching previous schools",
      error: error.message,
    });
  }
};

// Get previous school by student ID
const getPreviousSchoolById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: "Invalid student ID" });

  try {
    const previousSchool = await prisma.previousSchool.findFirst({
      where: { studentId: parseInt(id), isActive: true },
    });

    if (!previousSchool) {
      return res
        .status(404)
        .json({ message: "No active previous school found for this student" });
    }

    res.status(200).json(previousSchool);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching previous school",
      error: error.message,
    });
  }
};

// Create a new previous school
const createPreviousSchool = async (req, res) => {
  const { studentId, name, type, yearOfGraduation, address } = req.body;

  if (!studentId || !name || !type || !yearOfGraduation || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(studentId))
    return res.status(400).json({ message: "Invalid student ID" });

  try {
    const newPreviousSchool = await prisma.previousSchool.create({
      data: {
        studentId: parseInt(studentId),
        name,
        type,
        yearOfGraduation,
        address,
        isActive: true,
      },
    });

    res.status(201).json({
      message: "Previous school created successfully",
      newPreviousSchool,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating previous school",
      error: error.message,
    });
  }
};

// Update previous school by ID
const updatePreviousSchool = async (req, res) => {
  const { id } = req.params;
  const { name, type, yearOfGraduation, address, isActive } = req.body;

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid previous school ID" });

  try {
    const updatedPreviousSchool = await prisma.previousSchool.update({
      where: { id: parseInt(id) },
      data: { name, type, yearOfGraduation, address, isActive },
    });

    res.status(200).json({
      message: "Previous school updated successfully",
      updatedPreviousSchool,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating previous school",
      error: error.message,
    });
  }
};

// Delete previous school by ID
const deletePreviousSchool = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid previous school ID" });

  try {
    await prisma.previousSchool.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({ message: "Previous school deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting previous school",
      error: error.message,
    });
  }
};

export {
  createPreviousSchool,
  getPreviousSchoolById,
  getPreviousSchools,
  updatePreviousSchool,
  deletePreviousSchool,
};
