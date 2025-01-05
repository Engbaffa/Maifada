import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEverythingCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        students: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};
const createCourse = async (req, res) => {
  const { title, creditUnit, courseCode, description } = req.body;

  // Validate input
  if (!title || !creditUnit || !courseCode || !description) {
    return res.status(400).json({
      message:
        "All fields are required: title, creditUnit, courseCode, description, programId, semesterId.",
    });
  }

  try {
    //Create a new course
    const newCourse = await prisma.course.create({
      data: {
        title,
        creditUnit,
        courseCode,
        description,
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
    const courses = await prisma.course.findMany({});
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
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
  const { title, creditUnit, courseCode, description } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        creditUnit,
        courseCode,
        description,
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

    const deactivatedCourse = await prisma.course.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Course deactivated", deactivatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating course", error: error.message });
  }
};

export {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
  getEverythingCourses,
};
