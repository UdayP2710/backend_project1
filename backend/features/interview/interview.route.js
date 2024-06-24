import express from "express";
import { interviewController } from "./interview.controller.js";
export const interviewrouter = express.Router();
interviewrouter.route("/add").post((req, res) => {
  interviewController.addNewInterview(req, res);
});
interviewrouter.route("/getlist").get((req, res) => {
  interviewController.getAllInterviews(req, res);
});
interviewrouter.route("/allocate/student").post((req, res) => {
  interviewController.allocateInterviewToStudent(req, res);
});
interviewrouter.route("/get/applied/students").post((req, res) => {
  interviewController.appliedStudentsData(req, res);
});
interviewrouter.route("/update/result").post((req, res) => {
  interviewController.update_result(req, res);
});
interviewrouter.route("/download/result").get((req, res) => {
  interviewController.downloadResult(req, res);
});
