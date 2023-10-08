const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);

const PORT = 3000;

app.get("/",(req,res)=>{
    res.send('hii kaju i sarting from new ');
})

server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
}) 