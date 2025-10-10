import express from "express";
import {
  Addcar,
  ChangeRoleToOwners,
  deleteCar,
  getDashboardData,
  getOwnersCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/ownerController.js";
import { protect } from "../middlewears/auth.js";
import upload from "../middlewears/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, ChangeRoleToOwners);
ownerRouter.post("/add-car", upload.single("image"), protect, Addcar);
ownerRouter.get("/cars", protect, getOwnersCars);
ownerRouter.post("/toggle-cars", protect, toggleCarAvailability);
ownerRouter.delete("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);

ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage
);

export default ownerRouter;
