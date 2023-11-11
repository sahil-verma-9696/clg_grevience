const multer = require("multer");

// Function to format the current date and time
function formatDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const time = formatDate(currentDate);

    return `${day}-${month}-${year}_${time}`;
}

function formatDate(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Handle midnight (0 hours)

    return `${hours}-${minutes}-${seconds}-${ampm}`;
}

// Multer storage configuration function
function evidenceMulterStorage(destination) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            const evidenceName = `${req.params.title}_${formatDateTime()}.jpg`;
            cb(null, evidenceName);
        }
    });
}
function studentsMulterConfig(destination) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            let profileName = `stu_${req.body.name}_${req.body.crn}.jpg`
            cb(null, profileName);
        }
    });
}

// Create storage for evidence and profile pictures
const evidenceStorage = evidenceMulterStorage('Assets/Upload/');
const profileStorage = studentsMulterConfig('Assets/Students/');

const evidence = multer({ storage: evidenceStorage }).single("evidence");
const profile = multer({ storage: profileStorage }).single("profile");

module.exports = {evidence,profile}