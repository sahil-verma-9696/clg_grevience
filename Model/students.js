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
  sex:{
    type:String,
  },
  contact: {
    type: Number,
    unique: false,
    trim: true,
    maxlength: 10,
    minlength: 10,
  },
  eMail: {
    type: String,
    required: true,
    unique: false,
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
    default: "/Assets/Students/male.png"
  },
  complaints : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: "complaints"
    }
  ]
});

module.exports = mongoose.model("students", registrationSchema); 