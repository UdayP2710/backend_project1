import mongoose, { mongo } from "mongoose";
const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  result: {
    type: String,
    enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
    required: true,
  },
});
export const Result = mongoose.model("Result", resultSchema);
