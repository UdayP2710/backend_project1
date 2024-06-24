import express from "express";
import { jwt_Authenticaton } from "../../middleware/jwt_auth.js";
import { student_controller } from "./student.controller.js";
export const student_router = express.Router();
student_router.route("/add/studentinfo").post((req, res) => {
  student_controller.addStudentInfo(req, res);
});

student_router.route("/studentlist").get((req, res) => {
  student_controller.studentlist(req, res);
});
