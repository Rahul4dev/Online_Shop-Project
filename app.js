// <Rahul>
const path = require("path"); // builtin path module for file directory to look for the files related to the app.js

const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs"); // to view our pages
app.set("views", path.join(__dirname, "views")); // location of our views pages

app.use(authRoutes); // check for every incoming request

app.listen(3000); // <our domain which we listen>

// </Rahul>
