const express = require("express");
const { login, logout, upload, students_registration } = require("./../Controllers/apiController");
const { isAuthorised } = require("../Middleware/authentication");
const { evidence, profile } = require("../Middleware/fileuploader");

const router = express.Router();

router.post("/login", isAuthorised, login);
router.post("/upload/:title", evidence, upload);
router.post("/registration", profile, students_registration);
router.get("/logout", logout);

module.exports = router;
