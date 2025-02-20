import express from "express";

import {
  loginStudent,
  createStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  restoreStudent,
  updateUtmeScore,
  updateStudentPassword,
  updateStudent,
  getEverythingStudentsActive,
  getAllStudents,
} from "../controllers/studentController.js";

import {
  registerCourse,
  getStudentCourseById,
  getAllStudentCourse,
  dropCourse,
  updateScore,
} from "../controllers/studentCourse.js";

// student level

import {
  createStudentLevel,
  getAllStudentLevels,
  getStudentLevelById,
  getEverythingStudentLevel,
  updateStudentLevel,
  deleteStudentLevel,
} from "../controllers/studentLevel.js";

// student payment

import {
  createStudentPayment, // C
  getAll,
  deleteStudentPayment,
  getStudentPaymentById,
} from "../controllers/studentPayment.js";

import {
  createStudentProgram,
  getStudentProgramById,
  updateStudentProgram,
  deleteStudentProgram,
  getStudentPrograms,
} from "../controllers/studentProgram.js";

// student semester

import {
  getAllStudentSemesters,
  getEverythingStudentSemester,
  createStudentSemester,
  deleteStudentSemester,
  updateStudentSemester,
  getStudentSemesterById,
} from "../controllers/studentSemester.js";

// student session

import {
  createStudentSessions,
  getAllStudentSessions,
  getStudentSessionsById,
  deleteStudentSessions,
  updateStudentSessions,
  getEverythingStudentSessions,
} from "../controllers/studentSession.js";

const studentRouter = express.Router();

// STUDENT ROUTE
// studentRouter.post("/student-login", loginStudent);
//studentRouter.put("/student/change-password", updateStudentPassword);
studentRouter.post("/student", createStudent); // ✅
studentRouter.get("/student/:id", getStudentById); // ✅
studentRouter.get("/students", getStudents); // ✅
studentRouter.delete("/student/:id", deleteStudent); // ✅
studentRouter.put("/restore-student/:id", restoreStudent); // ✅
studentRouter.put("/student-utme/:id", updateUtmeScore); // ✅
studentRouter.put("/student/:id", updateStudent); // ✅
studentRouter.get("/allstudents", getAllStudents); // ✅
studentRouter.get("/activestudents", getEverythingStudentsActive); // ✅

// student course
studentRouter.post("/registercourse", registerCourse);
studentRouter.get("/registered/:id", getStudentCourseById);
studentRouter.delete("/registered/:id", dropCourse);
studentRouter.put("/registered/:id", updateScore);
studentRouter.get("/registercourses", getAllStudentCourse);

// student level

studentRouter.post("/studentlevel", createStudentLevel);
studentRouter.get("/studentlevel/:id", getStudentLevelById);
studentRouter.delete("/studentlevel/:id", deleteStudentLevel);
studentRouter.put("/studentlevel/:id", updateStudentLevel);
studentRouter.get("/studentlevels", getAllStudentLevels);
studentRouter.get("/allstudentlevels", getEverythingStudentLevel);

// STUDENT - PAYMENT
studentRouter.post("/studentpayment", createStudentPayment);
studentRouter.put("/verify-payment", paymentVerification);
studentRouter.get("/studentpayments", getAll);
studentRouter.delete("/studentpayment/:id", deleteStudentPayment);
studentRouter.get("/studentpayment/:id", getStudentPaymentById);

// studetn program

studentRouter.post("/studentprogram", createStudentProgram);
studentRouter.get("/studentprogram/:id", getStudentProgramById);
studentRouter.put("/studentprogram/:id", updateStudentProgram);
studentRouter.delete("/studentprogram/:id", deleteStudentProgram);
studentRouter.get("/studentprograms", getStudentPrograms);

// student semester

studentRouter.post("/studentsemester", createStudentSemester);
studentRouter.get("/studentsemester/:id", getStudentSemesterById);
studentRouter.put("/studentsemester/:id", updateStudentSemester);
studentRouter.delete("/studentsemester/:id", deleteStudentSemester);
studentRouter.get("/studentsemesters", getAllStudentSemesters);
studentRouter.get("/allstudentsemesters", getEverythingStudentSemester);

// student session
studentRouter.post("/studentsession", createStudentSessions);
studentRouter.get("/studentsession/:id", getStudentSessionsById);
studentRouter.put("/studentsession/:id", updateStudentSessions);
studentRouter.delete("/studentsession/:id", deleteStudentSessions);
studentRouter.get("/studentsessions", getAllStudentSessions);
studentRouter.get("/allstudentsessions", getEverythingStudentSessions);

export default studentRouter;
