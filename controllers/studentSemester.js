import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getEverythingStudentSemester = async (req, res) => {
  try {
    const allSemesters = await prisma.studentSemester.findMany({
      include: {
        registeredStudents: true,
      },
    });
    res.status(200).json(allSemesters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching semesters.", details: error.message });
  }
};

const getAllStudentSemesters = async (req, res) => {
  try {
    const allSemesters = await prisma.studentSemester.findMany({});
    res.status(200).json(allSemesters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching semesters.", details: error.message });
  }
};

const createStudentSemester = async (req, res) => {
  const { studentId, levelId, semesterId } = req.body;
  if (!studentId || !levelId || !semesterId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = await prisma.studentSemester.create({
      data: {
        studentId: parseInt(studentId),
        levelId: parseInt(levelId),
        semesterId: parseInt(semesterId),
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
      .json({
        error: "Error creating student semester.",
        details: error.message,
      });
  }
};

const deleteStudentSemester = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const student = await prisma.studentSemester.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(400).json({ message: "Student semester not found" });
    }
    await prisma.studentSemester.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Student semester deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error deleting student semester.",
        details: error.message,
      });
  }
};

const updateStudentSemester = async (req, res) => {
  const { id } = req.params;
  const { levelId, semesterId } = req.body;

  if (!levelId || !semesterId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updatedStudent = await prisma.studentSemester.update({
      where: {
        id: parseInt(id),
      },
      data: {
        levelId: parseInt(levelId),
        semesterId: parseInt(semesterId),
      },
    });
    if (!updatedStudent) {
      return res.status(400).json({ message: "Student semester not updated" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error updating student semester.",
        details: error.message,
      });
  }
};

const getStudentSemesterById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const student = await prisma.studentSemester.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(400).json({ message: "Student semester not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error fetching student semester.",
        details: error.message,
      });
  }
};

export {
  getAllStudentSemesters,
  getEverythingStudentSemester,
  createStudentSemester,
  deleteStudentSemester,
  updateStudentSemester,
  getStudentSemesterById,
};
