const express = require("express");
const { serveHome, serveProfile, serveLogin, serveCategories, serveForm } = require("../Controllers/fileController");
const router = express.Router();


router.use("/login",(req,res,next)=>{req.cookies.crn?res.render("logined"):res.render("login",{ URL: process.env.ORIGINS, userStatus: req.cookies.crn, msg: "😀 welcome to student grieviance 😀" })}, serveLogin);
router.use("/profile",(req,res,next)=>{req.cookies.crn?next():res.redirect("/login")}, serveProfile);
router.use("/categories",(req,res,next)=>{req.cookies.crn?next():res.redirect("/login")}, serveCategories);
router.use("/grievence/:category",serveForm); 
router.use("/", serveHome);

module.exports = router;   