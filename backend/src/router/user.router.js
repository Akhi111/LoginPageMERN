import express from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/profile", authMiddleware, userProfile);
export default route;
