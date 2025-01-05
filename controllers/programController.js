import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEverythingPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      include: {
        students: true,
      },
    });

    res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: error.message });
  }
};

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

// Update a program (only if active)
const updateProgram = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

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
      data: { title, description },
    });

    res.status(200).json({ message: "Program updated", updatedProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating program", error: error.message });
  }
};

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

    const updatedProgram = await prisma.program.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Program deactivated", updatedProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating program", error: error.message });
  }
};

export {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  getEverythingPrograms,
};
