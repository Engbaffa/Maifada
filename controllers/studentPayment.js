import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Get All Payments
const getEverythingStudentPayments = async (req, res) => {
  try {
    const allPayments = await prisma.studentPayment.findMany({
      include: {
        student: true,
        session: true,
        payment: true,
      },
    });
    res.status(200).json(allPayments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};
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

// ✅ Create a New Student Payment
const createStudentPayment = async (req, res) => {
  const { id } = req.params;
  const { paymentCode, paymentId, sessionId } = req.body;

  if (!paymentCode || !paymentId || !sessionId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check for duplicate payment
    const duplicate = await prisma.studentPayment.findUnique({
      where: {
        studentId_sessionId_paymentId: {
          studentId: parseInt(id),
          sessionId: parseInt(sessionId),
          paymentId: parseInt(paymentId),
        },
      },
    });

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Payment has already been made." });
    }

    // Hash the payment code
    const hashedCode = await bcrypt.hash(paymentCode, 10);

    // Create a new payment
    const newPayment = await prisma.studentPayment.create({
      data: {
        studentId: parseInt(id),
        paymentId: parseInt(paymentId),
        sessionId: parseInt(sessionId),
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
  const { verifyPayment, paymentId, sessionId } = req.body;

  if (!verifyPayment || !paymentId || !sessionId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find pending payment
    const studentPayment = await prisma.studentPayment.findFirst({
      where: {
        studentId: parseInt(id),
        paymentId: parseInt(paymentId),
        sessionId: parseInt(sessionId),
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
const getAllPaid = async (req, res) => {
  try {
    const payments = await prisma.studentPayment.findMany({
      where: { status: "PAID" },
    });

    if (!payments.length) {
      return res.status(404).json({ message: "No paid payments found." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching paid payments.", details: error.message });
  }
};

// ✅ Get All Pending Payments
const getAllPending = async (req, res) => {
  try {
    const payments = await prisma.studentPayment.findMany({
      where: { status: "PENDING" },
    });

    if (!payments.length) {
      return res.status(404).json({ message: "No pending payments found." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching pending payments.",
      details: error.message,
    });
  }
};

// ✅ Get All Not Paid Payments
const getAllNotPaid = async (req, res) => {
  try {
    const payments = await prisma.studentPayment.findMany({
      where: { status: "NOT_PAID" },
    });

    if (!payments.length) {
      return res.status(404).json({ message: "No unpaid payments found." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching unpaid payments.",
      details: error.message,
    });
  }
};

// ✅ Get Payment by Student
const getPaymentByStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const payments = await prisma.studentPayment.findMany({
      where: { studentId: parseInt(id) },
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
  const { id } = req.params;
  const { paymentId, sessionId } = req.body;

  if (!paymentId || !sessionId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const deletedPayment = await prisma.studentPayment.deleteMany({
      where: {
        studentId: parseInt(id),
        sessionId: parseInt(sessionId),
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
  getAllPaid,
  getAllPending,
  getAllNotPaid,
  getAll,
  deleteStudentPayment,
  getPaymentByStudent,
  getEverythingStudentPayments,
};
