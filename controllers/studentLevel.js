import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Create Student Level (with validation)
const createStudentLevel = async (req, res) => {
  const { sessionId, levelId, studentId } = req.body;
  if (!sessionId || !levelId || !studentId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Validate Foreign Keys
    const studentExists = await prisma.student.findUnique({
      where: { id: parseInt(studentId) },
    });
    const levelExists = await prisma.level.findUnique({
      where: { id: parseInt(levelId) },
    });
    const sessionExists = await prisma.studentSession.findUnique({
      where: { id: parseInt(sessionId) },
    });

    if (!studentExists)
      return res.status(400).json({ message: "Invalid studentId" });
    if (!levelExists)
      return res.status(400).json({ message: "Invalid levelId" });
    if (!sessionExists)
      return res.status(400).json({ message: "Invalid sessionId" });

    // Create Student Level
    const studentLevel = await prisma.studentLevel.create({
      data: {
        levelId: parseInt(levelId),
        studentId: parseInt(studentId),
        sessionId: parseInt(sessionId),
      },
    });

    res.status(201).json(studentLevel);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating student level", error: error.message });
  }
};

// ✅ Fetch all student levels
const getAllStudentLevels = async (req, res) => {
  try {
    const allStudents = await prisma.studentLevel.findMany();
    res.status(200).json(allStudents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student levels", error: error.message });
  }
};

// ✅ Fetch student level by ID
const getStudentLevelById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const student = await prisma.studentLevel.findUnique({
      where: { id: parseInt(id) },
    });

    if (!student)
      return res.status(404).json({ message: "Student level not found" });

    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student level", error: error.message });
  }
};

// ✅ Fetch all student levels with relations (payments & semesters)
const getEverythingStudentLevel = async (req, res) => {
  try {
    const students = await prisma.studentLevel.findMany({
      include: {
        payments: true,
        semesters: true,
      },
    });

    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student levels", error: error.message });
  }
};

// ✅ Update student level
const updateStudentLevel = async (req, res) => {
  const { id } = req.params; // ID of the studentLevel record to update
  const { studentId, levelId, sessionId } = req.body;

  // Validate input
  if (!studentId && !levelId && !sessionId) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  try {
    // Parse IDs to integers
    const parsedStudentId = studentId ? parseInt(studentId, 10) : undefined;
    const parsedLevelId = levelId ? parseInt(levelId, 10) : undefined;
    const parsedSessionId = sessionId ? parseInt(sessionId, 10) : undefined;

    // Check if parsed IDs are valid numbers
    if (
      (parsedStudentId !== undefined && isNaN(parsedStudentId)) ||
      (parsedLevelId !== undefined && isNaN(parsedLevelId)) ||
      (parsedSessionId !== undefined && isNaN(parsedSessionId))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid studentId, levelId, or sessionId" });
    }

    // Update the studentLevel record
    const updatedStudentLevel = await prisma.studentLevel.update({
      where: { id: parseInt(id, 10) }, // Locate the record by ID
      data: {
        student: {
          connect: parsedStudentId ? { id: parsedStudentId } : undefined,
        },
        level: {
          connect: parsedLevelId ? { id: parsedLevelId } : undefined,
        },
        session: {
          connect: parsedSessionId ? { id: parsedSessionId } : undefined,
        },
      },
    });

    res.status(200).json(updatedStudentLevel);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error updating student level", error: error.message });
  }
};
// ✅ Delete student level
const deleteStudentLevel = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    await prisma.studentLevel.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Student level deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student level", error: error.message });
  }
};

// ✅ Export all functions
export {
  createStudentLevel,
  getAllStudentLevels,
  getStudentLevelById,
  getEverythingStudentLevel,
  updateStudentLevel,
  deleteStudentLevel,
};
