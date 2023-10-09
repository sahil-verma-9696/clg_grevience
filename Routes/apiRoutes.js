const express = require("express");
const { login, logout } = require("./../Controllers/apiController");
const router = express.Router();

router.post("/login",login);
router.get("/logout",logout);

module.exports = router;