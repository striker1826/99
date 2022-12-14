const mongoose = require("mongoose");

// required: 무조건 필요한지
const commentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  companyAdmin: {
    type: String,
    required: true,
  },
  companyTel: {
    type: String,
    required: true,
  },
  keywordTag: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("comment", commentSchema);
