import { Employe } from "../../mongo_db_config/employe.model.js";
import jwt from "jsonwebtoken";
const register_user = async (req, res) => {
  //register employee.....
  try {
    const user_details = req.body;
    console.log("get" + user_details);
    const new_user = await new Employe(user_details).save();
    res.status(200).send({ status: "user registerd successfully!!!!" });
  } catch (err) {
    console.log("error while saving data into database" + err);
  }
};
const login_user = async (req, res) => {
  // login employee......
  const { email, password } = req.body;
  console.log(email, password);
  try {
    console.log("login page");
    const verifyemail = await Employe.find({ email: email });
    if (verifyemail.length === 0) {
      return res
        .status(400)
        .send({ status: "No user exist with the given email id!!!!!" });
    }
    const passwordcheck = await Employe.find({ password: password });
    console.log(passwordcheck);
    if (passwordcheck.length === 0) {
      console.log("invalid pass");
      return res.status(401).send({ status: "Incorrect password!!!!!" });
    }
    const accesstoken = jwt.sign({ user: passwordcheck }, "placement_cell", {
      expiresIn: "7d",
    });
    console.log(accesstoken);
    return res
      .cookie("token", accesstoken, { httpOnly: true })
      .status(200)
      .send({ status: "user logged in sucessfully!!!!!" });
  } catch (err) {
    console.log("error while login !!!!" + err);
  }
};

export const controllers = { register_user, login_user };
