import express from "express";
import {
  registerAdmin,
  loginAdmin,
  updatePassword,
} from "../controllers/adminController.js";

import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
  getEverythingCourses,
} from "../controllers/coursesController.js";

// KIN CONTROLLER
import {
  createNextOfKin,
  getNextByStudent,
  getNextOfKins,
  updateNextOfKin,
  deleteNextOfKin,
} from "../controllers/kinController.js";

// LEVEL

import {
  createLevel,
  getAllLevels,
  getEverythingLevel,
  updateLevel,
  deleteLevel,
  getLevelById,
} from "../controllers/levelController.js";

// payment

import {
  createPayment,
  deletePayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  getEverythingPayments,
} from "../controllers/paymentController.js";

import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  getEverythingPrograms,
} from "../controllers/programController.js";

import {
  createPreviousSchool,
  getPreviousSchoolById,
  getPreviousSchools,
  updatePreviousSchool,
  deletePreviousSchool,
} from "../controllers/schoolController.js";

import {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
  getEverythingSemester,
} from "../controllers/semesterController.js";

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
  paymentVerification, // U
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

const superRouter = express.Router();

// Admin routes
superRouter.post("/register", registerAdmin);
superRouter.post("/login", loginAdmin);
superRouter.put("/update-password", updatePassword);

// Course routes
superRouter.post("/course", createCourse); // ✅
superRouter.get("/courses", getCourses); // ✅
superRouter.get("/course/:id", getCourseById); // ✅
superRouter.put("/course/:id", updateCourse); // ✅
superRouter.delete("/course/:id", deleteCourse); // ✅
superRouter.get("/allcourses", getEverythingCourses); // ✅

// KIN
superRouter.post("/kin", createNextOfKin); // ✅
superRouter.get("/kins", getNextOfKins); // ✅
superRouter.get("/kin/:id", getNextByStudent); // ✅
superRouter.put("/kin/:id", updateNextOfKin); // ✅
superRouter.delete("/kin/:id", deleteNextOfKin); // ✅

// level
superRouter.post("/level", createLevel); // ✅
superRouter.get("/levels", getAllLevels); // ✅
superRouter.get("/level/:id", getLevelById); // ✅
superRouter.put("/level/:id", updateLevel); // ✅
superRouter.delete("/level/:id", deleteLevel); // ✅
superRouter.get("/alllevels", getEverythingLevel); // ✅

// Payment routes
superRouter.post("/payment", createPayment); // ✅
superRouter.delete("/payment/:id", deletePayment); // ✅
superRouter.put("/payment/:id", updatePayment); // ✅
superRouter.get("/payments", getAllPayments); // ✅
superRouter.get("/payment/:id", getPaymentById); // ✅
superRouter.get("/allpayments", getEverythingPayments); // ✅

// Program routes

superRouter.post("/program", createProgram); // ✅
superRouter.get("/programs", getPrograms); // ✅
superRouter.get("/program/:id", getProgramById); // ✅
superRouter.put("/program/:id", updateProgram); // ✅
superRouter.delete("/program/:id", deleteProgram); // ✅
superRouter.get("/allprograms", getEverythingPrograms); // ✅

// school
superRouter.post("/school", createPreviousSchool); // ✅
superRouter.get("/schools", getPreviousSchools); // ✅
superRouter.get("/school/:id", getPreviousSchoolById); // ✅
superRouter.put("/school/:id", updatePreviousSchool); // ✅
superRouter.delete("/school/:id", deletePreviousSchool); // ✅

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
superRouter.put("/restore-student/:id", restoreStudent); // ✅
superRouter.put("/student-utme/:id", updateUtmeScore); // ✅
superRouter.put("/student/:id", updateStudent); // ✅
superRouter.get("/allstudents", getAllStudents); // ✅
superRouter.get("/activestudents", getEverythingStudentsActive); // ✅

// student course
superRouter.post("/registercourse", registerCourse);
superRouter.get("/registered/:id", getStudentCourseById);
superRouter.delete("/registered/:id", dropCourse);
superRouter.put("/registered/:id", updateScore);
superRouter.get("/registercourses", getAllStudentCourse);

// student level

superRouter.post("/studentlevel", createStudentLevel);
superRouter.get("/studentlevel/:id", getStudentLevelById);
superRouter.delete("/studentlevel/:id", deleteStudentLevel);
superRouter.put("/studentlevel/:id", updateStudentLevel);
superRouter.get("/studentlevels", getAllStudentLevels);
superRouter.get("/allstudentlevels", getEverythingStudentLevel);

// STUDENT - PAYMENT
superRouter.post("/studentpayment", createStudentPayment);
superRouter.put("/verify-payment", paymentVerification);
superRouter.get("/studentpayments", getAll);
superRouter.delete("/studentpayment/:id", deleteStudentPayment);
superRouter.get("/studentpayment/:id", getStudentPaymentById);

// studetn program

superRouter.post("/studentprogram", createStudentProgram);
superRouter.get("/studentprogram/:id", getStudentProgramById);
superRouter.put("/studentprogram/:id", updateStudentProgram);
superRouter.delete("/studentprogram/:id", deleteStudentProgram);
superRouter.get("/studentprograms", getStudentPrograms);

// student semester

superRouter.post("/studentsemester", createStudentSemester);
superRouter.get("/studentsemester/:id", getStudentSemesterById);
superRouter.put("/studentsemester/:id", updateStudentSemester);
superRouter.delete("/studentsemester/:id", deleteStudentSemester);
superRouter.get("/studentsemesters", getAllStudentSemesters);
superRouter.get("/allstudentsemesters", getEverythingStudentSemester);

// student session
superRouter.post("/studentsession", createStudentSessions);
superRouter.get("/studentsession/:id", getStudentSessionsById);
superRouter.put("/studentsession/:id", updateStudentSessions);
superRouter.delete("/studentsession/:id", deleteStudentSessions);
superRouter.get("/studentsessions", getAllStudentSessions);
superRouter.get("/allstudentsessions", getEverythingStudentSessions);

export default superRouter;
