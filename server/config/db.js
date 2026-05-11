import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DatabseConnected");
    });

    await mongoose.connect(process.env.MONGDB_URL);

  } catch (error) {
    console.error("Database Connection failed", error.message);
  }
};