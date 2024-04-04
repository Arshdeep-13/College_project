const expModel = require("../models/expModel.js");
const expData = async (req, res) => {
  try {
    console.log(req.body)
    const expData = new expModel(req.body);
    await expData.save();
    return res.status(200).send({
      message: "Data saved succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const getExp = async (req, res) => {
  try {
    const exp = await expModel.find();
    return res.status(200).send({
      success: true,
      exp: exp,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { expData, getExp };
