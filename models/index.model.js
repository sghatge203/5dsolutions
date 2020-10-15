/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 21:14:43
 * @modify date 2020-10-15 21:14:43
 * @desc [Importing all the models]
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.auth = require('./auth.model');
db.moment = require('./moment.model');
module.exports = db;
