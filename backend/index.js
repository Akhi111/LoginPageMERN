import express from "express";
import dotenv from "dotenv";
import connectToDB from "./src/db/connectToDB.js";
import route from "./src/router/user.router.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", route);

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Something went wrong in Connection", error);
  });
