/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:19:05
 * @modify date 2020-10-15 22:19:05
 * @desc [Moment Schema]
 */

const mongoose = require('mongoose');
const Moment = mongoose.model(
    "Moment",
    new mongoose.Schema({
        image: String,
        comment: String,
        tags: String,
        createAt: { type: Date, default: Date.now },
    })
);
module.exports = Moment;
