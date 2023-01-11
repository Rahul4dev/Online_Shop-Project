// <Rahul>
const path = require("path"); // builtin path module for file directory to look for the files related to the app.js

const express = require("express");
const csurf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');

const baseRoutes = require('./routes/base.routes');
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require('./routes/products.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

const addCsrfTokenMiddleware = require('./middleware/csrf-token');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const checkAuthStatusMiddleware = require('./middleware/check-auth');
const protectRoutesMiddleware = require('./middleware/protectRoutes');
const cartMiddleware = require('./middleware/cart');

const app = express();

app.set("view engine", "ejs"); // to view our pages
app.set("views", path.join(__dirname, "views")); // location of our views pages

app.use(express.static('public')); // it will provide this folder to all the files statically
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csurf());

app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes); // check for every incoming request
app.use(productsRoutes);
app.use('/cart', cartRoutes);

// app.use(protectRoutesMiddleware);  // to protect admin route from unauthorize access
app.use("/admin", protectRoutesMiddleware, adminRoutes);  // path which start with /admin will get access

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
