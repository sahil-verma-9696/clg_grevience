const Students = require("../Model/students");

/////////////////////////////// serving files //////////////////////////////////////
const serveHome = (req, res) => {
    res.render("home", { URL: process.env.ORIGINS, userStatus: false });
}

const serveLogin = (req, res) => {
    res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "hello" });
}

const serveProfile = async (req, res) => {
    try {
        const response = await Students.findOne({ crn: "22CSME017" });
        console.log(response);
        res.render("profile", { user: response, userStatus: false });
    } catch (error) {
        console.log(error)
    }
}
module.exports = {

    serveHome,
    serveProfile,
    serveLogin,
}