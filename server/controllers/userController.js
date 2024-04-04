const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Func = (req, res) => {
  res.send("hii");
};
const signup = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(401).send({
        meesage: "User already exist",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hassPassword;
    const newUser = await new userModel(req.body);
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    await newUser.save();
    return res.status(200).send({
      message: "Register successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log("Error " + error);
  }
};
const login = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.email });
    if (!userExit) {
      return res.status(401).send({
        message: "User not exit",
        success: false,
      });
    }

    const userPass = req.body.password;
    const dbPass = userExit.password;
    const passMatch = await bcrypt.compare(userPass, dbPass);
    if (passMatch) {
      const token = jwt.sign({ userId: userExit._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      return res.status(200).send({
        message: "Login successfully",
        success: true,
        token: token,
      });
    } else {
      return res.status(401).send({
        message: "Invalid crediantials",
        success: false,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const adminlogin = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.email });

    const userPass = req.body.password;
    const dbPass = userExit.password;
    const passMatch = await bcrypt.compare(userPass, dbPass);
    const token = jwt.sign({ userId: userExit._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    if (userExit.isAdmin == false || passMatch == false) {
      return res.status(401).send({
        message: "Invalid credentials",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Login successfully",
        success: true,
        token: token,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { login, signup, Func, adminlogin };
