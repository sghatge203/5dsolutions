/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:51:51
 * @modify date 2020-10-15 22:51:51
 * @desc [Verify Register validations]
 */
const db = require('../models/index.model');
const User = db.auth;

const verifyDuplicateEmail = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec(err, user => {
        if (err) {
            return res.status(200)
                .send({
                    status: 500,
                    message: err,
                    response: null
                });
        }
        if (user) {
            return res.status(200)
                .send({
                    status: 404,
                    message: "Email already exits, try with other email",
                    response: null
                });
        }
        next();
    });
}
module.exports = {
    verifyDuplicateEmail
}