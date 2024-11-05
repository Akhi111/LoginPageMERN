import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    res.status(400).json({ status: false, message: "All fields are require" });
  }
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ status: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = generateToken(newUser);

    return res
      .status(201)
      .json({ status: true, message: "User registered successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", error });
  }
};
//?-----------------------Login User------------------------------------------------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ status: false, message: "Email and Password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    const token = generateToken(user);

    return res
      .status(200)
      .json({ status: true, message: "Login Successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", error });
  }
};

//?-----------------------User Profile-----------------------------------
//Since already have middleware for token verification(authMiddleware),
//the middleware will handle that and populate req.user
//and middleware used in /profile router
export const userProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Destructure user properties
    const { id, name, email } = user;

    // Prepare the user data for response
    const userData = {
      id,
      name,
      email,
    };
    return res.status(200).json({
      status: true,
      message: "Profile Data retrieved successfully",
      data: userData,
    });
  } catch (error) {
    console.log("Error retrieving user profile:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
