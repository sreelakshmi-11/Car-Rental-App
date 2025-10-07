import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log("connected to DB");
  } catch (err) {
    console.error("error connecting to DB ", err);
  }
};

export default connectDB;
