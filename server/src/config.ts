import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();
const DB_URI: string = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    await connect(DB_URI);
    console.log("Mongo DB connected.");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error", error);
    }
  }
};

export default connectDB;
