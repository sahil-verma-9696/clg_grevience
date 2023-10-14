require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const { connect } = require("./Database/database");
const fileRouter = require("./Routes/fileRoutes");
const apiRouter = require("./Routes/apiRoutes");

connect("miniproject");


const app = express();
const server = http.createServer(app);

app.set("view engine","ejs");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use("/public",express.static(path.join(__dirname,"Public")));
app.use("/assets",express.static(path.join(__dirname,"Assets"))); 

app.use("/api",apiRouter);//middleware
app.use("/",fileRouter);// endpoint

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}) 