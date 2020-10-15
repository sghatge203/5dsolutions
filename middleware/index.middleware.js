/**
 * @author [Sagar Ghatge]
 * @email [sagarghatge203@gmail.com]
 * @create date 2020-10-15 22:45:13
 * @modify date 2020-10-15 22:45:13
 * @desc [Import All the middlewares]
 */


 // import all middleware
 const authJwt = require('./auth.middleware');
 const verifyRegister = require('./verifyRegister');
 
 //exports modules
 module.exports ={
     authJwt,
     verifyRegister
 }