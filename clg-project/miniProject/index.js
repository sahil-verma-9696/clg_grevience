const express = require("express");
const http = require("http");
const routes = require("./routes/routes");

const app = express();
const PORT = 3090;

const server = http.createServer(app);

app.use("/api",routes);

server.listen(PORT,()=>{console.log("server start")})