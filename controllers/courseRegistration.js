import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const registerCourse = async (req, res) => {
  const { programId, studentId, semesterId } = req.params;
  const { courseId } = req.body;
  if (!studentId || !courseId || !programId || !semesterId) {
    return res.status(400).json({ message: "All fields are mandatory" });
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
    const programExists = await prisma.program.findUnique({
      where: {
        id: parseInt(programId),
      },
    });
    if (!programExists || !programExists.isActive) {
      return res.status(400).json({ message: "Program does not exist" });
    }
    const semesterExists = await prisma.semester.findUnique({
      where: {
        id: parseInt(semesterId),
      },
    });
    if (!semesterExists || !semesterExists.isActive) {
      return res.status(400).json({ message: "Semester does not exist" });
    }
    const duplicate = await prisma.studentCourse.findUnique({
      where: {
        studentId: parseInt(studentId),
        courseId: parseInt(courseId),
        semesterId: parseInt(semesterId),
      },
    });
    if (duplicate) {
      return res.status(400).json({ message: "Course already registered" });
    }

    const newCourse = await prisma.studentCourse.create({
      data: {
        studentId: parseInt(studentId),
        courseId: parseInt(courseId),
        programId: parseInt(programId),
      },
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllStudentsByCourse = async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const studentExists = await prisma.student.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });
    if (!studentExists || !studentExists.isActive) {
      return res.status(400).json({ message: "Student no dey" });
    }
    const studentCourses = await prisma.registerCourse({
      where: {
        studentId: parseInt(studentId),
      },
    });
    if (!studentCourses || !studentCourses.isActive) {
      return res.status(400).json({ message: "student no dey" });
    }
    return res.status(200).json(studentCourses);
  } catch (error) {}
};
const getAll = async (req, res) => {
  try {
    const registered = await prisma.registerCourse({
      where: {
        isActive: true,
      },
    });
    if (!registered || !registered.isActive) {
      return res.status(400).json({ message: "student no dey" });
    }
    return res.status(200).json(registered);
  } catch (error) {}
};
const dropCourse = async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    // cheak is course exists
    const courseExists = await prisma.course.findUnique({
      where: {
        id: parseInt(courseId),
      },
    });
    if (!courseExists || !courseExists.isActive) {
      return res.status(400).jsno({ message: "Course no dey" });
    }
    const studentExists = await prisma.student.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });
    if (!studentExists || !studentExists.isActive) {
      return res.status(400).jsno({ message: "Course no dey" });
    }

    const registered = await prisma.registerCourse.findUnique({
      where: {
        studentId: parseInt(studentId),
      },
    });
    if (!registered || !registered.isActive) {
      return res.status(400).json({ message: "NOT regsitered to course" });
    }

    const dropCourse = await prisma.studentCourse.update({
      where: {
        studentId: parseInt(studentId),
      },
      data: {
        isActive: false,
      },
    });
    res.status(200).json({ message: "Course dropped succesfully", dropCourse });
  } catch (error) {}
};

export { registerCourse, getAll, getAllStudentsByCourse, dropCourse };
