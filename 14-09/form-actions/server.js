const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

//

const app = express();

// here we parse the body of url into json using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const server = http.createServer(app);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");// this line serve index.html on localhost:3000
})

// by this method we get the data of form 
app.get("/form-action",(req,res)=>{
    console.log(req.query)
    res.send(req.query);
    res.sendFile(__dirname+"/index.html");
})

// getting data from form when form use post method to send data ..

app.post("/",(req,res)=>{ // /form-action use because i give "/form-action" value in "action" attribute of form in html side..

    // res.send(req.body)// post method data send in body which is sequre and slow also
    // res.send(req.query)
    // res.sendFile(__dirname+"/index.html");
})
server.listen(3000,()=>{
    console.log("http://localhost:3000");
})