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

module.exports = {
    students,
    
}