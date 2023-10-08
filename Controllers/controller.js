const Students = require("./../Model/students");

const students = async (req,res)=>{
   try {
    const response = await Students.find();
    console.log(response);
    res.json(response);
   } catch (error) {
    console.log(error)
   }
}

const serveHome = (req,res)=>{
    res.render("home");
}

// const serveProfile = (req,res)=>{

// }
module.exports = {
    students,
    serveHome,
}