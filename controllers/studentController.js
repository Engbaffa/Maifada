import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const loginStudent = async (req, res) => {
  try {
    // Implement login logic here
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    // Implement change password logic here
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const createStudent = async (req, res) => {
  const { firstname, lastname, email, programId, sessionId } = req.body;
  if (!firstname || !lastname || !email || !programId || !sessionId) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const programExists = await prisma.program.findUnique({
      where: { id: parseInt(programId) },
    });
    if (!programExists || !programExists.isActive) {
      return res.status(400).json({ message: "Program not found or inactive" });
    }
    const sessionExists = await prisma.session.findUnique({
      where: { id: parseInt(sessionId) },
    });
    if (!sessionExists || !sessionExists.isActive) {
      return res.status(400).json({ message: "Session not found or inactive" });
    }
    const student = await prisma.student.create({
      data: {
        firstname,
        lastname,
        email,
        programId: parseInt(programId),
        sessionId: parseInt(sessionId),
      },
    });
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
      data: { isActive: false },
    });
    res.status(200).json({ message: "Student deactivated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating student", error: error.message });
  }
};

const updateNextOfKin = async (req, res) => {
  const { id } = req.params;
  const { relationship, name, address, phone, email, studentId } = req.body;
  if (!relationship || !name || !address || !phone || !email || !studentId) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    const updatedNextOfKin = await prisma.nextOfKin.update({
      where: { studentId: parseInt(studentId) },
      data: { relationship, name, address, phone, email, isActive: true },
    });
    res.status(200).json({ message: "Next of kin updated", updatedNextOfKin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating next of kin", error: error.message });
  }
};

const updatePreviousSchools = async (req, res) => {
  const { name, type, yearOfGraduation, address, studentId } = req.body;
  if (!name || !type || !yearOfGraduation || !address || !studentId) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    const updatedSchools = await prisma.previousSchool.update({
      where: { studentId: parseInt(studentId) },
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

const updateUtmeScore = async (req, res) => {
  const { studentId, utmeScore } = req.body;
  if (!studentId || !utmeScore) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    const updatedUtme = await prisma.student.update({
      where: { id: parseInt(studentId) },
      data: { utmeScore },
    });
    res.status(200).json({ message: "UTME score updated", updatedUtme });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating UTME score", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { studentId, password } = req.body;
  if (!studentId || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedPassword = await prisma.student.update({
      where: { id: parseInt(studentId) },
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
    sessionId,
    programId,
  } = req.body;
  if (
    !firstname &&
    !lastname &&
    !email &&
    !gender &&
    !dateOfBirth &&
    !password &&
    !address &&
    !utmeScore &&
    !programId &&
    !sessionId
  ) {
    return res
      .status(400)
      .json({ message: "You need at least one field to update" });
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id), isActive: true },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }
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
        programId,
        sessionId,
      },
    });
    res.status(200).json({ message: "Student updated", updatedStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

const getStudentsBySession = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required" });
  }
  try {
    const session = await prisma.session.findUnique({
      where: { id: parseInt(sessionId), isActive: true },
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }
    const students = await prisma.student.findMany({
      where: { sessionId: parseInt(sessionId), isActive: true },
    });
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

const getStudentsByProgram = async (req, res) => {
  const { programId } = req.body;
  if (!programId) {
    return res.status(400).json({ message: "Program ID is required" });
  }
  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(programId), isActive: true },
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }
    const students = await prisma.student.findMany({
      where: { programId: parseInt(programId), isActive: true },
    });
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

const getStudentsByProgramBySession = async (req, res) => {
  const { programId, sessionId } = req.body;
  if (!programId || !sessionId) {
    return res
      .status(400)
      .json({ message: "Program ID and Session ID are required" });
  }
  try {
    const session = await prisma.session.findUnique({
      where: { id: parseInt(sessionId), isActive: true },
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }
    const program = await prisma.program.findUnique({
      where: { id: parseInt(programId), isActive: true },
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }
    const students = await prisma.student.findMany({
      where: {
        sessionId: parseInt(sessionId),
        programId: parseInt(programId),
        isActive: true,
      },
    });
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

const getStudentsBySemester = async (req, res) => {
  const { semesterId } = req.body;
  if (!semesterId) {
    return res.status(400).json({ message: "Semester ID is required" });
  }
  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId), isActive: true },
    });
    if (!semester) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }
    const students = await prisma.student.findMany({
      where: { semesterId: parseInt(semesterId), isActive: true },
    });
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

const getStudentsByCourse = async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId), isActive: true },
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found or inactive" });
    }
    const students = await prisma.studentCourse.findMany({
      where: { courseId: parseInt(courseId) },
      include: { student: true },
    });
    res.status(200).json(students.map((sc) => sc.student));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

const getStudentsByCourseBySemester = async (req, res) => {
  const { semesterId, courseId } = req.body;
  if ((!semesterId, !courseId)) {
    return res.status(400).json({ message: "Semester ID is required" });
  }
  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId), isActive: true },
    });
    if (!semester) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId), isActive: true },
    });
    if (!course) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }
    const students = await prisma.studentCourse.findMany({
      where: { semesterId: parseInt(semesterId), courseId: parseInt(courseId) },
      include: { student: true },
    });
    res.status(200).json(students.map((sc) => sc.student));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

export {
  loginStudent,
  changePassword,
  createStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  updateNextOfKin,
  updatePreviousSchools,
  updateUtmeScore,
  updatePassword,
  updateStudent,
  getStudentsBySession,
  getStudentsByProgram,
  getStudentsByProgramBySession,
  getStudentsBySemester,
  getStudentsByCourse,
  getStudentsByCourseBySemester,
};
