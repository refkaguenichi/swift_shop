import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Database is connected`);
  } catch (error) {
    console.log("Database isn't connected", error);
  }
};

export default connectDB;
