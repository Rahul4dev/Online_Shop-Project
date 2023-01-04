// <Rahul>
const User = require('../models/user.model');
const authUtil = require('../utility/authentication');
const validation= require("../utility/validation");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  if (
      !validation.userDetailAreValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
      )  || !validation.emailIsCOnfirmed(req.body.email, req.body['confirm-email'])
  ) {
    res.redirect("/signup");
    return;
  }
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existAlready = await user.existAlready();
    if (existAlready) {
      res.redirect("/signup");
      return;
    }
  } catch (error) {
    next(error);
    return;
  }
  
  // error handling for async functions
  try {
    await user.signup();    
  } catch (error) {
    next(error);
    return;
  }

  // here we redirect to not resubmit the form after signup
  res.redirect('/login');
}

function getLogin(req, res) {
 res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser, passwordIsCorrect;
  try {
    existingUser = await user.isUserExist();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect("/login");
    return;
  }
  
  try{
    passwordIsCorrect = await user.comparePassword(existingUser.password);
  } catch(error) {
    next(error);
    return;
  }

  if(!passwordIsCorrect) {
     res.redirect("/login");
     return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
}

function logout(req,res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
};

//</Rahul>
