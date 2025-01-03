import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPayment = async (req, res) => {
  const { type, amount, description } = req.body;

  if (!type || !amount || !description) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const payment = await prisma.payment.create({
      data: {
        type,
        amount,
        description,
      },
    });
    return res
      .status(201)
      .json({ message: "Payment created successfully.", payment });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating payment.", details: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({});
    return res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ALl fields required" });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: {
        id: parseInt(id),
        isActive: true,
      },
    });
    if (!payment || !payment.isActive) {
      return res.status(400).json({ message: "Payment no dey" });
    }
    return res.status(200).json(payment);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating payment.", details: error.message });
  }
};
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { type, amount, description } = req.body;

  if (!id || (!type && !amount && !description)) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const exists = await prisma.payment.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!exists || !exists.isActive) {
      return res.status(400).json({ message: "Payment not found or inactive" });
    }

    const payment = await prisma.payment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        type,
        description,
        amount,
      },
    });

    return res.status(200).json(payment);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error updating payment.", details: error.message });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ALl fields required" });
  }

  try {
    const exists = await prisma.payment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!exists || !exists.isActive) {
      return res.status(400).json({ message: "payment no dey" });
    }
    const payment = await prisma.payment.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!payment) {
      return res.status(400).json({ message: "Payment no dey" });
    }
    return res.status(200).json(payment);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating payment.", details: error.message });
  }
};

export {
  createPayment,
  deletePayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
};
