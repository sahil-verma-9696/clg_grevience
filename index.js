require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");

const { connect } = require("./Database/database");
const router = require("./Routes/routes");

connect("miniproject");


const app = express();
const server = http.createServer(app);

app.set("view engine","ejs");

app.use("/public",express.static(path.join(__dirname,"Public")));
app.use("/assets",express.static(path.join(__dirname,"Assets")));

app.use("/",router)


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}) 