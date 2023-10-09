const Students = require("./../Model/students");
const login = async (req,res,next)=>{
    try {
        if (req.body) {
            const user = await Students.findOne({ crn: req.body.crn });
            if (user){
                const isAuth = user.password == req.body.password;
                if(isAuth){
                    res.render("login", { URL: process.env.ORIGINS, userStatus: true, msg: "successfull login " })
                }else{
                    res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user and password invalid ❌" })
                }
            }else{
                res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "❌ user not found ❌" })
            }

        } else {
            res.render("login", { URL: process.env.ORIGINS, userStatus: false, msg: "request not recive" });
        }

    } catch (error) {
        console.log(error);
    }
    next()
}

module.exports = {
    login,

}