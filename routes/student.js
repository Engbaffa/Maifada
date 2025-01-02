import express from "express";

// studentController.js

import {
  createStudent,
  loginStudent,
  changePassword,
  getStudentById,
  deleteStudent,
  updateStudent,
  updatePreviousSchools,
  updatePassword,
  updateStudent,
} from "../controllers/studentController.js";

// courseController

import {
  registerCourse,
  dropCourse,
  getCourseById,
} from "../controllers/courseRegistration.js";

// paymentController
import { getActivePayments } from "../controllers/paymentController.js";
import {
  createStudentPayment,
  getAllByStudent,
} from "../controllers/studentPayment.js";
const studentRouter = express.Router();

studentRouter.get("/", regi);

export default studentRouter;
