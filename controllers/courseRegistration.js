import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Register a Course for a Student
const registerCourse = async (req, res) => {
  const { id } = req.params;
  const { programId, courseId, semesterId, sessionId } = req.body;

  if (!courseId || !programId || !semesterId || !sessionId) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    // Check if the course is already registered
    const existingCourse = await prisma.studentCourse.findUnique({
      where: {
        studentId_sessionId_semesterId_courseId_programId: {
          studentId: parseInt(id),
          programId: parseInt(programId),
          semesterId: parseInt(semesterId),
          sessionId: parseInt(sessionId),
          courseId: parseInt(courseId),
        },
      },
    });

    if (existingCourse) {
      return res.status(400).json({ message: "Course already registered." });
    }

    // Register the course
    const newCourse = await prisma.studentCourse.create({
      data: {
        studentId: parseInt(id),
        courseId: parseInt(courseId),
        programId: parseInt(programId),
        semesterId: parseInt(semesterId),
        sessionId: parseInt(sessionId),
      },
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// ✅ Get All Courses Registered by a Student
const getCourseByStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const registeredCourses = await prisma.studentCourse.findMany({
      where: {
        studentId: parseInt(id),
      },
      include: {
        course: true,
        program: true,
        semester: true,
        session: true,
      },
    });

    if (registeredCourses.length === 0) {
      return res.status(400).json({ message: "Not registered to any course." });
    }

    return res.status(200).json(registeredCourses);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// ✅ Get All Registered Courses (Admin View)
const getAllStudentCourse = async (req, res) => {
  try {
    const registeredCourses = await prisma.studentCourse.findMany({
      include: {
        student: true,
        course: true,
        program: true,
        semester: true,
        session: true,
      },
    });

    return res.status(200).json(registeredCourses);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// ✅ Drop a Registered Course
const dropCourse = async (req, res) => {
  const { id } = req.params;
  const { courseId, sessionId, semesterId, programId } = req.body;

  if (!courseId || !sessionId || !semesterId || !programId) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    const droppedCourse = await prisma.studentCourse.delete({
      where: {
        studentId_sessionId_semesterId_courseId_programId: {
          studentId: parseInt(id),
          courseId: parseInt(courseId),
          sessionId: parseInt(sessionId),
          semesterId: parseInt(semesterId),
          programId: parseInt(programId),
        },
        include: {
          student: true,
          courseId: true,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Course dropped successfully.", droppedCourse });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// ✅ Update Student's Scores
const updateScore = async (req, res) => {
  const { id } = req.params;
  const { courseId, examScore, testScore, semesterId, sessionId, programId } =
    req.body;

  if (!courseId || !semesterId || !sessionId || !programId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if at least one score is provided
  if (testScore === undefined && examScore === undefined) {
    return res.status(400).json({
      message: "At least one score (testScore or examScore) is required.",
    });
  }

  try {
    const updatedCourse = await prisma.studentCourse.update({
      where: {
        studentId_sessionId_semesterId_courseId_programId: {
          studentId: parseInt(id),
          courseId: parseInt(courseId),
          sessionId: parseInt(sessionId),
          semesterId: parseInt(semesterId),
          programId: parseInt(programId),
        },
      },
      data: {
        examScore: examScore !== undefined ? examScore : undefined,
        testScore: testScore !== undefined ? testScore : undefined,
      },
    });

    return res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export {
  registerCourse,
  getCourseByStudent,
  getAllStudentCourse,
  dropCourse,
  updateScore,
};
