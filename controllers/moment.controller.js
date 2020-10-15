/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:20:41
 * @modify date 2020-10-15 22:20:41
 * @desc [Moments functions]
 */
const Moment = require('../models/moment.model');

// Create New Moment
const createMoment = (req, res) => {
    let image = req.body.image;
    let comment = req.body.comment;
    let tags = req.body.tags;
    const moment = new Moment({
        image: image,
        comment: comment,
        tags: tags,
    });
    moment.save((err, momentData) => {
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
                message: "Successfully Created new moment",
                response: null
            })
        }
    });
}
// get list of all moments
const getListOfMoments = (req, res) => {
    Moment.find({}, function (err, list) {
        if (err) {
            return res.status(200).send({
                status: 404,
                message: err,
                response: null
            })
        }
        else {
            return res.status(200).send({
                status: 200,
                message: "Successfully fetched all moments.",
                response: list
            })
        }
    })
}
// Update moment by id
const updateMoment = (req, res) => {
    let updateObject = req.body;
    let userId = updateObject.id
    Moment.findOneAndUpdate(userId, updateObject, { new: true }, function (err, updateData) {
        if (err) {
            return res.status(200).
                send({ status: 500, message: err, response: null });
        }
        else {
            return res.status(200).send({
                status: 200,
                message: "Moment updated successfully",
                response: updateData
            })
        }
    })
}
// Delete moment by Id
const deleteMoment = (req, res) => {
    let id = req.params.id;
    Moment.deleteOne({ _id: id }, function (err, data) {
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
                message: "Successfully Deleted Moment",
                response: null
            })
        }
    });
}
// Exports all the functions
module.exports = {
    createMoment,
    getListOfMoments,
    deleteMoment,
    updateMoment
}
