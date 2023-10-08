const Students = require("./../Model/students");

const students = async (req,res)=>{
    const response = await Students.find();
    console.log(response);
    res.json(response);
    // res.send("hii")
}

module.exports = {
    students,
    
}