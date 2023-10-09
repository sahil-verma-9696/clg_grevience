const Students = require("../Model/students");

const serveHome = (req, res) => {
    return res.render("Home", { URL: process.env.ORIGINS, userStatus: req.cookies.user });
}

const serveLogin = (req, res) => {
    res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.user, msg: "hello" });
}

const serveProfile = async (req, res) => {
    try {
        const response = await Students.findOne({ crn: req.cookies.crn });
        // console.log(response);
        return res.render("profile", { user: response, userStatus: req.cookies.crn, URL: process.env.URL });
    } catch (error) {
        console.log(error)
    }
}

const serveCategories = (req,res)=>{
    res.render("categories",{ URL: process.env.ORIGINS, userStatus: req.cookies.user, msg: "hello" })
}

module.exports = {
    serveHome,
    serveProfile,
    serveLogin,
    serveCategories,
}