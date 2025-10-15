import Booking from "../models/BookingModel.js";
import Car from "../models/Car.js";

export const checkAvailability = async (car, pickupDate, returnDate) => {
  const booking = await Booking.find({
    car,
    pickupDate: { $lte: new Date(returnDate) },
    returnDate: { $gte: new Date(pickupDate) },
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
    const { car, pickupDate, returnDate, pickupLocation, returnLocation } =
      req.body;

    const carData = await Car.findById(car);

    //calculating price
    if (
      !car ||
      !pickupDate ||
      !returnDate ||
      !pickupLocation ||
      !returnLocation
    ) {
      return res.json({
        success: false,
        message: "All details are required",
      });
    }

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    const booking = new Booking({
      car,
      image: carData.image,
      owner: carData.owner,
      user: _id,
      pickupDate: picked,
      returnDate: returned,
      pickupLocation,
      returnLocation,
      status: "pending",
      price,
    });
    await booking.save();

    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
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
      bookings: bookings,
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
