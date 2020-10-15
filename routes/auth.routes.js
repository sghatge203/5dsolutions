/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:32:08
 * @modify date 2020-10-15 22:32:08
 * @desc [Authentication routes]
 */
const authController = require("../controllers/auth.controller");
const apiRoutes = require("../global/routes.constant");
const verifyRegister = require("../middleware/verifyRegister");

module.exports = function (app) {
    console.log('auth')
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin,Content-Type,Accept",
        );
        next();
    });

    // Authentication Routes declarations
    app.post(apiRoutes.register, [verifyRegister.verifyDuplicateEmail], authController.registerUser);
    app.post(apiRoutes.login, authController.loginUser)
}
