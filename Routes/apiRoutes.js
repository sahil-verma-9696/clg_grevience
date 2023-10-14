const express = require("express");
const { login, logout, upload } = require("./../Controllers/apiController");
const multer = require("multer");
const path = require("path");

const date = new Date();
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



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/Upload/');
    },
    filename: function (req, file, cb) {
        cb(null, `${day}-${month}-${year}_${hours}-${minutes}-${seconds}-${ampm}.jpg`);
        // cb(null, 'photo-1' + path.extname(file.originalname));
    }
})

const uploads = multer({ storage: storage }).single("evidence");

const router = express.Router();


router.post("/login", login);
router.post("/upload", uploads, upload);

router.get("/logout", logout); 


module.exports = router;