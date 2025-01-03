import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createSemester = async (req, res) => {
  const { name, sessionId } = req.body;

  if (!name || !sessionId) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const sessionExists = await prisma.session.findFirst({
      where: { id: parseInt(sessionId) },
    });

    if (!sessionExists) {
      return res.status(400).json({ message: "Session does not exist" });
    }

    const newSemester = await prisma.semester.create({
      data: { name, sessionId: parseInt(sessionId), isActive: true },
    });

    res.status(201).json({ message: "New semester created", newSemester });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating semester", error: error.message });
  }
};
const getSemesters = async (req, res) => {
  try {
    const semesters = await prisma.semester.findMany({
      where: { isActive: true },
      include: {
        session: true,
        cources: true,
      },
    });
    res.status(200).json(semesters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching semesters", error: error.message });
  }
};

const getSemesterById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Semester ID is required" });
  }

  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(id) },
      include: {
        session: true,
        cources: true,
      },
    });

    if (!semester || !semester.isActive) {
      return res
        .status(404)
        .json({ message: "Semester not found or inactive" });
    }

    res.status(200).json(semester);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching semester", error: error.message });
  }
};

const updateSemester = async (req, res) => {
  const { id } = req.params;
  const { sessionId, name } = req.body;
  if (!name && !sessionId) {
    return res.status(400).json({ message: "At least one fields required" });
  }

  if (!id) {
    return res.status(400).json({ message: "Semester ID is required" });
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: parseInt(sessionId) },
    });

    if (!session || !session.isActive) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    const updatedSemester = await prisma.semester.update({
      where: { id: parseInt(id) },
      data: { name, sessionId: parseInt(sessionId) },
    });

    res.status(200).json({ message: "Semester updated", updatedSemester });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating semester", error: error.message });
  }
};

const deleteSemester = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Semester ID is required" });
  }

  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(id) },
    });

    if (!semester) {
      return res
        .status(404)
        .json({ message: "Semester not found or already inactive" });
    }

    const updatedSemester = await prisma.semester.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Semester deactivated", updatedSemester });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating semester", error: error.message });
  }
};

export {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
