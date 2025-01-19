import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Get All Payments
const getAll = async (req, res) => {
  try {
    const allPayments = await prisma.studentPayment.findMany({});
    res.status(200).json(allPayments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const createStudentPayment = async (req, res) => {
  const { paymentCode, paymentId, studentId, levelId } = req.body;

  if (!paymentCode || !paymentId || !sessionId || !studentId || !levelId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Hash the payment code
    const hashedCode = await bcrypt.hash(paymentCode, 10);

    // Create a new payment
    const newPayment = await prisma.studentPayment.create({
      data: {
        studentId: parseInt(studentId),
        paymentId: parseInt(paymentId),
        levelId: parseInt(levelId),
        paymentCode: hashedCode,
        status: "PENDING",
      },
    });

    res
      .status(201)
      .json({ message: "Payment created successfully.", payment: newPayment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating payment.", details: error.message });
  }
};

// ✅ Verify Payment
const paymentVerification = async (req, res) => {
  const { id } = req.params;
  const { verifyPayment, paymentId, levelId, studentId } = req.body;

  if (!verifyPayment || !paymentId || !levelId || !studentId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find pending payment
    const studentPayment = await prisma.studentPayment.findFirst({
      where: {
        studentId: parseInt(studentId),
        paymentId: parseInt(paymentId),
        levelId: parseInt(levelId),
        status: "PENDING",
      },
    });

    if (!studentPayment) {
      return res.status(404).json({ message: "No pending payment found." });
    }

    // Verify the payment code
    const verified = await bcrypt.compare(
      verifyPayment,
      studentPayment.paymentCode
    );
    if (!verified) {
      return res.status(400).json({ message: "Invalid payment code." });
    }

    // Update payment status to PAID
    const updatedPayment = await prisma.studentPayment.update({
      where: { id: studentPayment.id },
      data: { status: "PAID" },
    });

    res.status(200).json({
      message: "Payment verified successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error verifying payment.", details: error.message });
  }
};

// ✅ Get All Paid Payments

const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payments = await prisma.studentPayment.findMany({
      where: { id: parseInt(id) },
    });

    if (!payments.length) {
      return res
        .status(404)
        .json({ message: "No payments found for the student." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

// ✅ Delete a Student Payment
const deleteStudentPayment = async (req, res) => {
  const { paymentId, levelId, studentId } = req.body;

  if (!paymentId || !levelId || !studentId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const deletedPayment = await prisma.studentPayment.deleteMany({
      where: {
        studentId: parseInt(studentId),
        levelId: parseInt(levelId),
        paymentId: parseInt(paymentId),
      },
    });

    if (deletedPayment.count === 0) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({ message: "Payment deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting payment.", details: error.message });
  }
};

// ✅ Export the Routes
export {
  createStudentPayment, // C
  paymentVerification, // U
  getAll,
  deleteStudentPayment,
  getPaymentById,
};
