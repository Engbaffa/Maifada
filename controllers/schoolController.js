import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPreviousSchools = async (req, res) => {
  try {
    const Schools = await prisma.previousSchool.findMany({});
    res.status(200).json({ message: "Previous schools ", Schools });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching previous schools",
      error: error.message,
    });
  }
};
const getPreviousSchoolsByStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.previousSchool.findUnique({
      where: { id: parseInt(id), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    res.status(200).json({ message: "Previous schools", School });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching previous schools",
      error: error.message,
    });
  }
};
const deletePreviousSchool = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSchools = await prisma.previousSchool.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(200)
      .json({ message: "Previous schools updated", deletedSchools });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting previous schools",
      error: error.message,
    });
  }
};
const createPreviousSchools = async (req, res) => {
  const { studentId, name, type, yearOfGraduation, address } = req.body;
  if (
    !studentId ||
    !name ||
    !type ||
    !yearOfGraduation ||
    !address ||
    !studentId
  ) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const newSchool = await prisma.previousSchool.create({
      data: {
        name,
        type,
        yearOfGraduation,
        address,
        studentId: parseInt(studentId),
        isActive: true,
      },
    });
    res.status(200).json({ message: "Previous schools updated", newSchool });
  } catch (error) {
    res.status(500).json({
      message: "Error updating previous schools",
      error: error.message,
    });
  }
};
const updatePreviousSchools = async (req, res) => {
  const { id } = req.params;
  const { name, type, yearOfGraduation, address } = req.body;

  try {
    const updatedSchools = await prisma.previousSchool.update({
      where: { id: parseInt(id) },
      data: { name, type, yearOfGraduation, address, isActive: true },
    });
    res
      .status(200)
      .json({ message: "Previous schools updated", updatedSchools });
  } catch (error) {
    res.status(500).json({
      message: "Error updating previous schools",
      error: error.message,
    });
  }
};

export {
  createPreviousSchools,
  getPreviousSchoolsByStudent,
  getPreviousSchools,
  updatePreviousSchools,
  deletePreviousSchool,
};
