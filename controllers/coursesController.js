import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCourse = async (req, res) => {
  const { title, creditUnit, courseCode, description, programId, semesterId } =
    req.body;

  // Validate input
  if (
    !title ||
    !creditUnit ||
    !courseCode ||
    !description ||
    !programId ||
    !semesterId
  ) {
    return res.status(400).json({
      message:
        "All fields are required: title, creditUnit, courseCode, description, programId, semesterId.",
    });
  }

  try {
    // Check if the program exists
    const program = await prisma.program.findUnique({
      where: { id: parseInt(programId) },
    });
    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId) },
    });
    if (!semester || !semester.isActive) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }
    // Create a new course
    const newCourse = await prisma.course.create({
      data: {
        title,
        creditUnit,
        courseCode,
        description,
        semesterId: parseInt(semesterId),
        programId: parseInt(programId),
        isActive: true,
      },
    });

    res.status(201).json({ message: "New course created", newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

const updateScore = async (req, res) => {
  const { courseId } = req.params;
  const { studentId, testScore } = req.body;

  // Check compulsory input
  if (!studentId || !courseId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check optional
  if (testScore === undefined && examScore === undefined) {
    return res
      .status(400)
      .json({ message: "At least one score input is required" });
  }
  try {
    const studentExists = await prisma.student.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });
    if (!studentExists || !studentExists.isActive) {
      return res.status(400).json({ message: "Student does not exist" });
    }
    const courseExists = await prisma.course.findUnique({
      where: {
        id: parseInt(courseId),
      },
    });
    if (!courseExists || !courseExists.isActive) {
      return res.status(400).json({ message: "Course does not exist" });
    }

    const updatedCourse = await prisma.studentCourse.update({
      where: {
        studentId_courseId: {
          studentId: parseInt(studentId),
          courseId: parseInt(courseId),
        },
      },
      data: {
        examScore: examScore !== undefined ? examScore : examScore,
        testScore: testScore !== undefined ? testScore : testScore,
      },
    });

    res.json(updatedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!course || !course.isActive) {
      return res.status(404).json({ message: "Course not found or inactive" });
    }

    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, creditUnit, courseCode, description, programId, semesterId } =
    req.body;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(programId) },
    });
    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }

    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId) },
    });
    if (!semester || !semester.isActive) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        creditUnit,
        courseCode,
        description,
        programId: programId ? parseInt(programId) : undefined,
        semesterId: semesterId ? parseInt(semesterId) : undefined,
      },
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated", updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });

    if (!course || !course.isActive) {
      return res
        .status(404)
        .json({ message: "Course not found or already deleted" });
    }

    const deactivatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    });

    res.status(200).json({ message: "Course deactivated", deactivatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating course", error: error.message });
  }
};

const getCoursesBySemester = async (req, res) => {
  const { semesterId } = req.body;
  if (!semesterId) {
    return res.status(400).json({ message: "Semester ID is required" });
  }
  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId) },
    });
    if (!semester || !semester.isActive) {
      return res
        .status(400)
        .json({ message: "Invalid semester ID or semester is not active" });
    }
    const courses = await prisma.course.findMany({
      where: {
        semesterId: parseInt(semesterId),
        isActive: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

const getCoursesByProgramBySemester = async (req, res) => {
  const { programId, semesterId } = req.body;
  if (!programId || !semesterId) {
    return res
      .status(400)
      .json({ message: "Program ID and Semester ID are required" });
  }
  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(semesterId) },
    });
    if (!semester || !semester.isActive) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }
    const program = await prisma.program.findUnique({
      where: { id: parseInt(programId) },
    });
    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }
    const courses = await prisma.course.findMany({
      where: {
        programId: parseInt(programId),
        semesterId: parseInt(semesterId),
        isActive: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

const coursesByProgram = async (req, res) => {
  const { programId } = req.body;
  if (!programId) {
    return res.status(400).json({ message: "Program ID is required" });
  }
  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(programId) },
    });
    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }
    const courses = await prisma.course.findMany({
      where: {
        programId: parseInt(programId),
        isActive: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

// New API rute to get inactive courses
const getInactiveCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isActive: false,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching inactive courses",
      error: error.message,
    });
  }
};

export {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
  coursesByProgram,
  getCoursesByProgramBySemester,
  getCoursesBySemester,
  getInactiveCourses,
  updateScore,
};
