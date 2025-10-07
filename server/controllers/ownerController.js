import User from "../models/User.js";
import Car from "../models/Car.js";
import fs from "fs";
import imagekit from "../configs/ImageKit.js";
import Booking from "../models/BookingModel.js";
export const ChangeRoleToOwners = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({
      success: true,
      message: "You can list your cars now",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

///API to list Car

export const Addcar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: 1280,
          quality: "auto",
          format: "webp",
        },
      ],
    });

    const image = optimizedImageUrl;
    const carToAdd = await Car.create({ ...car, owner: _id, image: image });
    res.json({
      success: true,
      message: "Car added successfully",
      car: carToAdd,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get car details

export const getOwnersCars = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const car = await Car.findOne({ owner: _id });

    res.json({
      success: true,
      message: "Car details fetched successfully",
      car: car,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorised",
      });
    }
    car.isAvailable = !car.isAvailable;

    await car.save();

    res.json({
      success: true,
      message: "Availability toggled successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorised",
      });
    }
    car.owner = null;
    car.isAvailable = false;

    await car.save();

    res.json({
      success: true,
      message: "car deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner") {
      res.json({
        success: false,
        message: "Unauthorised",
      });
    }
    const cars = await Car.find({ owner: _id });

    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    //calculate monthly revenue

    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const getDashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      totalPendingBookings: pendingBookings.length,
      totalCompletedBookings: completedBookings.length,
      monthlyRevenue,
    };
    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
      getDashboardData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserImage = async (req, res) => {
  try {
    const { _id, role } = req.role;

    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: 1280,
          quality: "auto",
          format: "webp",
        },
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, { image: image });
    res.json({
      success: true,
      message: "Image updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
