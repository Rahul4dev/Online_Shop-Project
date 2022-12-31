// <Rahul>
const path = require("path"); // builtin path module for file directory to look for the files related to the app.js

const express = require("express");
const csurf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middleware/csrf-token');
const authRoutes = require("./routes/auth.routes");

const errorHandlerMiddleware = require('./middleware/errorHandler');

const app = express();

app.set("view engine", "ejs"); // to view our pages
app.set("views", path.join(__dirname, "views")); // location of our views pages

app.use(express.static('public')); // it will provide this folder to all the files statically
app.use(express.urlencoded({ extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csurf());


app.use(addCsrfTokenMiddleware);

app.use(authRoutes); // check for every incoming request

app.use(errorHandlerMiddleware);

db.connectToDatabase()
    .then(function() {
        app.listen(3000);  // <our domain which we listen>
    })
    .catch(function(error) {
        console.log('Failed to connect to database');
        console.log(error);
    });
 

// </Rahul>
