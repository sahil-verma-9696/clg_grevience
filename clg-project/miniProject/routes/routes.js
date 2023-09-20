const controls = require("../controllers/control")
const express = require("express");
const routes = express.Router();

routes.get("/login",controls.login);