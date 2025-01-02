import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new program
const createProgram = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message:
        "All fields are required: title, description, fee, and sessionId",
    });
  }

  try {
    const duplicate = await prisma.program.findUnique({
      where: {
        title,
      },
    });

    if (duplicate) {
      res.status(400).json({ message: "Session already exists" });
    }

    const newProgram = await prisma.program.create({
      data: {
        title,
        description,
        isActive: true,
      },
    });

    res.status(201).json({ message: "New program created", newProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating program", error: error.message });
  }
};

// Get all programs (only active)
const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
    });

    res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: error.message });
  }
};

// Get all programs (both active and inactive)
const getAllPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany();
    res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: error.message });
  }
};

// Get a program by ID (only if active)
const getProgramById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Program ID is required" });
  }

  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id) },
    });

    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }

    res.status(200).json(program);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching program", error: error.message });
  }
};

// Get programs by session (only active)
const getProgramsBySession = async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required" });
  }

  try {
    const sessionExists = await prisma.session.findUnique({
      where: { id: parseInt(sessionId) },
    });

    if (!sessionExists || !sessionExists.isActive) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    const programs = await prisma.program.findMany({
      where: { sessionId: parseInt(sessionId), isActive: true },
    });

    res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: error.message });
  }
};

// Update a program (only if active)
const updateProgram = async (req, res) => {
  const { id } = req.params;
  const { title, description, fee } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Program ID is required" });
  }

  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id) },
    });

    if (!program || !program.isActive) {
      return res.status(404).json({ message: "Program not found or inactive" });
    }

    const updatedProgram = await prisma.program.update({
      where: { id: parseInt(id) },
      data: { title, description, fee },
    });

    res.status(200).json({ message: "Program updated", updatedProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating program", error: error.message });
  }
};

// "Soft delete" a program by setting isActive to false
const deleteProgram = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Program ID is required" });
  }

  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id) },
    });

    if (!program || !program.isActive) {
      return res
        .status(404)
        .json({ message: "Program not found or already inactive" });
    }

    const updatedProgram = await prisma.program.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    });

    res.status(200).json({ message: "Program deactivated", updatedProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating program", error: error.message });
  }
};

// Restore a program (reactivate it)
const restoreProgram = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Program ID is required" });
  }

  try {
    const program = await prisma.program.findUnique({
      where: { id: parseInt(id) },
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    if (program.isActive) {
      return res.status(400).json({ message: "Program is already active" });
    }

    const updatedProgram = await prisma.program.update({
      where: { id: parseInt(id) },
      data: { isActive: true },
    });

    res.status(200).json({ message: "Program restored", updatedProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error restoring program", error: error.message });
  }
};

export {
  createProgram,
  getPrograms,
  getAllPrograms,
  getProgramById,
  getProgramsBySession,
  updateProgram,
  deleteProgram,
  restoreProgram,
};
