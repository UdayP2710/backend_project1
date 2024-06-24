import express from "express";
import { jwt_Authenticaton } from "../../middleware/jwt_auth.js";
import { controllers } from "./employe.controller.js";
const router = express.Router();
router.route("/register").post((req, res) => {
  console.log("register");
  controllers.register_user(req, res);
});
router.route("/login").post((req, res) => {
  console.log("login");
  controllers.login_user(req, res);
});
export default router;
