import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createLevel = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const level = await prisma.level.create({
      data: {
        title,
      },
    });
    if (!level) {
      return res.status(400).json({ message: "Level not created" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const getAllLevels = async (req, res) => {
  try {
    const levels = await prisma.level.findMany({});
    res.status(200).json(levels);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const getEverythingLevel = async (req, res) => {
  try {
    const allLevels = await prisma.level.findMany({
      include: {
        studentsRegistered,
      },
    });
    if (!allLevels) {
      return res.status(400).json({ message: "Levels no dey" });
    }
    res.status(200).json(allLevels);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const deleteLevel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required " });
  }
  try {
    const deletedLevel = await prisma.delete({
      where: {
        id: parseInt(level),
      },
    });
    if (!deletedLevel) {
      return res.status(400).json({ message: "Level no deleted" });
    }
    return res.status(400).json(deleteLevel);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const updateLevel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updatedLevel = await prisma.level.delete({
      id: parseInt(id),
    });
    if (!updatedLevel) {
      return res.status(400).json({ message: "Updated level" });
    }
    return res.status(200).json(updatedLevel);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const getLevelById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const level = await prisma.level.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!level) {
      return res.status(400).json({ message: "Level no dey" });
    }
    res.status(200).json(level);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

export {
  createLevel,
  getAllLevels,
  getEverythingLevel,
  updateLevel,
  deleteLevel,
  getLevelById,
};
