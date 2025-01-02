// admin updates payment
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const all = await prisma.studentPayment.findMany();
    res.json(all);
  } catch (error) {}
};
const getAllByStudent = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: "Studentid required" });
  }
  try {
    const all = await prisma.studentPayment.findMany({
      where: {
        studentId: parseInt(studentId),
      },
    });
    res.json(all);
  } catch (error) {}
};
const createStudentPayment = async (req, res) => {
  const { paymentId } = req.params;
  const { paymentCode, studentId, sessionId } = req.body;

  if (!paymentId || !paymentCode || !studentId || !sessionId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Verify sessionId
    const session = await prisma.session.findUnique({
      where: {
        id: parseInt(sessionId),
      },
    });
    if (!session || !session.isActive) {
      return res
        .status(400)
        .json({ message: "Session does not exist or is inactive." });
    }

    // Verify paymentId
    const payment = await prisma.studentPayment.findUnique({
      where: {
        id: parseInt(paymentId),
      },
    });
    if (!payment || !payment.isActive) {
      return res
        .status(400)
        .json({ message: "Payment does not exist or is inactive." });
    }

    // Verify studentId
    const studentExists = await prisma.student.findUnique({
      where: { id: parseInt(studentId) },
    });
    if (!studentExists) {
      return res.status(400).json({ message: "Student does not exist." });
    }

    const hashedCode = await bcrypt.hash(paymentCode, 10);
    const updatedPayment = await prisma.studentPayment.create({
      data: {
        studentId: parseInt(studentId),
        paymentId: parseInt(paymentId),
        sessionId: parseInt(sessionId),
        paymentCode: hashedCode,
        status: "PENDING",
      },
    });

    return res.status(200).json({
      message: "Payment updated successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error updating payment.", details: error.message });
  }
};

const paymentVerification = async (req, res) => {
  const { verifyPayment, studentId, paymentId, sessionId } = req.body;
  if (!verifyPayment || !studentId || !paymentId || !sessionId) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const studentExists = await prisma.student.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });
    if (!studentExists || !studentExists.isActive) {
      return res
        .status(400)
        .json({ message: "Student does not exist or is inactive." });
    }
    const payment = await prisma.payment.findUnique({
      where: {
        id: parseInt(paymentId),
      },
    });
    if (!payment) {
      return res.status(400).json({ message: "Payment does not exist." });
    }
    const session = await prisma.session.findUnique({
      where: {
        id: parseInt(sessionId),
      },
    });
    if (!session) {
      return res.status(400).json({ message: "Session does not exist." });
    }

    // Get student payment
    const studentPayment = await prisma.studentPayment.findUnique({
      where: {
        studentId_paymentId_sessionId: {
          studentId: parseInt(studentId),
          paymentId: parseInt(paymentId),
          sessionId: parseInt(sessionId),
          status: "PENDING",
        },
      },
    });
    if (!studentPayment) {
      return res
        .status(400)
        .json({ message: "Student payment does not exist." });
    }

    const verified = await bcrypt.compare(
      verifyPayment,
      studentPayment.paymentCode
    );
    if (!verified) {
      return res.status(400).json({ message: "Invalid payment code." });
    }

    const updatedPayment = await prisma.studentPayment.update({
      where: {
        studentId_paymentId_sessionId: {
          studentId: parseInt(studentId),
          paymentId: parseInt(paymentId),
          sessionId: parseInt(sessionId),
        },
      },
      data: {
        status: "PAID",
      },
    });

    return res.status(200).json({
      message: "Payment verified successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error verifying payment.", details: error.message });
  }
};

const getAllPaid = async (req, res) => {
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PAID",
      },
    });
    if (!payments.length) {
      return res.status(400).json({ message: "No payments found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPaidBySession = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PAID",
        sessionId: parseInt(sessionId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No payments found for this session." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPaidByProgram = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: "student ID is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PAID",
        studentId: parseInt(studentId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No payments found for this program." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPaidBySessionByStudents = async (req, res) => {
  const { sessionId, studentId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }
  if (!studentId) {
    return res.status(400).json({ message: "Program ID is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PAID",
        studentId: parseInt(studentId),
        sessionId: parseInt(sessionId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No payments found for this session and program." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPending = async (req, res) => {
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PENDING",
      },
    });
    if (!payments.length) {
      return res.status(400).json({ message: "No pending payments found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPendingBySession = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PENDING",
        sessionId: parseInt(sessionId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No pending payments found for this session." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPendingByProgram = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: "Program ID is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PENDING",
        studentId: parseInt(studentId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No pending payments found for this program." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllPendingByStudentByProgram = async (req, res) => {
  const { sessionId, studentId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }
  if (!studentId) {
    return res.status(400).json({ message: "studentId is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "PENDING",
        studentId: parseInt(studentId),
        sessionId: parseInt(sessionId),
      },
    });
    if (!payments.length) {
      return res.status(400).json({
        message: "No pending payments found for this session and program.",
      });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllNotPaid = async (req, res) => {
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "NOT_PAID",
      },
    });
    if (!payments.length) {
      return res.status(400).json({ message: "No unpaid payments found." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllNotPaidBySession = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "NOT_PAID",
        sessionId: parseInt(sessionId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No unpaid payments found for this session." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllNotPaidByProgram = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: "studentId  is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "NOT_PAID",
        programId: parseInt(studentId),
      },
    });
    if (!payments.length) {
      return res
        .status(400)
        .json({ message: "No unpaid payments found for this program." });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

const getAllNotPaidBySessionByprogram = async (req, res) => {
  const { sessionId, programId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }
  if (!studentId) {
    return res.status(400).json({ message: "studentId  is required." });
  }
  try {
    const payments = await prisma.studentPayment.findMany({
      where: {
        status: "NOT_PAID",
        programId: parseInt(programId),
        sessionId: parseInt(sessionId),
      },
    });
    if (!payments.length) {
      return res.status(400).json({
        message: "No unpaid payments found for this session and program.",
      });
    }
    res.status(200).json(payments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching payments.", details: error.message });
  }
};

export {
  createStudentPayment,
  paymentVerification,
  getAllPaid,
  getAllPaidBySession,
  getAllPaidByProgram,
  getAllPaidBySessionByStudents,
  getAllPending,
  getAllPendingBySession,
  getAllPendingByProgram,
  getAllPendingByStudentByProgram,
  getAllNotPaid,
  getAllNotPaidBySession,
  getAllNotPaidByProgram,
  getAllNotPaidBySessionByprogram,
  getAll,
};
