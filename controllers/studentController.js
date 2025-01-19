import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const allStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({});
    return res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};
const getEverythingStudentsActive = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { isActive: true },
      include: {
        session: true,
        program: true, // If program is part of the student
        semester: true, // If semster is part of the student
        nextOfKin: true, // If there's a next of kin relationship
        previousSchools: true, // If there are previous schools linked
        courses: true, // If courses are directly related
        payments: true, // If payments are part of the student
        level: true, // If payments are part of the student
      },
    });

    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};
const getEverythingStudentsAll = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        session: true,
        program: true, // If program is part of the student
        semester: true, // If semster is part of the student
        nextOfKin: true, // If there's a next of kin relationship
        previousSchools: true, // If there are previous schools linked
        courses: true, // If courses are directly related
        payments: true, // If payments are part of the student
        level: true, // If payments are part of the student
      },
    });

    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};
const loginStudent = async (req, res) => {
  try {
    // Implement login logic here
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

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

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id), isActive: true },
    });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or already inactive" });
    }
    await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        isActive: false,
      },
    });
    res.status(200).json({ message: "Student deactivated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating student", error: error.message });
  }
};

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
      where: { id: parseInt(id) },
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
  getEverythingStudentsAll,
  getEverythingStudentsActive,
  allStudents,
};
