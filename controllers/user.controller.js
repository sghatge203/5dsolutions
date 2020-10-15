/**
 * @author [Sagar Ghatge]
 * @email [sagargahtge203@gmail.com]
 * @create date 2020-10-15 21:57:45
 * @modify date 2020-10-15 21:57:45
 * @desc [Users related functions]
 */


const db = require('../models/index.model');
const User = db.auth;

// update user Profile
const updateUserProfile = (req, res, next) => {
    let updateObject = req.body;
    let userId = updateObject.id
    User.findOneAndUpdate(userId, updateObject, { new: true }, function (err, user) {
        if (err) {
            return res.status(200).
                send({ 
                    status: 500, 
                    message: err, 
                    response: null 
                });
        }
        else {
            return res.status(200).send({
                status: 200,
                message: "Profile updated successfully", 
                response: user })
        }
    })
}
module.exports = {
    updateUserProfile
}