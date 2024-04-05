const expModel = require("../models/expModel.js");

const getUsers = async (req, res) => {
  try {
    const exp = await expModel.find();
    return res.status(200).send({
      success: true,
      users: exp,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers };
