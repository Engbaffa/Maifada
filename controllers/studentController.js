import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// create
const createStudent = async (req, res) => {
  const { firstname, lastname, email, gender, address, dateOfBirth } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !gender ||
    !address ||
    !dateOfBirth
  ) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const student = await prisma.student.create({
      data: {
        firstname,
        lastname,
        email,
        gender,
        address,
        dateOfBirth,
      },
    });
    if (!student) {
      return res.status(400).json({ message: "Student not created" });
    }
    res.status(201).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
};
// getAll
const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { isActive: true },
    });

    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};
// getEverything
const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        level: true,
        session: true,
        program: true,
        semesters: true,
        nextOfKin: true,
        previousSchools: true,
        courses: true,
        payments: true,
      },
    });
    if (!students) {
      return res.status(404).json({ message: "No student found" });
    }
    return res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};
// getById
const getStudentById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};
// getE-Active
const getEverythingStudentsActive = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { isActive: true },
      include: {
        level: true,
        session: true,
        program: true,
        semesters: true,
        nextOfKin: true,
        previousSchools: true,
        courses: true,
        payments: true,
      },
    });
    if (!students) {
      return res.status(404).json({ message: "No student found" });
    }
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};
//login
const loginStudent = async (req, res) => {
  try {
    // Implement login logic here
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// delete
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }
  try {
    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        isActive: false,
      },
    });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or already inactive" });
    }
    res.status(200).json({ message: "Student deactivated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating student", error: error.message });
  }
};
// restore
const restoreStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }
  try {
    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        isActive: true,
      },
    });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or already inactive" });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating student", error: error.message });
  }
};
// update score
const updateUtmeScore = async (req, res) => {
  const { id } = req.params;
  const { utmeScore } = req.body;
  if (!utmeScore) {
    return res.status(400).json({ message: "Utme score required" });
  }
  try {
    const updatedUtme = await prisma.student.update({
      where: { id: parseInt(id), isActive: true },
      data: { utmeScore },
    });
    res.status(200).json({ message: "UTME score updated", updatedUtme });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating UTME score", error: error.message });
  }
};

const updateStudentPassword = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedPassword = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { password: hashedPassword },
    });
    if (!updatedPassword) {
      res.status(400).json({ message: "All fields are mandatory" });
    }
    res.status(200).json({ message: "updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
};
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    email,
    gender,
    password,
    dateOfBirth,
    address,
    utmeScore,
  } = req.body;
  if (
    !firstname &&
    !lastname &&
    !email &&
    !gender &&
    !dateOfBirth &&
    !password &&
    !address &&
    !utmeScore
  ) {
    return res
      .status(400)
      .json({ message: "You need at least one field to update" });
  }
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id), isActive: true },
      data: {
        firstname,
        lastname,
        email,
        gender,
        password,
        dateOfBirth,
        address,
        utmeScore,
      },
    });
    res.status(200).json({ message: "Student updated", updatedStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

// register
export {
  loginStudent,
  createStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  updateUtmeScore,
  updateStudentPassword,
  updateStudent,
  getEverythingStudentsActive,
  getAllStudents,
  restoreStudent,
};
