import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

/**
 * Create a new admin user
 */
const registerAdmin = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "All fields are required: email, password, role",
    });
  }

  try {
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash("password", 10);

    const newUser = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ message: "Admin registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

/**
 * Admin login
 */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

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

// Export all controllers
export {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
