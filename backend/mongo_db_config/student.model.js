import mongoose from "mongoose";
const studentschema = new mongoose.Schema({
  name: { type: String },
  batch: { type: Number },
  college: { type: String, required: [true, "college name is required"] },
  status: {
    type: String,
    enum: ["placed", "not_placed"],
    required: [true, "please enter the status of student"],
  },
  DSA_score: { type: Number, required: [true, "dsa score is required"] },
  WebD_score: { type: Number, required: [true, "WebD score is required"] },
  React_score: { type: Number, required: [true, "React score is required"] },
});
export const Student = mongoose.model("Student", studentschema);
