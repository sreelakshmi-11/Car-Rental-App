import express from "express";
import {
  registerUser,
  loginUser,
  getuserData,
} from "../controllers/userController.js";
import { protect } from "../middlewears/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getuserData);

export default userRouter;
