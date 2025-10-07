import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "JWT Token not provided",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({
        success: false,
        message: "Not Authorised",
      });
    }

    req.user = await User.findById(decoded).select("-password");
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
