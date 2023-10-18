const express = require("express");
const { serveHome, serveProfile, serveLogin, serveCategories, serveForm, serveRegistration } = require("../Controllers/fileController");
const { loginMiddleWare } = require("../Middleware/loginMW");
const router = express.Router();

router.use("/login", loginMiddleWare, serveLogin);
router.use("/profile", loginMiddleWare, serveProfile);
router.use("/categories", loginMiddleWare, serveCategories);
router.use("/grievence/:category", serveForm);  

//testing
router.use("/registration", serveRegistration);

//home
router.use("/", serveHome);

module.exports = router;