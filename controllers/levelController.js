import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createLevel = async (req, res) => {
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
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const deleteLevel = async (req, res) => {
  const { id } = req.params;
  try {
    const level = await prisma.delete({
      where: {
        id: parseInt(level),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const updateLevel = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const getLevelById = async (req, res) => {
  try {
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
