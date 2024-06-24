import { Interview } from "../../mongo_db_config/interviews.model.js";
import { Student } from "../../mongo_db_config/student.model.js";
import { Result } from "../../mongo_db_config/result.model.js";
import { stringify } from "csv";

const addNewInterview = async (req, res) => {
  const { company, date } = req.body;
  const interview_date = new Date(date);
  const data = { company, interview_date };
  console.log(data);
  try {
    const newInterview = await new Interview(data).save();
    res.status(201).send({ status: "new interview added!!!!" });
  } catch (err) {
    console.log(
      "something went wrong while adding interview in database!!!!!!" + err
    );
  }
};
const getAllInterviews = async (req, res) => {
  try {
    const allInterviews = await Interview.find();
    res.status(200).send(allInterviews);
  } catch (err) {
    console.log(
      "something went wrong while retrieving interviews list from database!!!!!!" +
        err
    );
  }
};
const allocateInterviewToStudent = async (req, res) => {
  const { interview_id, student_id } = req.body;
  console.log(interview_id);
  console.log(student_id);
  try {
    const interview = await Interview.findById(interview_id);
    if (!interview) {
      return res
        .status(404)
        .send({ status: "no interview found with the given id!!!!!" });
    }
    const student = await Student.findById(student_id);
    if (!student) {
      return res
        .status(404)
        .send({ status: "no student found with the given id!!!!!" });
    }
    interview.students.push(student._id);
    await interview.save();
    return res
      .status(200)
      .send({ status: "interview allocated successfully!!!!!" });
  } catch (err) {
    console.log(
      "something went wrong while allocating interview to the student!!!!" + err
    );
  }
};
const appliedStudentsData = async (req, res) => {
  const { id } = req.body;
  console.log("appliedstudentsdata");

  try {
    const interview = await Interview.findById(id).populate("students");
    const students = interview.students;
    console.log(interview);
    res.status(200).send(students);
  } catch (err) {
    console.log("something went wrong while fetching data!!!!" + err);
  }
};
// result update and get functions.........
const update_result = async (req, res) => {
  const { interview_id, student_id, result } = req.body;
  const existingresult = await Result.findOne({
    student: student_id,
    interview: interview_id,
  });
  if (existingresult) {
    existingresult.result = result;
    await existingresult.save();
  } else {
    const newresult = new Result({
      interview: interview_id,
      student: student_id,
      result: result,
    });
    await newresult.save();
  }
  if (result === "PASS") {
    const updatestudentstatus = await Student.findByIdAndUpdate(student_id, {
      status: "placed",
    });
  }

  return res.status(200).send({ msg: "successfully updated!!!!!" });
};

const downloadResult = async (req, res) => {
  const data = await Result.find().populate("student").populate("interview");
  const flattenedData = data.map((item) => ({
    studentId: item.student._id.toString(),
    studentName: item.student.name,
    college: item.student.college,
    status: item.student.status,
    DSA_score: item.student.DSA_score,
    WebD_score: item.student.WebD_score,
    React_score: item.student.React_score,
    company: item.interview.company,
    interviewDate: item.interview.interview_date.toISOString().split("T")[0], // Convert date to YYYY-MM-DD format
    result: item.result,
  }));
  const columns = {
    studentId: "Student ID",
    studentName: "Student Name",
    college: "College",
    status: "Status",
    DSA_score: "DSA Score",
    WebD_score: "WebD Score",
    React_score: "React Score",
    company: "Company",
    interviewDate: "Interview Date",
    result: "Result",
  };
  stringify(
    flattenedData,
    {
      header: true,
      columns: columns,
    },
    (err, output) => {
      if (err) {
        res.status(500).send("Error generating CSV");
        return;
      }
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="data.csv"');
      console.log(output);
      console.log(typeof output);
      res.status(200).send(output);
    }
  );
};

export const interviewController = {
  addNewInterview,
  getAllInterviews,
  allocateInterviewToStudent,
  appliedStudentsData,
  update_result,
  downloadResult,
};
