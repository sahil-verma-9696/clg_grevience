const express = require("express");
const { students, serveHome } = require("../Controllers/controller");
const router = express.Router();

router.use("/student", students);
router.use("/",serveHome);

module.exports = router