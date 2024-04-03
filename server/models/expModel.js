const mongoose = require("mongoose");

const expSchema = mongoose.Schema({
  company: {
    type: String,
  },
  role: {
    type: String,
  },
  gotOffer: {
    type: String,
  },
  location: {
    type: String,
  },
  rounds: {
    type: String,
  },
  batch: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  uid: {
    type: String,
  },
  mob: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  question: {
    type: String,
  },
  eligibility: {
    type: String,
  },
  preptips: {
    type: String,
  },
  mistakes: {
    type: String,
  },
  techques: {
    type: String,
  },
  othercompany: {
    type: String,
  },
});

const expModel = new mongoose.model("expModel", expSchema);
module.exports = expModel;
