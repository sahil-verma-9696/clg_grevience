const Students = require("./../Model/students");

const login = async (req, res) => {
    try {
        if (req.body) {
            const user = await Students.findOne({ crn: req.body.crn });
            if (user) {
                const isAuth = user.password == req.body.password;
                if (isAuth) {
                    if (!req.cookies.user) {
                        res.cookie("contact", user.contact, { maxAge: 2 * 60 * 60 * 1000 });
                        res.cookie("user", user.name, { maxAge: 2 * 60 * 60 * 1000 });
                        res.cookie("crn", user.crn, { maxAge: 2 * 60 * 60 * 1000 });
                        res.redirect("/categories");
                    }else{
                        return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user already exist ❌" });
                    }
                } else {
                    return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user and password invalid ❌" });
                }
            } else {
                return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user not found ❌" });
            }

        } else {
            return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "request not recive" });
        }

    } catch (error) {
        console.log(error);
    }
}

const logout = (req, res) => {
    if (req.cookies.user) {
        res.clearCookie("contact");
        res.clearCookie("user");
        res.clearCookie("crn");
        console.log(req.cookies.crn)
        res.redirect("/home");
    } else {
        res.status(404).send("Not Found");
    }
}
module.exports = {
    login,
    logout,
}