const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  subject: String,
  mail: String,
  evidence: String,
  time: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"students"
  }
});

module.exports = mongoose.model("complaints",complaintSchema);