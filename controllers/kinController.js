import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all next of kins
const getNextOfKins = async (req, res) => {
  try {
    const nextOfKins = await prisma.nextOfKin.findMany();
    res
      .status(200)
      .json({ message: "Next of kin retrieved successfully", nextOfKins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching next of kin", error: error.message });
  }
};

// Get next of kin by student ID
const getNextByStudent = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ message: "Invalid student ID" });

  try {
    const nextOfKin = await prisma.nextOfKin.findFirst({
      where: { studentId: parseInt(id) },
    });

    if (!nextOfKin) {
      return res.status(404).json({ message: "Next of kin not found" });
    }

    res.status(200).json(nextOfKin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching next of kin", error: error.message });
  }
};

// Create a next of kin
const createNextOfKin = async (req, res) => {
  const { studentId, relationship, name, address, phone, email } = req.body;

  if (!studentId || !relationship || !name || !address || !phone || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(studentId))
    return res.status(400).json({ message: "Invalid student ID" });

  try {
    const newNextOfKin = await prisma.nextOfKin.create({
      data: {
        studentId: parseInt(studentId),
        relationship,
        name,
        address,
        phone,
        email,
        isActive: true,
      },
    });

    res
      .status(201)
      .json({ message: "Next of kin created successfully", newNextOfKin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating next of kin", error: error.message });
  }
};

// Update next of kin by ID
const updateNextOfKin = async (req, res) => {
  const { id } = req.params;
  const { relationship, name, address, phone, email, isActive } = req.body;

  if (isNaN(id))
    return res.status(400).json({ message: "Invalid next of kin ID" });

  try {
    const updatedNextOfKin = await prisma.nextOfKin.update({
      where: { id: parseInt(id) },
      data: { relationship, name, address, phone, email, isActive },
    });

    res
      .status(200)
      .json({ message: "Next of kin updated successfully", updatedNextOfKin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating next of kin", error: error.message });
  }
};

// Delete next of kin by ID

const deleteNextOfKin = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedKin = await prisma.nextOfKin.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (deletedKin) {
      res.status(400).json({ message: "Not deleted" });
    }
    res.status(200).json(deletedKin);
  } catch (error) {}
};

export {
  createNextOfKin,
  getNextByStudent,
  getNextOfKins,
  updateNextOfKin,
  deleteNextOfKin,
};
