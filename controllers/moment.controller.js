/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:20:41
 * @modify date 2020-10-15 22:20:41
 * @desc [Moments functions]
 */
const Moment = require('../models/moment.model');
var multiparty = require('multiparty');
const readAndWriteFile = require('../helpers/fileUpload');

// Create New Moment
const createMoment = (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        let fieldData = JSON.parse(fields.data[0]);
        let imageFile = files.image[0]
        let file = imageFile
        let getData = fieldData
        var fullpath = file ? file.originalFilename : null;
        var document = {
            image: fullpath,
            comment: getData.comment,
            tags: getData.tags,
        }
        const moment = new Moment(document);
        moment.save((err, package) => {
            if (err) {
                return res.status(200).send({
                    status: 500,
                    message: err,
                    response: null
                })
            }
            else {
                var savePath = './public/moments/';
                var singleImage = file
                savePath += singleImage.originalFilename;;
                readAndWriteFile(singleImage, savePath);
                return res.status(200).send({
                    status: 200,
                    message: "Moment added succussfully.",
                    response: null
                })
            }
        })

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
            list.forEach(element => {
                element['image'] = process.env.IMAGE_API + 'moments/' + element.image
            });
            console.log('listData', list)
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
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        let fieldData = JSON.parse(fields.data[0]);
        let imageFile = files.image[0]
        let file = imageFile
        let getData = fieldData
        // var fullpath = file ? file.originalFilename : null;
        let updateObject = getData;
        updateObject.image = file.originalFilename
        let id = getData._id
        Moment.findOneAndUpdate(id, updateObject, { new: true }, function (err, updateData) {
            if (err) {
                return res.status(200).
                    send({ status: 500, message: err, response: null });
            }
            else {
                var savePath = './public/moments/';
                var singleImage = file
                savePath += singleImage.originalFilename;
                console.log('savepath',savePath)
                readAndWriteFile(singleImage, savePath);
                return res.status(200).send({
                    status: 200,
                    message: "Moment updated successfully",
                    response: updateData
                })
            }
        });

    });







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

// Delete moment by Id
const getMomentById = (req, res) => {
    let id = req.params.id;
    Moment.findOne({ _id: id }, function (err, data) {
        if (err) {
            return res.status(200).send({
                status: 500,
                message: err,
                response: null
            })
        }
        else {
            data['image'] = process.env.IMAGE_API + 'moments/' + data.image
            return res.status(200).send({
                status: 200,
                message: "Successfully fetched Moment",
                response: data
            })
        }
    });
}
// Exports all the functions
module.exports = {
    createMoment,
    getListOfMoments,
    deleteMoment,
    updateMoment,
    getMomentById
}
