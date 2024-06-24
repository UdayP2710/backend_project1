import jwt from "jsonwebtoken";
export const jwt_Authenticaton = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("hello jwt");
  console.log(token);
  const verifytoken = jwt.verify(token, "placement_cell");
  if (!verifytoken) {
    console.log("unathorised access");
    return res
      .status(400)
      .send({ status: "unathourised acess...please login!!!!" });
  }
  req.user = verifytoken.user;
  next();
};
