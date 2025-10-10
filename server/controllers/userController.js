import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Car from "../models/Car.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || password.length < 8) {
      return res.json({
        success: false,
        message: "fill all the fields",
      });
    }
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
    return res.json({
      success: true,
      message: "User registered successfully",
      user: user,
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
    return res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getuserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCars = async (req, res) => {
  try {
    let cars = await Car.find({ isAvailable: true });
    res.json({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
