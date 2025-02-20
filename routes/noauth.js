import express from "express";
const noAuth = express.Router();

import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

import {
  loginStudent,
  createStudent,
} from "../controllers/studentController.js";

// admin
noAuth.post("/register-admin", registerAdmin);
noAuth.post("/login-admin", loginAdmin);

// student
noAuth.post("/login-student", loginStudent);
noAuth.post("/register-student", createStudent); // ✅

export default noAuth;
