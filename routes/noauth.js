import express from "express";
const noAuth = express.Router();

import {
  registerAdmin,
  loginAdmin,
  requestPasswordReset,
  resetAdminPassword,
} from "../controllers/adminController.js";

import {
  loginStudent,
  createStudent,
  resetStudentPassword,
  requestPasswordResetStudent,
} from "../controllers/studentController.js";

import { getPrograms } from "../controllers/programController.js";

// programs
noAuth.get("/programs", getPrograms); // ✅

// admin
noAuth.post("/register-admin", registerAdmin);
noAuth.post("/login-admin", loginAdmin);
noAuth.post("/reset-password-admin", resetAdminPassword);
noAuth.post("/request-password-reset-admin", requestPasswordReset);

// student
noAuth.post("/login-student", loginStudent);
noAuth.post("/register-student", createStudent);
noAuth.post("/reset-password-student/:token", resetStudentPassword);
noAuth.post("/request-password-reset-student", requestPasswordResetStudent);

export default noAuth;
