import { Student } from "../../mongo_db_config/student.model.js";
const addStudentInfo = async (req, res) => {
  const { name, batch, college, status, dsa, webd, react } = req.body;
  const student_data = {
    name: name,
    batch: batch,
    college: college,
    status: status,
    DSA_score: dsa,
    WebD_score: webd,
    React_score: react,
  };
  console.log(student_data);
  try {
    const newstudent = await new Student(student_data).save();
    return res
      .status(200)
      .send({ status: "student info added sucessfully!!!!!" });
  } catch (err) {
    console.log(
      "something went in database while adding student info!!!!!" + err
    );
  }
};

const studentlist = async (req, res) => {
  console.log("studentlist");
  try {
    const students = await Student.find();
    if (students.length === 0) {
      return res.status(400).send({ status: false, msg: "Empty list!!!" });
    }
    console.log(students);
    return res.status(200).send(students);
  } catch (err) {
    console.log(
      "something went in database while fetching student info!!!!!" + err
    );
  }
};
export const student_controller = { studentlist, addStudentInfo };
