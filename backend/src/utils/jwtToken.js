import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Return the decoded token (the user info)
  } catch (error) {
    console.log("Token verification error:", error.message);
    throw new Error("Invalid token"); // Throw an error if token verification fails
  }
};
