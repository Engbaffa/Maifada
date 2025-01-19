import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Register a Course for a Student
const registerCourse = async (req, res) => {
  const { studentId, courseId, semesterId } = req.body;

  if (!courseId || !semesterId || !studentId) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    // Register the course
    const newCourse = await prisma.studentCourse.create({
      data: {
        studentId: parseInt(studentId),
        courseId: parseInt(courseId),
        semesterId: parseInt(semesterId),
      },
    });
    if (!newCourse) {
      return res.status(400).json({ message: "Not registered" });
    }
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// ✅ Get All Courses Registered by a Student
const getStudentCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const registeredCourses = await prisma.studentCourse.findMany({
      where: {
        id: parseInt(id),
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
    const registeredCourses = await prisma.studentCourse.findMany({});

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
  try {
    const droppedCourse = await prisma.studentCourse.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!dropCourse) {
      return res.status(400).json({ message: "Dropped" });
    }
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
  const { examScore, testScore } = req.body;

  // Check if at least one score is provided
  if (testScore === undefined && examScore === undefined) {
    return res.status(400).json({
      message: "At least one score (testScore or examScore) is required.",
    });
  }

  try {
    const updatedCourse = await prisma.studentCourse.update({
      where: {
        id: parseInt(id),
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
  getStudentCourseById,
  getAllStudentCourse,
  dropCourse,
  updateScore,
};
