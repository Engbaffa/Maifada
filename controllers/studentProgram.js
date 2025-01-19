import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createStudentProgram = async (req, res) => {
  const { programId, studentId } = req.body;
  if (!programId || !studentId) {
    return res.status(400).json({ message: "All fields are mandatoy" });
  }
  try {
    const newProgram = await prisma.studentProgram.create({
      data: {
        programId: parseInt(programId),
        studentId: parseInt(studentId),
      },
    });
    if (!newProgram) {
      return res.status(400).json({ message: "Not created" });
    }
    return res.status(201).json(newProgram);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};
const getStudentPrograms = async (req, res) => {
  try {
    const programs = await prisma.studentProgram.findMany({});
    if (!programs) {
      return res.status(400).json({ message: "no dey" });
    }
    return res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};
const getStudentProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const students = await prisma.studentProgram.findMany({
      where: {
        id: parseInt(id),
      },
    });
    if (!students) {
      return res.status(400).json({ message: "No dey" });
    }
    return res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const updateStudentProgram = async (req, res) => {
  const { id } = req.params;
  const { programId } = req.body;
  if (!id) {
    return res.status(400).json({ message: "all fields are maandatory" });
  }
  try {
    const student = await prisma.studentProgram.update({
      where: {
        studentId: parseInt(id),
      },
      data: {
        programId: parseInt(programId),
      },
    });
    if (!student) {
      return res.status(400).json({ message: "Student no dey" });
    }
    return res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};
const deleteStudentProgram = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const deletedStudent = await prisma.studentProgram.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!deletedStudent) {
      return res.status(400).json({ message: "not" });
    }
    return res.status(200).json(deletedStudent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

export {
  createStudentProgram,
  getStudentProgramById,
  updateStudentProgram,
  deleteStudentProgram,
  getStudentPrograms,
};
