import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all sessions (only active)
const getEverythingSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { isActive: true },
      include: {
        registeredStudents: true,
      },
    });
    res.status(200).json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sessions", error: error.message });
  }
};
// Get all sessions (only active)
const getSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { isActive: true },
    });
    res.status(200).json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sessions", error: error.message });
  }
};

// Create a new
const createSession = async (req, res) => {
  const { title, startYear, endYear } = req.body;

  if (!title || !startYear || !endYear) {
    return res.status(400).json({
      message: "All fields are required: title, startYear, and endYear",
    });
  }

  if (startYear >= endYear) {
    return res
      .status(400)
      .json({ message: "startYear must be less than endYear" });
  }

  try {
    const duplicate = await prisma.session.findFirst({
      where: { startYear, endYear, isActive: true },
    });

    if (duplicate) {
      return res.status(400).json({ message: "Active session already exists" });
    }

    const newSession = await prisma.session.create({
      data: { title, startYear, endYear, isActive: true },
    });

    res.status(201).json({ message: "New session created", newSession });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating session", error: error.message });
  }
};

// Get session by ID (only if active)
const getSessionById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Session ID is required" });
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: Number(id) },
    });

    if (!session || !session.isActive) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    res.status(200).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching session", error: error.message });
  }
};

// Update an existing session (only if active)
const updateSession = async (req, res) => {
  const { id } = req.params;
  const { title, startYear, endYear } = req.body;

  if (!title && !startYear && !endYear) {
    return res.status(400).json({
      message:
        "Title, startYear, and endYear are required to update the session",
    });
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: Number(id) },
    });

    if (!session || !session.isActive) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    const updatedSession = await prisma.session.update({
      where: { id: Number(id) },
      data: { title, startYear, endYear },
    });

    res.status(200).json({ message: "Session updated", updatedSession });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating session", error: error.message });
  }
};

// "Soft delete" a session by setting isActive to false
const deleteSession = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Session ID is required" });
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: Number(id) },
    });

    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found or already inactive" });
    }

    const updatedSession = await prisma.session.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Session deactivated", updatedSession });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating session", error: error.message });
  }
};

export {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  getEverythingSessions,
};
