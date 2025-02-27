import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import AdminOnboardingMail from "../middleware/adminOnboardingMail.js";
import dotenv from "dotenv";
import crypto from "crypto";
import ChangePasswordMail from "../middleware/changePasswordMail.js";
dotenv.config();

const prisma = new PrismaClient();
const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

const registerAdmin = async (req, res) => {
  const { username, email } = req.body;

  if (!email || !username) {
    return res.status(400).json({
      message: "All fields are required: email, Username",
    });
  }

  try {
    const existingUser = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);
    const resetToken = crypto.randomBytes(20).toString("hex"); // Random token
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    const toLower = username.toLowerCase();

    const newUser = await prisma.admin.create({
      data: {
        email,
        username: toLower,
        password: hashedPassword,
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetLink = `${process.env.CLIENT_URL}/admin/reset-password?token=${resetToken}`;

    // Send the registration email
    await AdminOnboardingMail(username, email, process.env.PASSWORD, resetLink);

    return res
      .status(201)
      .json({ message: "Admin registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.admin.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // Use only over HTTPS in production
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

/**
 * Get all admins
 */
const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(admins);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching admins", error: error.message });
  }
};

/**
 * Get admin by ID
 */
const getAdminById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(admin);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching admin", error: error.message });
  }
};

/**
 * Update admin details (including password)
 */
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    let data = {};

    if (email) {
      data.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    if (role) {
      data.role = role;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res
      .status(500)
      .json({ message: "Error updating admin", error: error.message });
  }
};

/**
 * Delete admin by ID
 */
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const deletedAdmin = await prisma.admin.delete({
      where: { id: parseInt(id, 10) },
    });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ message: "Admin deleted successfully", admin: deletedAdmin });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res
      .status(500)
      .json({ message: "Error deleting admin", error: error.message });
  }
};

const resetAdminPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  try {
    // Validate the new password
    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "New password is required" });
    }

    // Find the admin by resetToken
    const admin = await prisma.admin.findUnique({
      where: { resetToken: token },
    });

    // Check if the admin exists and the token is not expired
    if (!admin || new Date() > new Date(admin.resetTokenExpiry)) {
      console.log("Admin:", admin); // Debugging log
      console.log("Current Time:", new Date());
      console.log("Token Expiry:", new Date(admin?.resetTokenExpiry));
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Extract the admin ID
    const { id } = admin;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password and clear the reset token
    await prisma.admin.update({
      where: { id: parseInt(id) },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    if (error instanceof prisma.PrismaClientKnownRequestError) {
      return res
        .status(500)
        .json({ message: "Database error", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Find the admin by username
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate a new reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Update the admin record with the new reset token and expiry
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Create the reset link
    const resetLink = `${process.env.CLIENT_URL}/admin/reset-password?token=${resetToken}`;

    // Send the password reset email
    await ChangePasswordMail(admin.email, null, resetLink);

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    return res.status(500).json({
      message: "An error occurred while sending the password reset email.",
    });
  }
};
export {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  resetAdminPassword,
  requestPasswordReset,
};
