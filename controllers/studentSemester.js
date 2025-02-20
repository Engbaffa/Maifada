import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Fetch all student semesters (no relations)
const getAllStudentSemesters = async (req, res) => {
  try {
    const allSemesters = await prisma.studentSemester.findMany();
    res.status(200).json(allSemesters);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching semesters.",
      details: error.message,
    });
  }
};

// ✅ Fetch all student semesters with registered students (relations included)
const getEverythingStudentSemester = async (req, res) => {
  try {
    const allSemesters = await prisma.studentSemester.findMany({
      include: {
        student: true, // Ensure this is a valid relation in Prisma schema
      },
    });
    res.status(200).json(allSemesters);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching semesters.",
      details: error.message,
    });
  }
};

// ✅ Fetch a student semester by ID
const getStudentSemesterById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const studentSemester = await prisma.studentSemester.findUnique({
      where: { id: parseInt(id) },
    });

    if (!studentSemester)
      return res.status(404).json({ message: "Student semester not found" });

    res.status(200).json(studentSemester);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching student semester.",
      details: error.message,
    });
  }
};

// ✅ Create a new student semester (with validation)

const createStudentSemester = async (req, res) => {
  const { studentId, levelId, semesterId } = req.body;
  if (!studentId || !levelId || !semesterId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newSemster = await prisma.studentSemester.create({
      data: {
        studentId: parseInt(studentId),
        levelId: parseInt(levelId),
        semesterId: parseInt(semesterId),
      },
    });
    if (!newSemster) {
      return res.status(400).json({ message: "Not created" });
    }
    return res.status(201).json(newSemster);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating semester.", details: error.message });
  }
};

// ✅ Update a student semester
const updateStudentSemester = async (req, res) => {
  const { id } = req.params;
  const { levelId, semesterId } = req.body;

  if (!id || !levelId || !semesterId) {
    return res
      .status(400)
      .json({ message: "ID, levelId, and semesterId are required" });
  }

  try {
    // Validate Foreign Keys
    const levelExists = await prisma.level.findUnique({
      // Fixed table validation
      where: { id: parseInt(levelId) },
    });
    const semesterExists = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId) },
    });

    if (!levelExists)
      return res.status(400).json({ message: "Invalid levelId" });
    if (!semesterExists)
      return res.status(400).json({ message: "Invalid semesterId" });

    // Update Student Semester
    const updatedStudentSemester = await prisma.studentSemester.update({
      where: { id: parseInt(id) },
      data: {
        levelId: parseInt(levelId),
        semesterId: parseInt(semesterId),
      },
    });

    res.status(200).json({
      message: "Student semester updated successfully",
      updatedStudentSemester,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating student semester.",
      details: error.message,
    });
  }
};

// ✅ Delete a student semester
const deleteStudentSemester = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    await prisma.studentSemester.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Student semester deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting student semester.",
      details: error.message,
    });
  }
};

// ✅ Export all functions
export {
  getAllStudentSemesters,
  getEverythingStudentSemester,
  createStudentSemester,
  deleteStudentSemester,
  updateStudentSemester,
  getStudentSemesterById,
};
