const express = require("express");
const { serveHome, serveProfile, serveLogin, serveCategories } = require("../Controllers/fileController");
const router = express.Router();


router.use("/login", serveLogin);
router.use("/profile",(req,res,next)=>{req.cookies.crn?next():res.redirect("/login")}, serveProfile);
router.use("/categories",(req,res,next)=>{req.cookies.crn?next():res.redirect("/login")}, serveCategories);
router.use("/", serveHome);

module.exports = router;