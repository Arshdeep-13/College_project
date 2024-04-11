const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { otpGenerate } = require("./changepassController.js");
let generateOtp = 0;

const Func = (req, res) => {
  res.send("hii");
};
const generateOtpFunc = async (req, res) => {
  const userExist = await userModel.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(200).send({
      message: "User already exist",
      success: false,
    });
  } else {
    generateOtp = await otpGenerate(req.body.email);
    return res.status(200).send({
      success: true,
    });
  }
};
const signup = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(200).send({
        message: "User already exist",
        success: false,
      });
    }

    console.log(req.body.otp);
    console.log(generateOtp);
    if (req.body.otp == generateOtp) {
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
    } else {
      return res.status(200).send({
        message: "Invalid otp",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).send({
      message: error.message,
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.email });
    if (!userExit) {
      return res.status(400).send({
        message: "User not exit",
        success: false,
      });
    }

    const userPass = req.body.password;
    const dbPass = userExit.password;
    const passMatch = await bcrypt.compare(userPass, dbPass);
    if (passMatch) {
      const token = jwt.sign({ userId: userExit._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "Login successfully",
        success: true,
        data: userExit,
        token: token,
        isAdmin: userExit.isAdmin,
      });
    } else {
      return res.status(400).send({
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
        isAdmin: true,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.body.email });
    if (!userExit) {
      return res.status(200).send({
        message: "User not exit",
        success: false,
      });
    }
    return res.status(200).send({
      message: "User Details",
      success: true,
      data: userExit,
    });
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const addadmin = async(req,res) =>{
  try {
    console.log(req.body)
    const userExist = await userModel.findOneAndUpdate({email:req.body.email},{isAdmin:true});
      return res.status(200).send({
        message: "Updated succesfully",
        success: true,
      })

  } catch (error) {
    return res.status(200).send({
      message: error.message,
      success: false,
    });
  }
}

module.exports = {
  login,
  signup,
  Func,
  adminlogin,
  generateOtpFunc,
  getUserDetails,
  addadmin
};
