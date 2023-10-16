const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  subject: String,
  mail: String,
  evidence: String,
  time: String,
});

module.exports = mongoose.model("complaints",complaintSchema);