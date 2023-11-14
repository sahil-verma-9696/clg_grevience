// Load required modules
require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

// Custom modules    
const { connect } = require("./Database/database");
const fileRouter = require("./Routes/fileRoutes");
const apiRouter = require("./Routes/apiRoutes");

// Database connection
connect("miniproject");

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware setup
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret:"abcd",
})) // Enable express session for session creation
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(bodyParser.json()); // Parse JSON request bodies

// Serve static files from the "Public" and "Assets" directories
app.use("/public", express.static(path.join(__dirname, "Public")));
app.use("/assets", express.static(path.join(__dirname, "Assets")));

// Define API routes under the "/api" path
app.use("/api", apiRouter);

// Define file routes at the root path ("/")
app.use("/", fileRouter);

// Define the port for the server
const PORT = process.env.PORT || 3000; // Use the environment variable or default to 3000

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});