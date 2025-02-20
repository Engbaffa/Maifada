import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

// Create a new student
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
    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash("password", 10);
    const student = await prisma.student.create({
      data: {
        firstname,
        lastname,
        email,
        gender,
        address,
        dateOfBirth,
        password: hashedPassword,
        isActive: true, // Ensure the student is active by default
      },
    });

    return res
      .status(201)
      .json({ message: "Student created successfully", student });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
};

// Get all active students

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { isActive: true },
    });

    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

// Get all students with relations (active and inactive)
const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({});
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id, 10), isActive: true },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching student", error: error.message });
  }
};

// Get all active students with relations.
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

    if (students.length === 0) {
      return res.status(404).json({ message: "No active students found" });
    }

    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

// Login student
const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const user = await prisma.student.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

// Deactivate a student (soft delete)

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const student = await prisma.student.update({
      where: { id: parseInt(id, 10) },
      data: { isActive: false },
    });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or already inactive" });
    }

    return res
      .status(200)
      .json({ message: "Student deactivated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deactivating student", error: error.message });
  }
};

// Restore a deactivated student
const restoreStudent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const student = await prisma.student.update({
      where: { id: parseInt(id, 10) },
      data: { isActive: true },
    });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or already active" });
    }

    return res
      .status(200)
      .json({ message: "Student restored successfully", student });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error restoring student", error: error.message });
  }
};

// Update UTME score for a student

const updateUtmeScore = async (req, res) => {
  const { id } = req.params;
  const { utmeScore } = req.body;

  if (!utmeScore) {
    return res.status(400).json({ message: "UTME score is required" });
  }

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id, 10), isActive: true },
      data: { utmeScore },
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }

    return res.status(200).json({
      message: "UTME score updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating UTME score", error: error.message });
  }
};

// Update student details

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
    !password &&
    !dateOfBirth &&
    !address &&
    !utmeScore
  ) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update" });
  }

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id, 10), isActive: true },
      data: {
        firstname: firstname || undefined,
        lastname: lastname || undefined,
        email: email || undefined,
        gender: gender || undefined,
        password: password || undefined,
        dateOfBirth: dateOfBirth || undefined,
        address: address || undefined,
        utmeScore: utmeScore || undefined,
      },
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

export {
  createStudent,
  getStudents,
  getAllStudents,
  getStudentById,
  getEverythingStudentsActive,
  loginStudent,
  deleteStudent,
  restoreStudent,
  updateUtmeScore,
  updateStudent,
};
