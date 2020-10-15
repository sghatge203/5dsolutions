/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 21:23:41
 * @modify date 2020-10-15 21:23:41
 * @desc [Authentication functions]
 */

const db = require('../models/index.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require('../models/auth.model');
console.log('controller auth')
//  User Registration function

const registerUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let city = req.body.city;
    let fullName = req.body.fullName
    let activateToken = crypto.randomBytes(20).toString('hex');
    console.log('user',email,password,fullName,city)

    if (!email && !password && !fullName && !city) {
        return res.status(200).send({
            status: 404,
            message: "All the fields are required",
            response: null
        });
    }
    const user = new User({
        email: email,
        password: bcrypt.hashSync(password, 8),
        fullName:fullName,
        city:city,
        activateToken: activateToken,
    });
    user.save((err, user) => {
        console.log('dataa',user)
        if (err) {
            return res.status(200).send({
                status: 500,
                message: err,
                response: null
            })
        }
        else {
            return res.status(200).send({
                status: 200,
                message: "Successfully Created new User",
                response: null
            })
        }
    });
}

const loginUser = (req, res) => {
    console.log('login user')
    let emailId = req.body.email;
    let password = req.body.password;
    User.findOne({ email: emailId }, function (err, user) {
        if (err) {
            return res.status(200).send({
                status: 500,
                message: err,
                response: null
            })
        }
        if (!user) {
            return res.status(200).send({
                status: 404,
                message: "User not registered",
                response: null,
            });
        }
        var passwordIsValid;
        if (password) {
            passwordIsValid = bcrypt.compareSync(password, user.password);
        }
        if (!passwordIsValid) {
            return res.status(200).send({
                status: 404,
                message: "Password Incorrect !",
                response: null,
            });
        }
        else {
            var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 86400, // token validation is for 24hrs
            });
            return res.status(200).send({
                status: 200,
                message: "Login Succussfull",
                response: {
                    id: user._id,
                    email: user.email,
                    accessToken: token,
                },
            });
        }
    })
}

const logoutUser = (req, res) => {

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}