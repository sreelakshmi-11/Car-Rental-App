import Booking from "../models/BookingModel.js";
import Car from "../models/Car.js";

export const checkAvailability = (car, pickupDate, returnDate) => {
  const booking = Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return booking.length === 0;
};

export const CheckAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    const cars = await Car.find({ location, isAvailable: true });

    const availablecarPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });
    let availableCars = await Promise.all(availablecarPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({
      success: true,
      availableCars,
      message: "Available cars fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);

    if (!isAvailable) {
      req.json({
        success: false,
        message: "Car is not available",
      });
    }
    const carData = await Car.findById(car);

    //calculating price

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.price * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      status: "pending",
      price,
    });

    res.json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingsData = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id });
    res.json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      res.json({
        success: false,
        message: "Unauthorised",
      });
    }
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      res.json({
        success: false,
        message: "Unauthorised",
      });
    }
    booking.status = status;

    await booking.save();

    res.json({
      success: true,
      message: "Booking status changed successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
