const express = require("express");
const { login } = require("./../Controllers/apiController");
const router = express.Router();

router.get("/login",login);
module.exports = router;