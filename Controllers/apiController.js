const Students = require("./../Model/students");
const nodeMailer = require("nodemailer");
const path = require("path");

const currentDate = new Date();

// Get date components
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is 0-based
const year = currentDate.getFullYear();

// Get time components
let hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const ampm = hours >= 12 ? 'PM' : 'AM';

// Convert 24-hour time to 12-hour time
hours = hours % 12;
hours = hours ? hours : 12; // Handle midnight (0 hours)

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
                        return res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.crn, msg: "😊 you are logined 😊" });
                    } else {
                        return res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.crn, msg: "❌ user already exist ❌" });
                    }
                } else {
                    return res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.crn, msg: "❌ user and password invalid ❌" });
                }
            } else {
                return res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.crn, msg: "❌ user not found ❌" });
            }

        } else {
            return res.render("login", { URL: process.env.ORIGINS, userStatus: req.cookies.crn, msg: "request not recive" });
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

const upload = (req, res) => {
    try {
        // console.log(req.body);
        const projectRoot = path.join(__dirname, '..'); // Go up one level to the project root
        const imagePath = path.join(projectRoot, 'Assets', 'Upload', `${day}-${month}-${year}_${hours}-${minutes}-${seconds}-${ampm}.jpg`);

        const credential = {
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "laptopsahil123@gmail.com",
                pass: process.env.MAIL_PASS
            }
        }

        const mail = {
            from: "laptopsahil123@gmail.com",
            to: ["laptopsahil123@gmail.com", "averagersiron@gmail.com"],
            subject: `${req.body.subject}`,
            text:`
            Dear Authorities,

            i ${req.body.user} drag the attantion of respected authorites toward .
            😁😁😁

            ${req.body.msg}
            `,
            attachments: [
                {
                    filename: `${day}-${month}-${year}_${hours}-${minutes}-${seconds}-${ampm}.jpg`, // Replace with your desired file name
                    path: imagePath, // Replace with the actual path to your photo
                    cid: 'unique_photo_id' // optional, used to include the image in the HTML body
                }
            ],// if i have to send attachment
        }

        nodeMailer.createTransport(credential).sendMail(mail, (error, info) => error ? console.log(error) : console.log(`succesfully mail sended at ${day}-${month}-${year}_${hours}-${minutes}-${seconds}-${ampm}`));

        res.send("i am mail sender")
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    login,
    logout,
    upload,
}