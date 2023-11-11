const Students = require("../Model/students");

const serveHome = (req, res) => {
    return res.render("Home", { URL: process.env.ORIGINS, userStatus: req.cookies.user });
}

const serveLogin = (req, res) => {
    if (req.cookies.user) {
        res.redirect("/");
    } else {
        res.render("login", {
            URL: process.env.ORIGINS,
            apiKey: process.env.API_KEY,
            userStatus: req.cookies.user,
            msg: "😀 Welcome to student grievance 😀"
        }); 
    }
}

const serveProfile = async (req, res) => {
    try {
        const response = await Students.findOne({ crn: req.cookies.crn });
        return res.render("profile", { user: response, userStatus: req.cookies.crn, URL: process.env.URL });
    } catch (error) {
        console.log(error);
    }
}

const serveCategories = (req, res) => {
    res.render("categories", { URL: process.env.ORIGINS, userStatus: req.cookies.user, msg: "Hello" });
}

const serveForm = async (req, res) => {
    try {
        const response = await Students.findOne({ crn: req.cookies.crn });
        return res.render("form", { user: response, userStatus: req.cookies.crn, URL: process.env.URL, title: req.params.category });
    } catch (error) {
        console.log(error);
    }
}

const serveRegistration = (req, res) => {
    res.render("registration", { URL: process.env.ORIGINS, apiKey: process.env.API_KEY });
}

module.exports = {
    serveHome,
    serveProfile,
    serveLogin,
    serveCategories,
    serveForm,
    serveRegistration,
};
