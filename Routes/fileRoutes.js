const express = require("express");
const { serveHome, serveProfile, serveLogin } = require("../Controllers/fileController");
const router = express.Router();


router.use("/login", serveLogin);
router.use("/profile", serveProfile);
router.use("/", serveHome);

module.exports = router;