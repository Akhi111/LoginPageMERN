import { verifyToken } from "../utils/jwtToken.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is missing or not in the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: false, message: "Access denied. Token is required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and get the decoded user data
    const decoded = verifyToken(token);
    //console.log("Decoded Token:", decoded); // Log decoded token for debugging
    req.user = decoded; // Attach decoded token to request (user info)
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log error details for debugging
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};
