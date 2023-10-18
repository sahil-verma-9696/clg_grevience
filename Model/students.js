const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  crn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    unique: true,
    trim: true,
    maxlength: 10,
    minlength: 10,
  },
  eMail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    trim: true,
  }, 
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profile: {
    type: String,
  },
});

module.exports = mongoose.model("students", registrationSchema); 