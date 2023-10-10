const express = require("express");
const { login, logout, upload } = require("./../Controllers/apiController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets/Upload/');
    },
    filename: function (req, file, cb) {
        cb(null, 'photo-1' + path.extname(file.originalname));
    }
})

const uploads = multer({ storage: storage }).single("image");

const router = express.Router();


router.post("/login", login);
router.post("/upload", uploads, upload);

router.get("/logout", logout);

module.exports = router;