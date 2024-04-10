const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const otpGenerate = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email)
    const checkExist = await userModel.findOne({ email: email });
    if (!checkExist) {
      return res.status(200).send({
        message: "User already exist",
        success: false,
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    const main = async () => {
      const info = transport.sendMail({
        from: {
          name: "team_uprep",
          address: process.env.USER,
        },
        to: email,
        subject: "Password change OTP",
        text: `your OTP is ${otp}`,
        html: `<b>your OTP is ${otp}</b>`,
      });
    };
    main().then(() => {
      res.status(200).send({
        message: "OTP send succesfully",
        success: true,
        otp: otp,
      });
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
const changePass = async (req, res) => {
  try {
    const email = req.body.email;
    const findEmail = await userModel.findOne({ email: email });
    if (!findEmail) {
      return res.status(200).send({
        message: "User dont exist",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hassPassword;
    await userModel.findOneAndUpdate(
      { email: email },
      { password: req.body.password }
    );
    return res.status(200).send({
      message: "Change password succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
module.exports = { otpGenerate,changePass };
