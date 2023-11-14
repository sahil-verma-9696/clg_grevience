const Students = require("./../Model/students");
const Complaint = require("./../Model/complaints");
const nodeMailer = require("nodemailer");
const path = require("path");
const bcrypt = require("bcrypt");
const complaints = require("./../Model/complaints");

// Function to format the current date and time
const formatDateTime = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();

  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day}-${month}-${year}_${hours}-${minutes}-${seconds}-${ampm}`;
};

// controller functions of endpoints

const login = async (req, res, next) => {
  try {
    if (req.body) {
      const user = await Students.findOne({ crn: req.body.crn });
      if (user) {
        const isAuth = await bcrypt.compare(req.body.password, user.password);
        if (isAuth) {
          req.session.authUser = user;
          if (!req.cookies.user) {
            res.cookie("contact", user.contact, { maxAge: 2 * 60 * 60 * 1000 });
            res.cookie("user", user.name, { maxAge: 2 * 60 * 60 * 1000 });
            res.cookie("crn", user.crn, { maxAge: 2 * 60 * 60 * 1000 });
            next();
          } else {
            // return res.render("login", {
            //   URL: process.env.ORIGINS,
            //   userStatus: req.cookies.crn,
            //   msg: "❌ User already exists ❌",
            //   apiKey: process.env.API_KEY,
            // });
            res.send("❌ User already exists ❌");
          }
        } else {
          // return res.render("login", {
          //   URL: process.env.ORIGINS,
          //   userStatus: req.cookies.crn,
          //   msg: "❌ User and password are invalid ❌",
          //   apiKey: process.env.API_KEY,
          // });
          res.send("❌ User and password are invalid ❌");
        }
      } else {
        // return res.render("login", {
        //   URL: process.env.ORIGINS,
        //   userStatus: req.cookies.crn,
        //   msg: "❌ User not found ❌",
        //   apiKey: process.env.API_KEY,
        // });
        res.send("❌ User not found ❌");
      }
    } else {
      // return res.render("login", {
      //   URL: process.env.ORIGINS,
      //   userStatus: req.cookies.crn,
      //   msg: "Request not received",
      //   apiKey: process.env.API_KEY,
      // });

      res.send("Request not receive");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  if (req.session.authUser) {
    req.session.destroy(error => {
      console.warn("Error in destroying user");
      console.log(error);
    })
  }
  if (req.cookies.user) {
    res.clearCookie("contact");
    res.clearCookie("user");
    res.clearCookie("crn");
    console.log(req.cookies.crn);
    res.redirect("/home");
  } else {
    res.status(404).send("Not Found");
  }
};

const students_registration = async (req, res) => {
  try {
    const plainPassword = req.body.password;
    if (!plainPassword) {
      return res.status(400).send('Password is required');
    }

    const hashedPass = await bcrypt.hash(plainPassword, 10);

    const isUserExist = await Students.findOne({ crn: req.body.crn });

    if (!isUserExist) {

      const newUser = new Students({
        crn: req.body.crn,
        name: req.body.name,
        eMail: req.body.eMail,
        course: req.body.course,
        password: hashedPass,
        contact: req.body.contact,
        branch: req.body.branch,
        profile: req.file ? `/Assets/Students/stu_${req.body.name}_${req.body.crn}.jpg` : "/Assets/Students/male.png",
      });

      await newUser.save();

      res.status(201).send('User registered successfully!');
    } else {
      res.status(400).send('CRN already exists');
    }
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).send('Internal Server Error');
  }
};

const upload = async (req, res) => {
  try {
    const projectRoot = path.join(__dirname, "..");
    const imagePath = path.join(
      projectRoot,
      "Assets",
      "Upload",
      `${req.params.title}_${formatDateTime()}.jpg`
    );

    const credential = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "laptopsahil123@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    };

    const msg = `
        Dear Sir,
        I hope this email finds you well. My name is ${req.body.name}, and I am writing to bring to your attention a matter of concern that I have encountered during my time at Allen House Institute of Technology.

        "${req.body.msg}"

        Thank you for your time and attention to this matter. I appreciate your commitment to addressing student concerns and fostering a positive learning environment at Allen House Institute of Technology.
        Sincerely,

        ${req.body.name}
        ${req.body.crn}
        `;

    //storing complaint in data base 
    const complaints = new Complaint({
      title: req.params.title,
      subject: req.body.subject,
      mail: msg,
      time: formatDateTime(),
      evidence: req.file ? `/Assets/Upload/${req.params.title}_${formatDateTime()}.jpg` : null,
      user: req.session.authUser._id,
    });

    const savedComplaint = await complaints.save();

    const complaintStudent = await Students.findOne({
      _id: req.session.authUser._id,
    })

    complaintStudent.complaints.push(savedComplaint._id);

    const updateStudent = await complaintStudent.save();
    console.log(updateStudent);
    console.log(savedComplaint);


    const mail = {
      from: "laptopsahil123@gmail.com",
      to: ["laptopsahil123@gmail.com", "averagersiron@gmail.com"],
      subject: `${req.params.title}-${req.body.subject}`,
      text: msg,
      attachments: req.file ? [
        {
          filename: `${req.params.title}_${formatDateTime()}.jpg`,
          path: imagePath,
          cid: "unique_photo_id",
        },
      ] : null,
    };

    const transporter = nodeMailer.createTransport(credential);

    await transporter.sendMail(
      mail, (error, info) => {
        console.log(info);

        if (error) {
          console.log("mailSender Eror \n", error)
          res.render("response", { data: error });
        } else {
          console.log("mail sended");
          res.render("response", { data: info });
        }
      }
    );

  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req, res) => {
  const students = await Students.find().populate("complaints");
  res.send(students);
}

const getAllComplaints = async (req, res) => {
  const allComplaints = await Complaint.find();
  res.send(allComplaints);
}

const getStudentByCrn = async (req, res) => {
  const student = await Students.findOne({
    _id: req.session.authUser._id,
  }).populate("complaints");
  res.send(student)
}


module.exports = {
  login,
  logout,
  upload,
  students_registration,
  getAllStudents,
  getAllComplaints,
  getStudentByCrn,
};
