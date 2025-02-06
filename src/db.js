import mongoose from "mongoose";
import config from "./config/botConfig.js";
import process from "process";

if (!config.mongoURI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
