const express = require("express");

const {
    login, 
    logout, 
    upload, 
    students_registration, 
    getAllStudents, 
    getAllComplaints, 
    getStudentByCrn
} = require("./../Controllers/apiController");

const { isAuthorised } = require("../Middleware/authentication");
const { evidence, profile } = require("../Middleware/fileuploader");

const router = express.Router();

router.post("/login", isAuthorised, login);
router.post("/upload/:title", evidence, upload);
router.post("/registration", profile, students_registration);

router.get("/logout", logout);
router.get("/getAllStudents", getAllStudents);
router.get("/getAllComplaints", getAllComplaints);
router.get("/getStudentByCrn", getStudentByCrn); 

module.exports = router;
