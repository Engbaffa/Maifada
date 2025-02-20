import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Get All Student Sessions
const getAllStudentSessions = async (req, res) => {
  try {
    const allSessions = await prisma.studentSession.findMany({});
    res.status(200).json(allSessions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching sessions.", details: error.message });
  }
};

const getEverythingStudentSessions = async (req, res) => {
  try {
    const allSessions = await prisma.studentSession.findMany({
      include: {
        levels: true,
      },
    });
    res.status(200).json(allSessions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching sessions.", details: error.message });
  }
};

// ✅ Create a New Student Session
const createStudentSessions = async (req, res) => {
  const { studentId, sessionId } = req.body;

  if (!studentId || !sessionId || isNaN(studentId) || isNaN(sessionId)) {
    return res
      .status(400)
      .json({ message: "Valid studentId and sessionId are required" });
  }

  try {
    const newStudent = await prisma.studentSession.create({
      data: {
        studentId: parseInt(studentId),
        sessionId: parseInt(sessionId),
      },
    });

    res.status(201).json({
      message: "Student registered successfully.",
      newStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating session.", details: error.message });
  }
};

// ✅ Get Student Session By ID
const getStudentSessionsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const student = await prisma.studentSession.findUnique({
      where: { id: parseInt(id) },
    });

    if (!student) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching session.", details: error.message });
  }
};

const updateStudentSessions = async (req, res) => {
  const { id } = req.params;
  const { sessionId } = req.body;

  if (!id || !sessionId) {
    return res.status(400).json({ message: "ID and sessionId are required" });
  }

  try {
    const existingSession = await prisma.studentSession.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    const updatedStudent = await prisma.studentSession.update({
      where: { id: parseInt(id) },
      data: { sessionId: parseInt(sessionId) },
    });

    res.status(200).json(updatedStudent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating session.", details: error.message });
  }
};

// ✅ Delete Student Session
const deleteStudentSessions = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const student = await prisma.studentSession.findUnique({
      where: { id: parseInt(id) },
    });

    if (!student) {
      return res.status(404).json({ message: "Session not found" });
    }

    await prisma.studentSession.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting session.", details: error.message });
  }
};

export {
  createStudentSessions,
  getAllStudentSessions,
  getStudentSessionsById,
  deleteStudentSessions,
  updateStudentSessions,
  getEverythingStudentSessions,
};
