import express from "express";
import {
  registerAdmin,
  loginAdmin,
  updatePassword,
} from "../controllers/adminController.js";

import {
  registerCourse,
  getAll,
  getAllStudentsByCourse,
  dropCourse,
} from "../controllers/courseRegistration.js";

import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse,
  coursesByProgram,
  getCoursesByProgramBySemester,
  getCoursesBySemester,
  getInactiveCourses,
  updateScore,
} from "../controllers/coursesController.js";

import {
  createPayment,
  deletePayment,
  updatePayment,
  getAllPayments,
  getActivePayments,
  getPaymentById,
} from "../controllers/paymentController.js";

import {
  createProgram,
  getPrograms,
  getAllPrograms,
  getProgramById,
  // getProgramsBySession,
  updateProgram,
  deleteProgram,
  restoreProgram,
} from "../controllers/programController.js";

import {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
  restoreSemester,
  getSemestersBySession,
} from "../controllers/semesterController.js";

import {
  createSession,
  getSessions,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

import {
  loginStudent,
  changePassword,
  createStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  updateNextOfKin,
  updatePreviousSchools,
  updateUtmeScore,
  updateStudent,
  getStudentsBySession,
  getStudentsByProgram,
  getStudentsByProgramBySession,
  getStudentsBySemester,
  getStudentsByCourse,
  getStudentsByCourseBySemester,
} from "../controllers/studentController.js";

import {
  createStudentPayment,
  paymentVerification,
  getAllPaid,
  getAllPaidBySession,
  getAllPaidByProgram,
  getAllPaidBySessionByStudents,
  getAllPending,
  getAllPendingBySession,
  getAllPendingByProgram,
  /*  getAllPendingByStudentByProgram, */
  getAllNotPaid,
  getAllNotPaidBySession,
  getAllNotPaidByProgram,
  /*   getAllNotPaidBySessionByProgram,
  getAll, */
} from "../controllers/studentPayment.js";

const superRouter = express.Router();

// Admin routes
superRouter.post("/register", registerAdmin);
superRouter.post("/login", loginAdmin);
superRouter.put("/update-password", updatePassword);

// Course registration routes
superRouter.post("/course-registration", registerCourse);
superRouter.get("/course-registration", getAll);
superRouter.get("/course-registration/:id", getAllStudentsByCourse);
superRouter.put("/course-registration", dropCourse);

// Course routes
superRouter.post("/course", createCourse);
superRouter.get("/courses", getCourses);
superRouter.get("/course/:id", getCourseById);
superRouter.put("/course/:id", updateCourse);
superRouter.delete("/course/:id", deleteCourse);
superRouter.get("/courses/program/:id", coursesByProgram);
superRouter.get("/courses/semester/:id", getCoursesBySemester);
superRouter.get(
  "/courses/program/:programId/semester/:semesterId",
  getCoursesByProgramBySemester
);
superRouter.get("/courses/inactive", getInactiveCourses);
superRouter.put("/course-score", updateScore);

// Payment routes
superRouter.post("/payment", createPayment);
superRouter.delete("/payment/:id", deletePayment);
superRouter.put("/payment/:id", updatePayment);
superRouter.get("/payments", getAllPayments);
superRouter.get("/payments/active", getActivePayments);
superRouter.get("/payment/:id", getPaymentById);

// Program routes
superRouter.post("/program", createProgram); // ✅
superRouter.get("/programs", getPrograms); // ✅
superRouter.get("/all-programs", getAllPrograms); // ✅
superRouter.get("/program/:id", getProgramById); // ✅
// superRouter.get("/programs/session/:id", getProgramsBySession); //✅
superRouter.put("/program/:id", updateProgram); // ✅
superRouter.put("/delete-program/:id", deleteProgram); // ✅
superRouter.put("/program/:id/restore", restoreProgram); // ✅

// Semester routes
superRouter.post("/semester", createSemester); // ✅
superRouter.get("/semesters", getSemesters); // ✅
superRouter.get("/semester/:id", getSemesterById); // ✅
superRouter.put("/semester/:id", updateSemester); // ✅
superRouter.delete("/semester/:id", deleteSemester); // ✅
superRouter.put("/semester/:id/restore", restoreSemester); // ✅
superRouter.get("/semesters/session/:id", getSemestersBySession); // ✅

// Session routes
superRouter.post("/session", createSession); // ✅
superRouter.get("/sessions", getSessions); // ✅
superRouter.get("/all-sessions", getAllSessions); // ✅
superRouter.get("/session/:id", getSessionById); // ✅
superRouter.put("/session/:id", updateSession); // ✅
superRouter.delete("/session/:id", deleteSession); // ✅

// Student routes
superRouter.post("/student/login", loginStudent);
superRouter.put("/student/change-password", changePassword);
superRouter.post("/student", createStudent);
superRouter.get("/student/:id", getStudentById);
superRouter.get("/students", getStudents);
superRouter.delete("/student/:id", deleteStudent);
superRouter.put("/student/:id/next-of-kin", updateNextOfKin);
superRouter.put("/student/:id/previous-schools", updatePreviousSchools);
superRouter.put("/student/:id/utme-score", updateUtmeScore);
superRouter.put("/student/:id", updateStudent);
superRouter.get("/students/session/:id", getStudentsBySession);
superRouter.get("/students/program/:id", getStudentsByProgram);
superRouter.get(
  "/students/program/:programId/session/:sessionId",
  getStudentsByProgramBySession
);
superRouter.get("/students/semester/:id", getStudentsBySemester);
superRouter.get("/students/course/:id", getStudentsByCourse);
superRouter.get(
  "/students/course/:courseId/semester/:semesterId",
  getStudentsByCourseBySemester
);

// Student payment routes
superRouter.post("/student-payment", createStudentPayment);
superRouter.put("/student-payment/verify", paymentVerification);
superRouter.get("/student-payments/paid", getAllPaid);
superRouter.get("/student-payments/session/:id/paid", getAllPaidBySession);
superRouter.get("/student-payments/program/:id/paid", getAllPaidByProgram);
superRouter.get(
  "/student-payments/session/:sessionId/program/:programId/paid",
  getAllPaidBySessionByStudents
);
superRouter.get("/student-payments/pending", getAllPending);
superRouter.get(
  "/student-payments/session/:id/pending",
  getAllPendingBySession
);
superRouter.get(
  "/student-payments/program/:id/pending",
  getAllPendingByProgram
);
superRouter.get("/student-payments/not-paid", getAllNotPaid);
superRouter.get(
  "/student-payments/session/:id/not-paid",
  getAllNotPaidBySession
);
superRouter.get(
  "/student-payments/program/:id/not-paid",
  getAllNotPaidByProgram
);
/* superRouter.get(
  "/student-payments/session/:sessionId/program/:programId/not-paid",
  getAllNotPaidBySessionByProgram
); */
superRouter.get("/student-payments", getAll);

export default superRouter;
