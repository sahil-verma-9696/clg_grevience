require("dotenv").config();
const express = require("express");
const http = require("http");

const { connect } = require("./Database/database");
const router = require("./Routes/routes");

connect("miniproject");

const app = express();
const server = http.createServer(app);

app.use("/",router)




const PORT = 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}) 