// <Rahul>
const path = require("path"); // builtin path module for file directory to look for the files related to the app.js

const express = require("express");

const db = require('./data/database');

const authRoutes = require("./routes/auth.routes");


const app = express();

app.set("view engine", "ejs"); // to view our pages
app.set("views", path.join(__dirname, "views")); // location of our views pages

app.use(express.static('public')); // it will provide this folder to all the files statically
app.use(express.urlencoded({ extended: false}));

app.use(authRoutes); // check for every incoming request

db.connectToDatabase()
    .then(function() {
        app.listen(3000);
    })
    .catch(function(error) {
        console.log('Failed to connect to database');
        console.log(error);
    });
 // <our domain which we listen>

// </Rahul>
