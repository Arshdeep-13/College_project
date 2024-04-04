const mongoose = require("mongoose");

const expSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gotOffer: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rounds: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  mob: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  cgpa: {
    type: String,
    required: true,
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
  isApproved: {
    type: Boolean,
    default: false,
  },
  expyr: {
    type: Number,
    required: true,
    default: 0,
  },
});

const expModel = new mongoose.model("expModel", expSchema);
module.exports = expModel;
