import express from "express";
import {
  changeBookingStatus,
  checkAvailability,
  getBookingsData,
  getOwnerBookings,
} from "../controllers/BookingController.js";
import { protect } from "../middlewears/auth.js";
import { createBooking } from "../controllers/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailability);
bookingRouter.post("/create-route", protect, createBooking);
bookingRouter.get("/user", protect, getBookingsData);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.get("/change-status", protect, changeBookingStatus);

export default bookingRouter;
