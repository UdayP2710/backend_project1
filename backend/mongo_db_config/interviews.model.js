import mongoose from "mongoose";
const interviewSchema = new mongoose.Schema({
  company: { type: String },
  interview_date: { type: Date },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
export const Interview = mongoose.model("Interview", interviewSchema);
