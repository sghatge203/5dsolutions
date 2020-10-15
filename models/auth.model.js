/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 21:17:19
 * @modify date 2020-10-15 21:17:19
 * @desc [Create User Auth Model]
 */

 const mongoose = require('mongoose');
 const User = mongoose.model(
     "User",
     new mongoose.Schema({
         email:String,
         password:String,
         fullName:String,
         city:String,
         image:String,
         comment:String,
         tags:String,
         createAt: { type: Date, default: Date.now },
     })
 )

 module.exports = User;