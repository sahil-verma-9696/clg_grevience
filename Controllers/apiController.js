const Students = require("./../Model/students");
const login = async (req, res) => {
    try {
        if (req.body) {
            const user = await Students.findOne({ crn: req.body.crn });
            if (user) {
                const isAuth = user.password == req.body.password;
                if (isAuth) {
                    res.cookie("contact", user.contact);
                    res.cookie("user", user.name);
                    res.cookie("crn", user.crn);
                    res.redirect("/categories");
                } else {
                    return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user and password invalid ❌" })
                }
            } else {
                return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user not found ❌" })
            }

        } else {
            return res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "request not recive" });
        }

    } catch (error) {
        console.log(error);
    }
}

const logout = (req,res)=>{
    if (req.cookies.user) {
        res.clearCookie("contact");
        res.clearCookie("user");
        res.clearCookie("crn");
        res.redirect("/home");
    } else {
        res.status(404).send("Not Found");
    }
}
module.exports = {
    login,
    logout,
}