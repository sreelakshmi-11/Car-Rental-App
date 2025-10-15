import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const BookingSchema = new mongoose.Schema(
  {
    car: {
      type: ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    returnLocation: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
