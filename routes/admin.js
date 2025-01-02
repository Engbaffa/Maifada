import express from "express";

const adminRouter = express.Router();

import {
  getAllStudents,
  getAll,
  getAllStudents,
} from "../controllers/courseRegistration";

import {
  createCourse,
  getCourseById,
  getCourses,
  deleteCourse,
  coursesByProgram,
  getCoursesByProgramBySemester,
  getCoursesBySemester,
  getInactiveCourses,
  updateScore,
} from "../controllers/coursesController";

import {
  createPayment,
  deletePayment,
  updatePayment,
  getAllPayments,
  getActivePayments,
  getPaymentById,
} from "../controllers/paymentController";
export default adminRouter;
