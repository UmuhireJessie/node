import { JWT } from "../helper/jwt.js";
import userschema from "../model/userschema.js";
import bcrypt from "bcrypt";

export default class UserController {
  static async registerUser(req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const userExist = await userschema.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({
          status: "fail",
          message: "Email is already taken",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 12);

      const user = await userschema.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role,
      });

      return res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allusers = await userschema.find().select("-password");
      return res.status(200).json({
        status: "sucess",
        data: allusers,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      //check if the user exists in the database
      const userFound = await userschema.findOne({ email });
      if (!userFound) {
        return res.status(404).json({
          status: "fail",
          message: "Account does not exist",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          status: "fail",
          message: "Incorrect credentials",
        });
      }

      const token = JWT.generateJwt({
        userId: userFound._id,
        role: userFound.role,
        firstName: userFound.firstName,
      });

      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
