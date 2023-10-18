const express = require("express");
const { login, logout, upload, students_registration } = require("./../Controllers/apiController");
const multer = require("multer");
const { isAuthorised } = require("../Middleware/authentication");

// Create a new Date object
const currentDate = new Date();

// Get date components
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is 0-based
const year = currentDate.getFullYear();

// Get time components
let hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const ampm = hours >= 12 ? 'PM' : 'AM';

// Convert 24-hour time to 12-hour time
hours = hours % 12;
hours = hours ? hours : 12; // Handle midnight (0 hours)



const storageEvidence = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/Upload/');
    },
    filename: function (req, file, cb) {
        cb(null, `${day}-${month}-${year}_${hours}-${minutes}-${seconds}-${ampm}.jpg`);
    }
})

const storageStudents = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/Students/');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.crn}.jpg`);
    }
})

const evidence = multer({ storage: storageEvidence }).single("evidence");
const profile = multer({ storage: storageStudents }).single("profile");

const router = express.Router();


router.post("/login",isAuthorised, login);
router.post("/upload/:title", evidence, upload);
router.post("/stu_registration",isAuthorised, profile, students_registration);

router.get("/logout", logout);


module.exports = router;