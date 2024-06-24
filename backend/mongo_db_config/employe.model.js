import mongoose from "mongoose";
const user_details = new mongoose.Schema({
  username: { type: String, reuired: [true, "username is must!!!!!"] },
  email: { type: String, reuired: true },
  password: { type: String, required: [true, "password is must!!!!"] },
});

export const Employe = mongoose.model("Employe", user_details);
