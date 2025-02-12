import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Get All Payments
const getAllStudentSessions = async (req, res) => {
  try {
    const allSessions = await prisma.studentSession.findMany({});
    res.status(200).json(allSessions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

// ✅ Create a New Student Payment
const createStudentSessions = async (req, res) => {
  const { studentId, sessionId } = req.body;

  try {
    const newStudent = await prisma.studentSession.create({
      data: {
        studentId: parseInt(studentId),
        sessionId: parseInt(sessionId),
      },
    });
    if (!newStudent) {
      return res.status(400).json({ message: "Student not registered" });
    }

    res.status(201).json({
      message: "Student registered successfully.",
      newStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating payment.", details: error.message });
  }
};

const deleteStudentSessions = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const student = await prisma.studentSession.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(400).json({ message: "Session not deleted" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const updateStudentSessions = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const updatedStudent = await prisma.studentSession.update({
      where: {
        id: parseInt(id),
      },
    });
    if (!updatedStudent) {
      return res.status(400).json({ message: "not updated" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getStudentSessionsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const student = await prisma.studentSession.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(400).json({ message: "student no dey" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

export {
  createStudentSessions,
  getAllStudentSessions,
  getStudentSessionsById,
  deleteStudentSessions,
  updateStudentSessions,
};
