import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    console.log("db connecting...");
    const res = await mongoose.connect(
      "mongodb://localhost:27017/placement_cell"
      //   {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //   }
    );
    console.log(`mongodb connected with server ${res.connection.host}`);
  } catch (error) {
    console.log("mongodb connection failed!");
    console.log(error);
  }
};
