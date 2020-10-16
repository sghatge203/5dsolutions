/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:57:30
 * @modify date 2020-10-15 22:57:30
 * @desc [Moments routes declarations]
 */

const momentController = require("../controllers/moment.controller");
const apiRoutes = require("../global/routes.constant");
const { authJwt } = require('../middleware/auth.middleware');


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin,Content-Type,Accept,responseType,formData",
        );
        next();
    });
    // Moments Routes declarations
    app.post(apiRoutes.addMoment, [authJwt.verifyToken], momentController.createMoment);
    app.post(apiRoutes.updateMoment, [authJwt.verifyToken], momentController.updateMoment);
    app.get(apiRoutes.getListMoment, [authJwt.verifyToken], momentController.getListOfMoments);
    app.delete(apiRoutes.deleteMoment, [authJwt.verifyToken], momentController.deleteMoment);
    app.get(apiRoutes.getMommentId, [authJwt.verifyToken], momentController.getMomentById);
}