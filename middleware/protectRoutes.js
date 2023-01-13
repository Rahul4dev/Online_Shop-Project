
// we protect the admin routes from url manipulation without login as admin.
// we check the user have login, as admin and have session id or not
function protectRoutes(req, res, next) {
    if(!res.locals.isAuth) {
        return res.redirect('/401');  // not authenticated
    }

    if(req.path.startsWith('/admin') && !res.locals.isAdmin) {
        return res.redirect('/403');   // not authorize
    }

    next();
}

module.exports = protectRoutes;