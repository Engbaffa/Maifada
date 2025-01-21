import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getNextOfKins = async (req, res) => {
  try {
    const NextOfKins = await prisma.nextOfKin.findMany({});
    res.status(200).json({ message: "Next of kin updated", NextOfKins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching next of kin", error: error.message });
  }
};
const deleteNextOfKin = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNextOfKin = await prisma.nextOfKin.delete({
      where: {
        studentId: parseInt(id),
      },
    });
    res.status(200).json({ message: "Next of kin updated", deletedNextOfKin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating next of kin", error: error.message });
  }
};
const getNextByStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const NextOfKin = await prisma.nextOfKin.findUnique({
      where: {
        studentId: parseInt(id),
      },
    });
    res.status(200).json(NextOfKin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching next of kin", error: error.message });
  }
};
const createNextOfKin = async (req, res) => {
  const { studentId, relationship, name, address, phone, email } = req.body;
  if (!studentId || !relationship || !name || !address || !phone || !email) {
    return res.status(400).json({ message: "At least one is mandatory" });
  }
  try {
    const updatedNextOfKin = await prisma.nextOfKin.create({
      data: {
        relationship,
        name,
        address,
        phone,
        email,
        studentId: parseInt(studentId),
        isActive: true,
      },
    });
    res.status(200).json({ message: "Next of kin updated", updatedNextOfKin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating next of kin", error: error.message });
  }
};
const updateNextOfKin = async (req, res) => {
  const { id } = req.params;
  const { relationship, name, address, phone, email, isActive } = req.body;

  try {
    const nextOfKin = await prisma.nextOfKin.update({
      where: {
        id: parseInt(id), // Unique ID.
      },
      data: {
        relationship,
        name,
        address,
        phone,
        email,
        isActive,
      },
    });

    res.status(200).json(nextOfKin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating next of kin", error: error.message });
  }
};

export {
  createNextOfKin,
  getNextByStudent,
  getNextOfKins,
  updateNextOfKin,
  deleteNextOfKin,
};
