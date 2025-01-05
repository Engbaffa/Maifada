import express from "express";
import {
  registerAdmin,
  loginAdmin,
  updatePassword,
} from "../controllers/adminController.js";

import {
  registerCourse,
  getAllStudentCourse,
  dropCourse,
  updateScore,
  getCourseByStudent,
  getEverythingAllStudentCourse,
} from "../controllers/courseRegistration.js";

import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
  getEverythingCourses,
} from "../controllers/coursesController.js";

// Kin

import {
  createNextOfKin,
  getNextByStudent,
  getNextOfKins,
  updateNextOfKin,
  deleteNextOfKin,
} from "../controllers/kinController.js";

//PAYMENT
import {
  createPayment,
  deletePayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
} from "../controllers/paymentController.js";

// PROGRAM
import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  getEverythingPrograms,
} from "../controllers/programController.js";

//
import {
  createSemester,
  getSemesters,
  getEverythingSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
} from "../controllers/semesterController.js";

//SESSION

import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  getEverythingSessions,
} from "../controllers/sessionController.js";

import {
  loginStudent,
  createStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  updateUtmeScore,
  updateStudentPassword,
  updateStudent,
  getEverythingStudents,
} from "../controllers/studentController.js";

import {
  createStudentPayment, // C
  paymentVerification, // U
  getAllPaid,
  getAllPending,
  getAllNotPaid,
  getAll,
  deleteStudentPayment,
  getPaymentByStudent,
  getEverythingStudentPayments,
} from "../controllers/studentPayment.js";

const superRouter = express.Router();

// Admin routes
superRouter.post("/register", registerAdmin);
superRouter.post("/login", loginAdmin);
superRouter.put("/update-password", updatePassword);

// Course registration routes

superRouter.post("/course-registration/:id", registerCourse); // ✅
superRouter.get("/course-registration", getAllStudentCourse); // ✅
superRouter.get("/course-registration/:id", getCourseByStudent); // ✅
superRouter.delete("/course-registration/:id", dropCourse); // ✅
superRouter.put("/score/:id", updateScore); // ✅
superRouter.get("/all-registered-courses", getEverythingAllStudentCourse); // ✅

// Course routes
superRouter.post("/course", createCourse); // ✅
superRouter.get("/courses", getCourses); // ✅
superRouter.get("/course/:id", getCourseById); // ✅
superRouter.put("/course/:id", updateCourse); // ✅
superRouter.delete("/course/:id", deleteCourse); // ✅
superRouter.get("/allcourses", getEverythingCourses); // ✅

// KIN

superRouter.post("/kin/:id", createNextOfKin); // ✅
superRouter.get("/kin", getNextOfKins); // ✅
superRouter.get("/kin/:id", getNextByStudent); // ✅
superRouter.put("/kin/:id", updateNextOfKin); // ✅
superRouter.delete("/kin/:id", deleteNextOfKin); // ✅

// Payment routes

superRouter.post("/payment", createPayment); // ✅
superRouter.delete("/payment/:id", deletePayment); // ✅
superRouter.put("/payment/:id", updatePayment); // ✅
superRouter.get("/payments", getAllPayments); // ✅
superRouter.get("/payment/:id", getPaymentById); // ✅

// Program routes

superRouter.post("/program", createProgram); // ✅
superRouter.get("/programs", getPrograms); // ✅
superRouter.get("/program/:id", getProgramById); // ✅
superRouter.put("/program/:id", updateProgram); // ✅
superRouter.delete("/program/:id", deleteProgram); // ✅
superRouter.get("/allprograms", getEverythingPrograms); // ✅

// Semester routes
superRouter.post("/semester", createSemester); // ✅
superRouter.get("/semesters", getSemesters); // ✅
superRouter.get("/semester/:id", getSemesterById); // ✅
superRouter.put("/semester/:id", updateSemester); // ✅
superRouter.delete("/semester/:id", deleteSemester); // ✅
superRouter.get("/allsemesters/", getEverythingSemester); // ✅

// Session routes
superRouter.post("/session", createSession); // ✅
superRouter.get("/sessions", getSessions); // ✅
superRouter.get("/session/:id", getSessionById); // ✅
superRouter.put("/session/:id", updateSession); // ✅
superRouter.delete("/session/:id", deleteSession); // ✅
superRouter.get("/allsessions", getEverythingSessions); // ✅

// STUDENT ROUTE
// superRouter.post("/student-login", loginStudent);
//superRouter.put("/student/change-password", updateStudentPassword);
superRouter.post("/student", createStudent); // ✅
superRouter.get("/student/:id", getStudentById); // ✅
superRouter.get("/students", getStudents); // ✅
superRouter.delete("/student/:id", deleteStudent); // ✅
superRouter.put("/student-utme/:id", updateUtmeScore); // ✅
superRouter.put("/student/:id", updateStudent); // ✅
superRouter.get("/allstudents", getEverythingStudents); // ✅

// STUDENT - PAYMENT

superRouter.post("/student-payment/:id", createStudentPayment); // ✅
superRouter.put("/student-payment/:id", paymentVerification); // ✅
superRouter.get("/student-paid", getAllPaid); // ✅
superRouter.get("/student-pending", getAllPending); // ✅
superRouter.get("/student-notpaid", getAllNotPaid); // ✅
superRouter.get("/student-payments", getAll); // ✅
superRouter.get("/student-payments/:id", getPaymentByStudent); // ✅
superRouter.delete("/student-payments/:id", deleteStudentPayment); // ✅
superRouter.get("/allstudent-payments/", getEverythingStudentPayments); // ✅

export default superRouter;
