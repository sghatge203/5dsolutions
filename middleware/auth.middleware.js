/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:46:42
 * @modify date 2020-10-15 22:46:42
 * @desc [Authetication middlewares]
 */
const jwt = require('jsonwebtoken');
const db = require('../models/index.model');
const User = db.auth;

// verify user token
const verifyToken = (req, res) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(200)
            .send({
                status: 404,
                message: "User token is invalid!",
                response: null
            })
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(200)
                .send({ 
                    status: 401, 
                    message: "Unathorized access !", 
                    response: null });
        }
        req.userId = decoded.id;
        next();
    });
}
const authJwt = {
    verifyToken
}
module.exports = {
    authJwt
}