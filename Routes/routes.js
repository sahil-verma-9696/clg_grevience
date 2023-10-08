const express = require("express");
const { students } = require("../Controllers/controller");
const router = express.Router();

router.use("/student", students);

module.exports = router