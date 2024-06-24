import express from "express";
import { connectDB } from "../mongo_db_config/db.config.js";
import employee_router from "../features/emloyee/employe.route.js";
import { student_router } from "../features/student/student.route.js";
import { interviewrouter } from "../features/interview/interview.route.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use("/api/employee", employee_router);
app.use("/api/student", student_router);
app.use("/api/interview", interviewrouter);

app.listen(7000, () => {
  console.log("server is listening at port 7000!!!");
  connectDB();
});
