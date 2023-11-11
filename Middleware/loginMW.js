const loginMiddleWare = (req, res, next) => {
    // Check if CRN is present in cookies
    if (req.cookies.crn) {
        next();
    } else {
        // Render the "login" view with necessary data
        res.render("login", {
            URL: process.env.ORIGINS,
            apiKey: process.env.API_KEY,
            userStatus: req.cookies.crn,
            msg: "😀 Welcome to student grievance 😀"
        });
    }
};

module.exports = { loginMiddleWare };
