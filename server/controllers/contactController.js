const Contact = require("../models/contactModel.js");

const storeContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ status: 201, message: "Response recorded" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {storeContact}
