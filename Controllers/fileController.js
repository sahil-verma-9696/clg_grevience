const Students = require("../Model/students");

const serveHome = (req, res) => {
    return res.render("home", { URL: process.env.ORIGINS, userStatus: req.cookies.user });
}

const serveLogin = (req, res) => {
    res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.user, msg: "hello" });
}

const serveProfile = async (req, res) => {
    try {
        const response = await Students.findOne({ crn: "22CSME017" });
        console.log(response);
        res.render("profile", { user: response, userStatus: req.cookies.user, URL: process.env.URL });
    } catch (error) {
        console.log(error)
    }
}
module.exports = {

    serveHome,
    serveProfile,
    serveLogin,
}