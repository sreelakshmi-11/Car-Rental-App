import express from "express";
import {
  registerUser,
  loginUser,
  getuserData,
  getCars,
} from "../controllers/userController.js";
import { protect } from "../middlewears/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getuserData);
userRouter.get("/cars", getCars);

export default userRouter;
