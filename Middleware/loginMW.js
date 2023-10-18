const loginMiddleWare = (req, res, next) => {
    req.cookies.crn ? next() : res.render("login", { URL: process.env.ORIGINS, apiKey: process.env.API_KEY, userStatus: req.cookies.crn, msg: "😀 welcome to student grieviance 😀" })
}

module.exports = { loginMiddleWare };