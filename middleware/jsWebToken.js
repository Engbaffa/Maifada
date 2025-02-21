import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const authenticate = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract the actual token (remove "Bearer " prefix)
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the SECRET_KEY
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired tokens
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticate;
